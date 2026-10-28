// temperature-converter.ts
import { tool } from '@opencode-ai/plugin';

export const convertTemperature = tool({
  description: 'Convert temperature between Celsius and Fahrenheit',
  args: {
    value: tool.schema.number().describe('The temperature value to convert'),
    fromUnit: tool.schema
      .enum(['celsius', 'fahrenheit'])
      .describe("The current unit: 'celsius' or 'fahrenheit'"),
  },
  async execute({ value, fromUnit }) {
    if (fromUnit === 'celsius') {
      const fahrenheit = (value * 9) / 5 + 32;
      return `${value}°C = ${fahrenheit.toFixed(2)}°F`;
    } else {
      const celsius = ((value - 32) * 5) / 9;
      return `${value}°F = ${celsius.toFixed(2)}°C`;
    }
  },
});
