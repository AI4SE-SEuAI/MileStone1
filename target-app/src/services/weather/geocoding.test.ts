import { describe, expect, it } from "vitest";
import { resolveCity } from "@/services/weather/geocoding";
import type { FetchLike } from "@/services/weather/http";

function jsonResponse(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "content-type": "application/json" },
  });
}

describe("resolveCity", () => {
  it("resolves a city name into typed coordinates", async () => {
    let requestedUrl = "";

    const fetchImpl: FetchLike = async (input) => {
      requestedUrl = String(input);
      return jsonResponse({
        results: [
          {
            name: "Hannover",
            latitude: 52.37052,
            longitude: 9.73322,
            country: "Germany",
            admin1: "Lower Saxony",
            timezone: "Europe/Berlin",
          },
        ],
      });
    };

    const result = await resolveCity("  Hannover  ", { fetchImpl });

    expect(requestedUrl).toContain("geocoding-api.open-meteo.com/v1/search");
    expect(requestedUrl).toContain("name=Hannover");
    expect(result).toEqual({
      ok: true,
      data: {
        name: "Hannover",
        latitude: 52.37052,
        longitude: 9.73322,
        country: "Germany",
        admin1: "Lower Saxony",
        timezone: "Europe/Berlin",
      },
    });
  });

  it("returns an empty-result error when no city matches", async () => {
    const result = await resolveCity("Atlantis", {
      fetchImpl: async () => jsonResponse({ generationtime_ms: 0.2 }),
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.code).toBe("EMPTY_RESULT");
      expect(result.error.message).toContain("Atlantis");
    }
  });

  it("returns an empty-result error for an empty results array", async () => {
    const result = await resolveCity("Nowhere", {
      fetchImpl: async () => jsonResponse({ results: [] }),
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.code).toBe("EMPTY_RESULT");
    }
  });

  it("returns an invalid-input error for a blank city", async () => {
    const result = await resolveCity("   ");

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.code).toBe("INVALID_INPUT");
    }
  });

  it("surfaces non-200 responses as HTTP errors", async () => {
    const result = await resolveCity("Berlin", {
      fetchImpl: async () => jsonResponse({ error: true }, 503),
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.code).toBe("HTTP_ERROR");
      expect(result.error.status).toBe(503);
    }
  });

  it("surfaces network failures without throwing", async () => {
    const result = await resolveCity("Berlin", {
      fetchImpl: async () => {
        throw new Error("fetch failed");
      },
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.code).toBe("NETWORK_ERROR");
      expect(result.error.cause).toContain("fetch failed");
    }
  });

  it("surfaces timeouts without throwing", async () => {
    const fetchImpl: FetchLike = (_input, init) =>
      new Promise<Response>((_resolve, reject) => {
        init?.signal?.addEventListener("abort", () => {
          const error = new Error("The operation was aborted.");
          error.name = "AbortError";
          reject(error);
        });
      });

    const result = await resolveCity("Berlin", { fetchImpl, timeoutMs: 5 });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.code).toBe("TIMEOUT");
    }
  });

  it("rejects malformed JSON responses", async () => {
    const result = await resolveCity("Berlin", {
      fetchImpl: async () =>
        new Response("{broken", {
          status: 200,
          headers: { "content-type": "application/json" },
        }),
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.code).toBe("INVALID_RESPONSE");
    }
  });

  it("rejects results without usable coordinates", async () => {
    const result = await resolveCity("Berlin", {
      fetchImpl: async () =>
        jsonResponse({ results: [{ name: "Berlin", latitude: "52.5" }] }),
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.code).toBe("INVALID_RESPONSE");
    }
  });
});
