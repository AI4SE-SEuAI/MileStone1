import { describe, expect, it } from "vitest";
import { getWeather } from "@/services/weather/weather";
import type { FetchLike } from "@/services/weather/http";

function jsonResponse(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "content-type": "application/json" },
  });
}

const geocodingPayload = {
  results: [
    {
      name: "Hannover",
      latitude: 52.37052,
      longitude: 9.73322,
      country: "Germany",
    },
  ],
};

const forecastPayload = {
  timezone: "Europe/Berlin",
  current: {
    time: "2026-10-29T12:00",
    temperature_2m: 13.4,
    relative_humidity_2m: 72,
    weather_code: 3,
    wind_speed_10m: 18.2,
  },
  daily: {
    time: ["2026-10-29", "2026-10-30"],
    weather_code: [3, 61],
    temperature_2m_max: [14, 12],
    temperature_2m_min: [7, 8],
  },
};

describe("getWeather", () => {
  it("combines geocoding and forecast into a Weather object", async () => {
    const fetchImpl: FetchLike = async (input) => {
      const url = String(input);
      return jsonResponse(
        url.includes("geocoding-api") ? geocodingPayload : forecastPayload,
      );
    };

    const result = await getWeather("Hannover", { fetchImpl });

    expect(result).toEqual({
      ok: true,
      data: {
        city: "Hannover",
        temperatureC: 13.4,
        condition: "Overcast",
        humidity: 72,
        windSpeedKph: 18.2,
        timestamp: "2026-10-29T12:00",
        forecast: [
          {
            date: "2026-10-29",
            condition: "Overcast",
            temperatureMaxC: 14,
            temperatureMinC: 7,
            weatherCode: 3,
          },
          {
            date: "2026-10-30",
            condition: "Slight rain",
            temperatureMaxC: 12,
            temperatureMinC: 8,
            weatherCode: 61,
          },
        ],
      },
    });
  });

  it("short-circuits when geocoding returns no results", async () => {
    let calls = 0;

    const result = await getWeather("Atlantis", {
      fetchImpl: async () => {
        calls += 1;
        return jsonResponse({ results: [] });
      },
    });

    expect(calls).toBe(1);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.code).toBe("EMPTY_RESULT");
    }
  });

  it("propagates forecast failures", async () => {
    const fetchImpl: FetchLike = async (input) => {
      const url = String(input);
      return url.includes("geocoding-api")
        ? jsonResponse(geocodingPayload)
        : jsonResponse({ error: true }, 502);
    };

    const result = await getWeather("Hannover", { fetchImpl });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.code).toBe("HTTP_ERROR");
      expect(result.error.status).toBe(502);
    }
  });
});
