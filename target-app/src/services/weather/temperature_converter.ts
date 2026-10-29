export type TemperatureUnit = "celsius" | "fahrenheit";

export function convertTemperature(
  value: number,
  fromUnit: TemperatureUnit,
): number {
  if (fromUnit === "celsius") {
    return (value * 9) / 5 + 32;
  }

  return ((value - 32) * 5) / 9;
}

export function formatTemperature(
  celsius: number,
  unit: TemperatureUnit,
): string {
  const value =
    unit === "celsius" ? celsius : convertTemperature(celsius, "celsius");

  return `${value.toFixed(1)}°${unit === "celsius" ? "C" : "F"}`;
}
