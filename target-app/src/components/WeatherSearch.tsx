"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { getWeather } from "@/services/weather";
import {
  formatTemperature,
  type TemperatureUnit,
} from "@/services/weather/temperature_converter";
import type { Weather } from "@/types/weather";

function formatDay(date: string): string {
  return new Date(`${date}T00:00:00`).toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function WeatherSearch() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<Weather | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [unit, setUnit] = useState<TemperatureUnit>("celsius");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await getWeather(city);

      if (result.ok) {
        setWeather(result.data);
      } else {
        setWeather(null);
        setError(result.error.message);
      }
    } catch {
      setWeather(null);
      setError("Something went wrong while loading the weather.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="weather">
      <form className="search" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="city">
          City name
        </label>
        <input
          id="city"
          name="city"
          type="search"
          placeholder="Search a city, e.g. Hannover"
          autoComplete="off"
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />
        <button type="submit" disabled={loading || city.trim().length === 0}>
          {loading ? "Loading…" : "Get forecast"}
        </button>
      </form>

      {error ? (
        <p className="error" role="alert">
          {error}
        </p>
      ) : null}

      {weather ? (
        <article className="card">
          <header className="card-header">
            <div>
              <p className="eyebrow">Current weather</p>
              <h2>{weather.city}</h2>
              <p className="condition">{weather.condition}</p>
            </div>
            <div className="unit-toggle" aria-label="Temperature unit">
              <button
                type="button"
                className={unit === "celsius" ? "active" : ""}
                onClick={() => setUnit("celsius")}
              >
                °C
              </button>
              <button
                type="button"
                className={unit === "fahrenheit" ? "active" : ""}
                onClick={() => setUnit("fahrenheit")}
              >
                °F
              </button>
            </div>
          </header>

          <p className="temperature">
            {formatTemperature(weather.temperatureC, unit)}
          </p>

          <dl className="stats">
            <div>
              <dt>Humidity</dt>
              <dd>{weather.humidity}%</dd>
            </div>
            <div>
              <dt>Wind</dt>
              <dd>{weather.windSpeedKph} km/h</dd>
            </div>
            <div>
              <dt>Updated</dt>
              <dd>{new Date(weather.timestamp).toLocaleString()}</dd>
            </div>
          </dl>

          <h3 className="forecast-title">7-day forecast</h3>
          <ul className="forecast">
            {weather.forecast.map((day) => (
              <li key={day.date}>
                <span>{formatDay(day.date)}</span>
                <span>{day.condition}</span>
                <span className="forecast-temps">
                  {formatTemperature(day.temperatureMaxC, unit)}
                  <small>
                    {formatTemperature(day.temperatureMinC, unit)}
                  </small>
                </span>
              </li>
            ))}
          </ul>
        </article>
      ) : null}
    </section>
  );
}
