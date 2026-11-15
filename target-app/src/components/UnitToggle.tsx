"use client";

import type { TemperatureUnit } from "@/services/weather/temperature_converter";

export type UnitToggleProps = {
  unit: TemperatureUnit;
  onChange: (unit: TemperatureUnit) => void;
};

export function UnitToggle({ unit, onChange }: UnitToggleProps) {
  return (
    <div className="unit-toggle" aria-label="Temperature unit">
      <button
        type="button"
        className={unit === "celsius" ? "active" : ""}
        onClick={() => onChange("celsius")}
      >
        °C
      </button>
      <button
        type="button"
        className={unit === "fahrenheit" ? "active" : ""}
        onClick={() => onChange("fahrenheit")}
      >
        °F
      </button>
    </div>
  );
}
