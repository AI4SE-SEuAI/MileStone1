import { describe, expect, it } from "vitest";
import { fetchForecast } from "@/services/weather/forecast";
import type { FetchLike } from "@/services/weather/http";
import type { GeoLocation } from "@/types/weather";

const location: GeoLocation = {
  name: "Hannover",
  latitude: 52.37052,
  longitude: 9.73322,
  country: "Germany",
  timezone: "Europe/Berlin",
};

function jsonResponse(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function forecastPayload() {
  return {
    latitude: 52.37,
    longitude: 9.73,
    timezone: "Europe/Berlin",
    current: {
      time: "2026-10-29T12:00",
      temperature_2m: 13.4,
      relative_humidity_2m: 72,
      weather_code: 3,
      wind_speed_10m: 18.2,
    },
    daily: {
      time: [
        "2026-10-29",
        "2026-10-30",
        "2026-10-31",
        "2026-11-01",
        "2026-11-02",
        "2026-11-03",
        "2026-11-04",
      ],
      weather_code: [3, 61, 63, 2, 0, 45, 80],
      temperature_2m_max: [14, 12, 11, 13, 15, 9, 10],
      temperature_2m_min: [7, 8, 6, 5, 4, 3, 2],
    },
  };
}

describe("fetchForecast", () => {
  it("maps current conditions and a seven-day forecast", async () => {
    let requestedUrl = "";

    const fetchImpl: FetchLike = async (input) => {
      requestedUrl = String(input);
      return jsonResponse(forecastPayload());
    };

    const result = await fetchForecast(location, { fetchImpl });

    expect(requestedUrl).toContain("api.open-meteo.com/v1/forecast");
    expect(requestedUrl).toContain("latitude=52.37052");
    expect(requestedUrl).toContain("forecast_days=7");
    expect(result.ok).toBe(true);

    if (result.ok) {
      expect(result.data.location).toEqual(location);
      expect(result.data.timezone).toBe("Europe/Berlin");
      expect(result.data.current).toEqual({
        temperatureC: 13.4,
        condition: "Overcast",
        humidity: 72,
        windSpeedKph: 18.2,
        weatherCode: 3,
        timestamp: "2026-10-29T12:00",
      });
      expect(result.data.daily).toHaveLength(7);
      expect(result.data.daily[1]).toEqual({
        date: "2026-10-30",
        condition: "Slight rain",
        temperatureMaxC: 12,
        temperatureMinC: 8,
        weatherCode: 61,
      });
    }
  });

  it("rejects invalid coordinates before calling the API", async () => {
    let called = false;

    const result = await fetchForecast(
      { name: "Invalid", latitude: 120, longitude: 10 },
      {
        fetchImpl: async () => {
          called = true;
          return jsonResponse(forecastPayload());
        },
      },
    );

    expect(called).toBe(false);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.code).toBe("INVALID_INPUT");
    }
  });

  it("returns an empty-result error when daily data is empty", async () => {
    const payload = forecastPayload();
    payload.daily.time = [];
    payload.daily.weather_code = [];
    payload.daily.temperature_2m_max = [];
    payload.daily.temperature_2m_min = [];

    const result = await fetchForecast(location, {
      fetchImpl: async () => jsonResponse(payload),
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.code).toBe("EMPTY_RESULT");
    }
  });

  it("surfaces non-200 responses as HTTP errors", async () => {
    const result = await fetchForecast(location, {
      fetchImpl: async () => jsonResponse({ error: true }, 500),
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.code).toBe("HTTP_ERROR");
      expect(result.error.status).toBe(500);
    }
  });

  it("surfaces network failures without throwing", async () => {
    const result = await fetchForecast(location, {
      fetchImpl: async () => {
        throw new Error("socket hang up");
      },
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.code).toBe("NETWORK_ERROR");
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

    const result = await fetchForecast(location, { fetchImpl, timeoutMs: 5 });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.code).toBe("TIMEOUT");
    }
  });

  it("rejects incomplete current conditions", async () => {
    const payload = forecastPayload();
    delete (payload.current as { weather_code?: number }).weather_code;

    const result = await fetchForecast(location, {
      fetchImpl: async () => jsonResponse(payload),
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.code).toBe("INVALID_RESPONSE");
    }
  });

  it("rejects mismatched daily arrays", async () => {
    const payload = forecastPayload();
    payload.daily.temperature_2m_max = [14, 12];

    const result = await fetchForecast(location, {
      fetchImpl: async () => jsonResponse(payload),
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.code).toBe("INVALID_RESPONSE");
    }
  });
});
