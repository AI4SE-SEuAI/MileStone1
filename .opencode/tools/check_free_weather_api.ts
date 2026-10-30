import fs from "fs";
import path from "path";

interface Finding {
  file: string;
  line: number;
  pattern: string;
  snippet: string;
}

const FORBIDDEN_PATTERNS = [
  { pattern: /openweathermap\.org/i, label: "OpenWeatherMap endpoint" },
  { pattern: /WEATHER_API_KEY/, label: "API key environment variable" },
  { pattern: /[?&]appid=/i, label: "API key query parameter" },
];

const REQUIRED_PATTERNS = [
  "api.open-meteo.com",
  "geocoding-api.open-meteo.com",
];

const SOURCE_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs"]);

function collectSourceFiles(directory: string): string[] {
  const files: string[] = [];

  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".next") {
      continue;
    }

    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...collectSourceFiles(fullPath));
      continue;
    }

    if (SOURCE_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

function findForbiddenUsage(files: string[]): Finding[] {
  const findings: Finding[] = [];

  for (const file of files) {
    const lines = fs.readFileSync(file, "utf-8").split(/\r?\n/);

    lines.forEach((line, index) => {
      for (const rule of FORBIDDEN_PATTERNS) {
        if (rule.pattern.test(line)) {
          findings.push({
            file,
            line: index + 1,
            pattern: rule.label,
            snippet: line.trim().slice(0, 160),
          });
        }
      }
    });
  }

  return findings;
}

function findMissingRequired(files: string[]): string[] {
  const contents = files
    .map((file) => fs.readFileSync(file, "utf-8"))
    .join("\n");

  return REQUIRED_PATTERNS.filter((pattern) => !contents.includes(pattern));
}

export default {
  description:
    "Verifies that target-app uses the free Open-Meteo API and contains no " +
    "OpenWeatherMap endpoints or API-key usage. Writes a structured report to " +
    "results/free-weather-api.json.",

  args: {},

  async execute(_args: unknown, context: { worktree: string }) {
    const sourceDir = path.join(context.worktree, "target-app", "src");
    const reportDir = path.join(context.worktree, "results");
    const reportPath = path.join(reportDir, "free-weather-api.json");

    const report = {
      tool: "check_free_weather_api",
      status: "FAILED",
      checkedAt: new Date().toISOString(),
      sourceDir,
      filesChecked: 0,
      findings: [] as Finding[],
      missingRequired: [] as string[],
      message: "",
    };

    try {
      if (!fs.existsSync(sourceDir)) {
        report.message = "target-app/src does not exist.";
      } else {
        const files = collectSourceFiles(sourceDir);
        report.filesChecked = files.length;
        report.findings = findForbiddenUsage(files);
        report.missingRequired = findMissingRequired(files);

        const passed =
          report.findings.length === 0 && report.missingRequired.length === 0;
        report.status = passed ? "SUCCESS" : "FAILED";
        report.message = passed
          ? "Free Open-Meteo API usage verified; no API key required."
          : "Free-API check failed. Review findings and missingRequired.";
      }
    } catch (error) {
      report.message =
        error instanceof Error ? error.message : "Free-API check crashed.";
    }

    fs.mkdirSync(reportDir, { recursive: true });
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), "utf-8");

    return JSON.stringify({
      status: report.status,
      message: report.message,
      reportPath,
      filesChecked: report.filesChecked,
      findings: report.findings.length,
      missingRequired: report.missingRequired,
    });
  },
};
