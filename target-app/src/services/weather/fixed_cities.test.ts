import { describe, expect, it } from "vitest";
import {
  FIXED_CITIES,
  getCityTemperatures,
} from "@/services/weather/fixed_cities";
import type { FetchLike } from "@/services/weather/http";

function jsonResponse(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function createFetch(temperatureByCity: Record<string, number>): FetchLike {
  const latitudeByCity = new Map<string, number>(
    FIXED_CITIES.map((city, index) => [city, index + 1]),
  );
  const cityByLatitude = new Map<string, string>(
    FIXED_CITIES.map((city, index) => [String(index + 1), city]),
  );

  return async (input) => {
    const url = new URL(String(input));

    if (url.hostname === "geocoding-api.open-meteo.com") {
      const name = url.searchParams.get("name") ?? "";
      const latitude = latitudeByCity.get(name) ?? 1;

      return jsonResponse({
        results: [
          {
            name,
            latitude,
            longitude: 9.73322,
            country: "Testland",
          },
        ],
      });
    }

    const city = cityByLatitude.get(url.searchParams.get("latitude") ?? "");
    const temperature = city ? temperatureByCity[city] ?? 10 : 10;

    return jsonResponse({
      timezone: "UTC",
      current: {
        time: "2026-10-29T12:00",
        temperature_2m: temperature,
        relative_humidity_2m: 72,
        weather_code: 3,
        wind_speed_10m: 18.2,
      },
      daily: {
        time: ["2026-10-29"],
        weather_code: [3],
        temperature_2m_max: [14],
        temperature_2m_min: [7],
      },
    });
  };
}

describe("getCityTemperatures", () => {
  it("returns one temperature entry per fixed city", async () => {
    const temperatures: Record<string, number> = {};
    FIXED_CITIES.forEach((city, index) => {
      temperatures[city] = 10 + index;
    });

    const result = await getCityTemperatures({
      fetchImpl: createFetch(temperatures),
    });

    expect(result.map((entry) => entry.city)).toEqual([...FIXED_CITIES]);
    expect(result.map((entry) => entry.temperatureC)).toEqual(
      FIXED_CITIES.map((city) => temperatures[city]),
    );
    expect(result.every((entry) => entry.error === null)).toBe(true);
  });

  it("reports a friendly error when a city cannot be resolved", async () => {
    const fetchImpl: FetchLike = async (input) => {
      const url = new URL(String(input));

      if (url.hostname === "geocoding-api.open-meteo.com") {
        return jsonResponse({ results: [] });
      }

      return jsonResponse({});
    };

    const result = await getCityTemperatures({ fetchImpl });

    expect(result).toHaveLength(FIXED_CITIES.length);
    expect(
      result.every((entry) => entry.temperatureC === null && entry.error !== null),
    ).toBe(true);
  });
});
