import { describe, expect, it } from "vitest";
import { describeWeatherCode } from "@/services/weather/conditions";
import {
  convertTemperature,
  formatTemperature,
} from "@/services/weather/temperature_converter";

describe("describeWeatherCode", () => {
  it("maps known WMO weather codes to labels", () => {
    expect(describeWeatherCode(0)).toBe("Clear sky");
    expect(describeWeatherCode(61)).toBe("Slight rain");
    expect(describeWeatherCode(95)).toBe("Thunderstorm");
  });

  it("falls back for unknown codes", () => {
    expect(describeWeatherCode(404)).toBe("Unknown conditions");
  });
});

describe("temperature_converter", () => {
  it("converts Celsius to Fahrenheit", () => {
    expect(convertTemperature(0, "celsius")).toBe(32);
    expect(convertTemperature(100, "celsius")).toBe(212);
  });

  it("converts Fahrenheit to Celsius", () => {
    expect(convertTemperature(32, "fahrenheit")).toBe(0);
    expect(convertTemperature(212, "fahrenheit")).toBe(100);
  });

  it("formats a Celsius reading in the requested unit", () => {
    expect(formatTemperature(13.4, "celsius")).toBe("13.4°C");
    expect(formatTemperature(13.4, "fahrenheit")).toBe("56.1°F");
  });
});
