import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

export interface CheckResult {
  ok: boolean;
  message: string;
  errorLog?: string;
}

export interface TestSummary {
  passed: number;
  failed: number;
  total: number;
  failingTests: string[];
}

export interface TestCheckResult extends CheckResult, TestSummary {}

export interface Finding {
  file: string;
  line: number;
  pattern: string;
  snippet: string;
}

export interface FreeApiCheckResult extends CheckResult {
  filesChecked: number;
  findings: Finding[];
  missingRequired: string[];
}

interface CommandResult {
  ok: boolean;
  stdout: string;
  stderr: string;
  status: number;
}

const COMMAND_TIMEOUT_MS = 240_000;

function tail(value: string, maxLength = 4000): string {
  return value.length > maxLength ? value.slice(-maxLength) : value;
}

function runCommand(command: string, cwd: string): CommandResult {
  try {
    const stdout = execSync(command, {
      cwd,
      encoding: "utf-8",
      timeout: COMMAND_TIMEOUT_MS,
      stdio: ["ignore", "pipe", "pipe"],
    });

    return { ok: true, stdout: stdout ?? "", stderr: "", status: 0 };
  } catch (error) {
    const err = error as NodeJS.ErrnoException & {
      stdout?: string | Buffer;
      stderr?: string | Buffer;
      status?: number;
    };

    return {
      ok: false,
      stdout: err.stdout ? err.stdout.toString() : "",
      stderr: err.stderr ? err.stderr.toString() : err.message,
      status: typeof err.status === "number" ? err.status : 1,
    };
  }
}

export function runTypeCheck(worktree: string): CheckResult {
  const result = runCommand(
    "npx tsc --noEmit",
    path.join(worktree, "target-app"),
  );

  if (result.ok) {
    return { ok: true, message: "No TypeScript type errors found." };
  }

  return {
    ok: false,
    message: "TypeScript type errors detected.",
    errorLog: tail(`${result.stdout}\n${result.stderr}`),
  };
}

export function parseVitestSummary(output: string): TestSummary {
  const testsLine = output.match(/^\s*Tests\s+(.+)$/m)?.[1] ?? "";
  const passed = Number.parseInt(
    testsLine.match(/(\d+)\s+passed/)?.[1] ?? "0",
    10,
  );
  const failed = Number.parseInt(
    testsLine.match(/(\d+)\s+failed/)?.[1] ?? "0",
    10,
  );
  const total = Number.parseInt(
    testsLine.match(/\((\d+)\)/)?.[1] ?? String(passed + failed),
    10,
  );

  const failingTests = [
    ...new Set(
      [...output.matchAll(/^\s*FAIL\s+(.+)$/gm)].map((match) =>
        match[1].trim(),
      ),
    ),
  ];

  return { passed, failed, total, failingTests };
}

export function runTests(worktree: string): TestCheckResult {
  const result = runCommand("npm test", path.join(worktree, "target-app"));
  const output = `${result.stdout}\n${result.stderr}`;
  const summary = parseVitestSummary(output);
  const ok = result.ok && summary.failed === 0;

  return {
    ok,
    message: ok
      ? "All unit tests passed."
      : "Unit tests failed or could not run.",
    ...summary,
    ...(ok
      ? {}
      : { errorLog: tail(output) }),
  };
}

export function runBuild(worktree: string): CheckResult {
  const result = runCommand("npm run build", path.join(worktree, "target-app"));

  if (result.ok) {
    return {
      ok: true,
      message: "Build finished successfully.",
    };
  }

  return {
    ok: false,
    message: "Build failed.",
    errorLog: tail(`${result.stdout}\n${result.stderr}`),
  };
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

export function runFreeApiCheck(worktree: string): FreeApiCheckResult {
  const sourceDir = path.join(worktree, "target-app", "src");

  if (!fs.existsSync(sourceDir)) {
    return {
      ok: false,
      message: "target-app/src does not exist.",
      filesChecked: 0,
      findings: [],
      missingRequired: REQUIRED_PATTERNS,
    };
  }

  try {
    const files = collectSourceFiles(sourceDir);
    const findings = findForbiddenUsage(files);
    const missingRequired = findMissingRequired(files);
    const ok = findings.length === 0 && missingRequired.length === 0;

    return {
      ok,
      message: ok
        ? "Free Open-Meteo API usage verified; no API key required."
        : "Free-API check failed. Review findings and missingRequired.",
      filesChecked: files.length,
      findings,
      missingRequired,
    };
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Free-API check crashed.",
      filesChecked: 0,
      findings: [],
      missingRequired: [],
    };
  }
}
