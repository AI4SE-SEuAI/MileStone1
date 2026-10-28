# Spec: Weather App

## 1. Goal and Scope
A web app where the user types a city name and sees current weather
(temperature, condition, humidity, wind speed).

- **No database.** Data comes from a weather API using an API key only.
- **API key**: stored in `.env`, never committed.
- **Logic**: weather logic in one testable module (`weather.ts`); UI consumes it.

Data model (single type):

```ts
Weather { city, temperatureC, condition, humidity, windSpeedKph, timestamp }
```

## 2. Acceptance Criteria
Checklist (each item → one automated test):
- [ ] Real city name → returns a `Weather` object.
- [ ] Unknown city / API down → friendly error, **no crash**.
- [ ] Unit conversion use the "temperature_converter.ts"
- [ ] UI shows temperature, condition, humidity, wind.
- [ ] `check_types`, `check_build`, `npm test` all green. No API key committed.

## 3. Out of Scope
NOT doing: database, user accounts, 7-day forecast, maps, mobile app,
multi-language. No "bonus" features.

## 4. Steps (each ends with green tests)
1. Scaffold TS project in `../target-app`.
2. Types + `weather.ts` utilities.
3. API client `getWeather(city)` with error handling.
4. UI wiring (input + display).
5. Final checks + report.
