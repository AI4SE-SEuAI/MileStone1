import { describeWeatherCode } from "@/services/weather/conditions";
import { fail, isFiniteNumber, isRecord, ok } from "@/services/weather/errors";
import { requestJson } from "@/services/weather/http";
import type { RequestOptions } from "@/services/weather/http";
import type {
  DailyForecast,
  GeoLocation,
  WeatherForecast,
  WeatherResult,
} from "@/types/weather";

const FORECAST_ENDPOINT = "https://api.open-meteo.com/v1/forecast";
const FORECAST_DAYS = 7;

export interface ForecastOptions extends RequestOptions {}

function isValidCoordinate(latitude: number, longitude: number): boolean {
  return (
    Number.isFinite(latitude) &&
    Number.isFinite(longitude) &&
    Math.abs(latitude) <= 90 &&
    Math.abs(longitude) <= 180
  );
}

function readNumberArray(value: unknown): number[] | null {
  if (!Array.isArray(value)) {
    return null;
  }

  return value.every(isFiniteNumber) ? value : null;
}

function readStringArray(value: unknown): string[] | null {
  if (!Array.isArray(value)) {
    return null;
  }

  return value.every((entry): entry is string => typeof entry === "string")
    ? value
    : null;
}

export async function fetchForecast(
  location: GeoLocation,
  options: ForecastOptions = {},
): Promise<WeatherResult<WeatherForecast>> {
  if (!isValidCoordinate(location.latitude, location.longitude)) {
    return fail(
      "INVALID_INPUT",
      "A forecast requires valid latitude and longitude coordinates.",
    );
  }

  const url = new URL(FORECAST_ENDPOINT);
  url.searchParams.set("latitude", String(location.latitude));
  url.searchParams.set("longitude", String(location.longitude));
  url.searchParams.set(
    "current",
    "temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m",
  );
  url.searchParams.set(
    "daily",
    "weather_code,temperature_2m_max,temperature_2m_min",
  );
  url.searchParams.set("timezone", "auto");
  url.searchParams.set("forecast_days", String(FORECAST_DAYS));
  url.searchParams.set("wind_speed_unit", "kmh");

  const response = await requestJson(url, options);

  if (!response.ok) {
    return response;
  }

  const payload = response.data;

  if (!isRecord(payload)) {
    return fail(
      "INVALID_RESPONSE",
      "The forecast service returned an unexpected payload.",
    );
  }

  if (payload.error === true) {
    return fail(
      "HTTP_ERROR",
      typeof payload.reason === "string"
        ? payload.reason
        : "The forecast service reported an error.",
    );
  }

  const current = payload.current;
  const daily = payload.daily;

  if (!isRecord(current) || !isRecord(daily)) {
    return fail(
      "INVALID_RESPONSE",
      "The forecast service response is missing current or daily data.",
    );
  }

  const temperature = current.temperature_2m;
  const humidity = current.relative_humidity_2m;
  const weatherCode = current.weather_code;
  const windSpeed = current.wind_speed_10m;
  const timestamp = current.time;

  if (
    !isFiniteNumber(temperature) ||
    !isFiniteNumber(humidity) ||
    !isFiniteNumber(weatherCode) ||
    !isFiniteNumber(windSpeed) ||
    typeof timestamp !== "string"
  ) {
    return fail(
      "INVALID_RESPONSE",
      "The forecast service returned incomplete current conditions.",
    );
  }

  const dates = readStringArray(daily.time);
  const maxTemperatures = readNumberArray(daily.temperature_2m_max);
  const minTemperatures = readNumberArray(daily.temperature_2m_min);
  const weatherCodes = readNumberArray(daily.weather_code);

  if (
    dates === null ||
    maxTemperatures === null ||
    minTemperatures === null ||
    weatherCodes === null
  ) {
    return fail(
      "INVALID_RESPONSE",
      "The forecast service returned malformed daily data.",
    );
  }

  if (dates.length === 0) {
    return fail("EMPTY_RESULT", "No forecast data is available for this location.");
  }

  if (
    maxTemperatures.length < dates.length ||
    minTemperatures.length < dates.length ||
    weatherCodes.length < dates.length
  ) {
    return fail(
      "INVALID_RESPONSE",
      "The forecast service returned mismatched daily arrays.",
    );
  }

  const dayCount = Math.min(dates.length, FORECAST_DAYS);
  const dailyForecast: DailyForecast[] = [];

  for (let index = 0; index < dayCount; index += 1) {
    const date = dates[index];
    const maxTemperature = maxTemperatures[index];
    const minTemperature = minTemperatures[index];
    const code = weatherCodes[index];

    if (
      date === undefined ||
      maxTemperature === undefined ||
      minTemperature === undefined ||
      code === undefined
    ) {
      return fail(
        "INVALID_RESPONSE",
        "The forecast service returned an incomplete daily entry.",
      );
    }

    dailyForecast.push({
      date,
      condition: describeWeatherCode(code),
      temperatureMaxC: maxTemperature,
      temperatureMinC: minTemperature,
      weatherCode: code,
    });
  }

  return ok({
    location,
    current: {
      temperatureC: temperature,
      condition: describeWeatherCode(weatherCode),
      humidity,
      windSpeedKph: windSpeed,
      weatherCode,
      timestamp,
    },
    daily: dailyForecast,
    timezone:
      typeof payload.timezone === "string" ? payload.timezone : "UTC",
  });
}
