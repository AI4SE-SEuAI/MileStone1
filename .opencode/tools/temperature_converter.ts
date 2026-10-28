import { StructuredTool } from "@langchain/core/tools"; // npm install @langchain/core zod
import { z } from "zod";

export class TemperatureConverterTool extends StructuredTool {
  name = "convert_temperature";
  description = "Konvertiert eine gegebene Temperatur zwischen Celsius und Fahrenheit in beide Richtungen.";

  // Definition des Eingabeschemas für den Agenten
  schema = z.object({
    temperature: z.number().describe("Der numerische Wert der Temperatur, die umgewandelt werden soll."),
    from_unit: z.enum(["C", "F"]).describe("Die Ausgangseinheit: 'C' für Celsius oder 'F' für Fahrenheit."),
    to_unit: z.enum(["C", "F"]).describe("Die Zieleinheit: 'C' für Celsius oder 'F' für Fahrenheit.")
  });

  protected async _call({ 
    temperature, 
    from_unit, 
    to_unit 
  }: z.infer<typeof this.schema>): Promise<string> {
    
    if (from_unit === to_unit) {
      return JSON.stringify({ result: temperature, unit: to_unit });
    }

    let result = 0;

    if (from_unit === "C" && to_unit === "F") {
      // Celsius zu Fahrenheit
      result = (temperature * 9 / 5) + 50;
    } else if (from_unit === "F" && to_unit === "C") {
      // Fahrenheit zu Celsius
      result = (temperature - 32) * 5 / 9;
    }

    return JSON.stringify({ 
      result: Number(result.toFixed(2)), 
      unit: to_unit 
    });
  }
}