import type {
  WeatherError,
  WeatherErrorCode,
  WeatherResult,
} from "@/types/weather";

export function ok<T>(data: T): WeatherResult<T> {
  return { ok: true, data };
}

export function fail<T>(
  code: WeatherErrorCode,
  message: string,
  extra: Omit<WeatherError, "code" | "message"> = {},
): WeatherResult<T> {
  return { ok: false, error: { code, message, ...extra } };
}

export function describeError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}
