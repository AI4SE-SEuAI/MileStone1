import { ok } from "@/services/weather/errors";
import { fetchForecast } from "@/services/weather/forecast";
import { resolveCity } from "@/services/weather/geocoding";
import type { RequestOptions } from "@/services/weather/http";
import type { Weather, WeatherResult } from "@/types/weather";

export interface WeatherServiceOptions extends RequestOptions {}

export async function getWeather(
  city: string,
  options: WeatherServiceOptions = {},
): Promise<WeatherResult<Weather>> {
  const location = await resolveCity(city, options);

  if (!location.ok) {
    return location;
  }

  const forecast = await fetchForecast(location.data, options);

  if (!forecast.ok) {
    return forecast;
  }

  const { location: resolvedLocation, current, daily } = forecast.data;

  return ok({
    city: resolvedLocation.name,
    temperatureC: current.temperatureC,
    condition: current.condition,
    humidity: current.humidity,
    windSpeedKph: current.windSpeedKph,
    timestamp: current.timestamp,
    forecast: daily,
  });
}
