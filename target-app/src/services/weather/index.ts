import { describeWeatherCode } from "@/services/weather/conditions";
import { getWeather } from "@/services/weather/weather";
import { fetchForecast } from "@/services/weather/forecast";
import { resolveCity } from "@/services/weather/geocoding";
import { DEFAULT_TIMEOUT_MS, requestJson } from "@/services/weather/http";

export type {
  FetchLike,
  RequestOptions,
} from "@/services/weather/http";
export type { GeocodingOptions } from "@/services/weather/geocoding";
export type { ForecastOptions } from "@/services/weather/forecast";
export type { WeatherServiceOptions } from "@/services/weather/weather";

export {
  DEFAULT_TIMEOUT_MS,
  describeWeatherCode,
  fetchForecast,
  getWeather,
  requestJson,
  resolveCity,
};
