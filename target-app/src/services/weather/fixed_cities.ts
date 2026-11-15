import { getWeather } from "@/services/weather/weather";
import type { WeatherServiceOptions } from "@/services/weather/weather";

export const FIXED_CITIES = [
  "Hannover",
  "Berlin",
  "Hanoi",
  "New York",
  "Sydney",
] as const;

export type FixedCity = (typeof FIXED_CITIES)[number];

export interface CityTemperature {
  city: FixedCity;
  temperatureC: number | null;
  error: string | null;
}

export async function getCityTemperatures(
  options: WeatherServiceOptions = {},
): Promise<CityTemperature[]> {
  return Promise.all(
    FIXED_CITIES.map(async (city): Promise<CityTemperature> => {
      try {
        const result = await getWeather(city, options);

        if (result.ok) {
          return { city, temperatureC: result.data.temperatureC, error: null };
        }

        return { city, temperatureC: null, error: result.error.message };
      } catch {
        return {
          city,
          temperatureC: null,
          error: "Something went wrong while loading the weather.",
        };
      }
    }),
  );
}
