import fs from "node:fs";
import path from "node:path";
import { tool } from "@opencode-ai/plugin";
import { runFreeApiCheck } from "../lib/verification";

export default tool({
  description:
    "Verifies that target-app uses the free Open-Meteo API and contains no " +
    "OpenWeatherMap endpoints or API-key usage. Writes a structured report to " +
    "results/free-weather-api.json.",

  args: {},

  async execute(_args, context) {
    const result = runFreeApiCheck(context.worktree);
    const reportDir = path.join(context.worktree, "results");
    const reportPath = path.join(reportDir, "free-weather-api.json");
    const status = result.ok ? "SUCCESS" : "FAILED";

    const report = {
      tool: "check_free_weather_api",
      status,
      checkedAt: new Date().toISOString(),
      sourceDir: path.join(context.worktree, "target-app", "src"),
      filesChecked: result.filesChecked,
      findings: result.findings,
      missingRequired: result.missingRequired,
      message: result.message,
    };

    fs.mkdirSync(reportDir, { recursive: true });
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), "utf-8");

    return JSON.stringify({
      status,
      message: result.message,
      reportPath,
      filesChecked: result.filesChecked,
      findings: result.findings.length,
      missingRequired: result.missingRequired,
    });
  },
});
