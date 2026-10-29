export interface GeoLocation {
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  admin1?: string;
  timezone?: string;
}

export interface CurrentConditions {
  temperatureC: number;
  condition: string;
  humidity: number;
  windSpeedKph: number;
  weatherCode: number;
  timestamp: string;
}

export interface DailyForecast {
  date: string;
  condition: string;
  temperatureMaxC: number;
  temperatureMinC: number;
  weatherCode: number;
}

export interface WeatherForecast {
  location: GeoLocation;
  current: CurrentConditions;
  daily: DailyForecast[];
  timezone: string;
}

export interface Weather {
  city: string;
  temperatureC: number;
  condition: string;
  humidity: number;
  windSpeedKph: number;
  timestamp: string;
  forecast: DailyForecast[];
}

export type WeatherErrorCode =
  | "INVALID_INPUT"
  | "EMPTY_RESULT"
  | "NETWORK_ERROR"
  | "TIMEOUT"
  | "HTTP_ERROR"
  | "INVALID_RESPONSE";

export interface WeatherError {
  code: WeatherErrorCode;
  message: string;
  status?: number;
  cause?: string;
}

export type WeatherResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: WeatherError };
