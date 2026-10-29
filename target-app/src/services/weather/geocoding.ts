import { fail, isFiniteNumber, isRecord, ok } from "@/services/weather/errors";
import { requestJson } from "@/services/weather/http";
import type { RequestOptions } from "@/services/weather/http";
import type { GeoLocation, WeatherResult } from "@/types/weather";

const GEOCODING_ENDPOINT = "https://geocoding-api.open-meteo.com/v1/search";

export interface GeocodingOptions extends RequestOptions {}

function readOptionalString(
  value: Record<string, unknown>,
  key: string,
): string | undefined {
  const candidate = value[key];
  return typeof candidate === "string" && candidate.length > 0
    ? candidate
    : undefined;
}

export async function resolveCity(
  city: string,
  options: GeocodingOptions = {},
): Promise<WeatherResult<GeoLocation>> {
  const query = city.trim();

  if (query.length === 0) {
    return fail("INVALID_INPUT", "Please enter a city name.");
  }

  const url = new URL(GEOCODING_ENDPOINT);
  url.searchParams.set("name", query);
  url.searchParams.set("count", "1");
  url.searchParams.set("language", "en");
  url.searchParams.set("format", "json");

  const response = await requestJson(url, options);

  if (!response.ok) {
    return response;
  }

  const payload = response.data;

  if (!isRecord(payload)) {
    return fail(
      "INVALID_RESPONSE",
      "The geocoding service returned an unexpected payload.",
    );
  }

  if (payload.error === true) {
    return fail(
      "HTTP_ERROR",
      typeof payload.reason === "string"
        ? payload.reason
        : "The geocoding service reported an error.",
    );
  }

  const results = payload.results;

  if (results === undefined || results === null) {
    return fail(
      "EMPTY_RESULT",
      `No location found for "${query}". Try a different city name.`,
    );
  }

  if (!Array.isArray(results)) {
    return fail(
      "INVALID_RESPONSE",
      "The geocoding service returned an unexpected results format.",
    );
  }

  if (results.length === 0) {
    return fail(
      "EMPTY_RESULT",
      `No location found for "${query}". Try a different city name.`,
    );
  }

  const first = results[0];

  if (!isRecord(first) || !isFiniteNumber(first.latitude) || !isFiniteNumber(first.longitude)) {
    return fail(
      "INVALID_RESPONSE",
      "The geocoding service returned a location without valid coordinates.",
    );
  }

  const location: GeoLocation = {
    name: readOptionalString(first, "name") ?? query,
    latitude: first.latitude,
    longitude: first.longitude,
  };

  const country = readOptionalString(first, "country");
  const admin1 = readOptionalString(first, "admin1");
  const timezone = readOptionalString(first, "timezone");

  if (country !== undefined) {
    location.country = country;
  }

  if (admin1 !== undefined) {
    location.admin1 = admin1;
  }

  if (timezone !== undefined) {
    location.timezone = timezone;
  }

  return ok(location);
}
