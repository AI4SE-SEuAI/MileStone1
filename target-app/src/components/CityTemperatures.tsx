"use client";

import { useEffect, useState } from "react";
import {
  getCityTemperatures,
  type CityTemperature,
} from "@/services/weather/fixed_cities";
import {
  formatCityTemperature,
  type TemperatureUnit,
} from "@/services/weather/temperature_converter";
import { UnitToggle } from "@/components/UnitToggle";

export function CityTemperatures() {
  const [cities, setCities] = useState<CityTemperature[]>([]);
  const [loading, setLoading] = useState(true);
  const [unit, setUnit] = useState<TemperatureUnit>("celsius");

  useEffect(() => {
    let active = true;

    getCityTemperatures()
      .then((result) => {
        if (active) {
          setCities(result);
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="cities" aria-label="Temperatures for fixed cities">
      <div className="cities-header">
        <h2 className="cities-title">Cities right now</h2>
        <UnitToggle unit={unit} onChange={setUnit} />
      </div>
      <ul className="city-list">
        {cities.map((entry) => (
          <li key={entry.city}>
            <span>{entry.city}</span>
            <span className="city-temperature">
              {formatCityTemperature(entry.temperatureC, unit)}
            </span>
          </li>
        ))}
        {loading
          ? Array.from({ length: 5 }, (_, index) => (
              <li key={`loading-${index}`} className="city-loading">
                <span>Loading…</span>
                <span className="city-temperature">—</span>
              </li>
            ))
          : null}
      </ul>
    </section>
  );
}
