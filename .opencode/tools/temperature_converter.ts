import { tool } from '@opencode-ai/plugin';

export default tool({
  description:
    'Convert a temperature between Celsius and Fahrenheit. ' +
    'Use when the user needs a temperature converted between these two units.',

  args: {
    value: tool.schema.number().describe('The temperature value to convert'),
    fromUnit: tool.schema
      .enum(['celsius', 'fahrenheit'])
      .describe("The current unit: 'celsius' or 'fahrenheit'"),
  },

  async execute(args) {
    if (args.fromUnit === 'celsius') {
      const fahrenheit = (args.value * 9) / 5 + 32;
      return `${args.value}°C = ${fahrenheit.toFixed(2)}°F`;
    }

    const celsius = ((args.value - 32) * 5) / 9;
    return `${args.value}°F = ${celsius.toFixed(2)}°C`;
  },
});
