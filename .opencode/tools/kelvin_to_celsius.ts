import { z } from "zod";

export default {
  description:
    "Convert a temperature from Kelvin to Celsius. " +
    "Use this whenever a temperature needs to be shown in Celsius " +
    "(e.g. when building the weather app, the weather API returns Kelvin).",

  args: {
    kelvin: z.number().describe("Temperature in Kelvin"),
  },

  async execute(args: { kelvin: number }) {
    const celsius = args.kelvin - 273.15;
    return `${args.kelvin} K = ${celsius.toFixed(2)} °C`;
  },
};
