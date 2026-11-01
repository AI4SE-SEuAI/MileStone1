# Spec: Weather App

## 1. Goal and Scope

A web app where the user types a city name and sees current weather
(temperature, condition, humidity, wind speed) and a 7-day forecast.

- **No database.** Data comes from a weather API without an API key.
- **API**: Open-Meteo geocoding + forecast endpoints; no key, no `.env` secret.
- **Logic**: weather logic in a testable service module (`src/services/weather/`); UI consumes it.
- **Units**: the weather API returns Celsius; the app supports converting and displaying Celsius or Fahrenheit (`temperature_converter.ts`).

Data model:

```ts
Weather { city, temperatureC, condition, humidity, windSpeedKph, timestamp, forecast }
```

## 2. Acceptance Criteria

Checklist (each item → automated tests):

- [x] Real city name → resolves coordinates and returns a `Weather` object with current conditions and 7-day forecast.
- [x] Unknown city / API down / timeout → structured friendly error, **no crash**.
- [x] Unit conversion uses `temperature_converter.ts` (Celsius ↔ Fahrenheit).
- [x] UI shows temperature, condition, humidity, wind speed, and daily forecast.
- [x] `check_types`, `check_build`, `check_free_weather_api`, `npm test` all green. No API key used.

## 3. Out of Scope

NOT doing: database, user accounts, maps, mobile app,
multi-language. No "bonus" features.

## 4. Steps (each ends with green tests)

1. Scaffold TS project in `target-app`.
2. Types + `weather.ts` utilities.
3. API client `getWeather(city)` with error handling.
4. UI wiring (input + display).
5. Final checks + report.
