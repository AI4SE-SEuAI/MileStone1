import fs from "node:fs";
import path from "node:path";
import { tool } from "@opencode-ai/plugin";
import {
  runBuild,
  runFreeApiCheck,
  runTests,
  runTypeCheck,
  type CheckResult,
  type FreeApiCheckResult,
  type TestCheckResult,
} from "../lib/verification";

const DEFAULT_MAX_ATTEMPTS = 5;

type AnyCheckResult = CheckResult &
  Partial<TestCheckResult> &
  Partial<FreeApiCheckResult>;

interface GateState {
  attempts: number;
  maxAttempts: number;
  startedAt: string | null;
  lastStatus: "PASS" | "FAIL" | "STOPPED" | null;
  lastRunAt: string | null;
}

function statePath(worktree: string): string {
  return path.join(worktree, "results", "verification-state.json");
}

function logPath(worktree: string): string {
  return path.join(worktree, "results", "verification-log.jsonl");
}

function readState(worktree: string): GateState {
  const file = statePath(worktree);

  try {
    if (fs.existsSync(file)) {
      const parsed = JSON.parse(fs.readFileSync(file, "utf-8")) as Partial<GateState>;

      return {
        attempts: Number.isInteger(parsed.attempts) ? Number(parsed.attempts) : 0,
        maxAttempts: Number.isInteger(parsed.maxAttempts)
          ? Number(parsed.maxAttempts)
          : DEFAULT_MAX_ATTEMPTS,
        startedAt: typeof parsed.startedAt === "string" ? parsed.startedAt : null,
        lastStatus: parsed.lastStatus ?? null,
        lastRunAt: typeof parsed.lastRunAt === "string" ? parsed.lastRunAt : null,
      };
    }
  } catch {
    // Corrupt state is treated as a fresh cycle.
  }

  return {
    attempts: 0,
    maxAttempts: DEFAULT_MAX_ATTEMPTS,
    startedAt: null,
    lastStatus: null,
    lastRunAt: null,
  };
}

function writeState(worktree: string, state: GateState): void {
  fs.mkdirSync(path.dirname(statePath(worktree)), { recursive: true });
  fs.writeFileSync(statePath(worktree), JSON.stringify(state, null, 2), "utf-8");
}

function appendLog(worktree: string, entry: Record<string, unknown>): void {
  fs.mkdirSync(path.dirname(logPath(worktree)), { recursive: true });
  fs.appendFileSync(logPath(worktree), `${JSON.stringify(entry)}\n`, "utf-8");
}

function summarizeCheck(result: AnyCheckResult): Record<string, unknown> {
  return {
    ok: result.ok,
    message: result.message,
    ...(typeof result.passed === "number" ? { passed: result.passed } : {}),
    ...(typeof result.failed === "number" ? { failed: result.failed } : {}),
    ...(Array.isArray(result.failingTests)
      ? { failingTests: result.failingTests }
      : {}),
    ...(typeof result.filesChecked === "number"
      ? { filesChecked: result.filesChecked }
      : {}),
    ...(Array.isArray(result.findings)
      ? { findingCount: result.findings.length }
      : {}),
    ...(Array.isArray(result.missingRequired)
      ? { missingRequired: result.missingRequired }
      : {}),
    ...(result.errorLog ? { errorLog: result.errorLog.slice(-2000) } : {}),
  };
}

export default tool({
  description:
    "Runs the full verification pipeline for target-app in order: " +
    "check_types, check_tests, check_build, check_free_weather_api. Stops at " +
    "the first failing check, records every attempt in " +
    "results/verification-log.jsonl, and enforces a retry limit (default 5) " +
    "by returning STOPPED once the budget is exhausted. A PASS resets the " +
    "budget. Use {\"reset\": true} to start a new budget after STOPPED.",

  args: {
    reset: tool.schema
      .boolean()
      .optional()
      .describe("Reset the retry counter and start a fresh verification cycle."),
    maxAttempts: tool.schema
      .number()
      .optional()
      .describe("Override the retry limit for this cycle (default 5)."),
  },

  async execute(args, context) {
    const { worktree } = context;
    const now = new Date().toISOString();
    const override =
      typeof args.maxAttempts === "number" &&
      Number.isInteger(args.maxAttempts) &&
      args.maxAttempts > 0
        ? args.maxAttempts
        : undefined;

    if (args.reset) {
      const state: GateState = {
        attempts: 0,
        maxAttempts: override ?? DEFAULT_MAX_ATTEMPTS,
        startedAt: now,
        lastStatus: null,
        lastRunAt: null,
      };

      writeState(worktree, state);
      appendLog(worktree, {
        timestamp: now,
        event: "reset",
        maxAttempts: state.maxAttempts,
      });

      return JSON.stringify({
        status: "RESET",
        message: `Retry counter reset. New budget: ${state.maxAttempts} attempts.`,
        attempts: state.attempts,
        maxAttempts: state.maxAttempts,
        statePath: statePath(worktree),
        logPath: logPath(worktree),
      });
    }

    const state = readState(worktree);
    const maxAttempts = override ?? state.maxAttempts ?? DEFAULT_MAX_ATTEMPTS;
    state.maxAttempts = maxAttempts;

    if (state.attempts >= maxAttempts) {
      state.lastStatus = "STOPPED";
      writeState(worktree, state);

      const result = {
        status: "STOPPED",
        message:
          `Retry limit reached: ${state.attempts}/${maxAttempts} attempts ` +
          "without a PASS. The gate will not run again until you reset it.",
        stopCriterion: `retryLimit=${maxAttempts}`,
        attempts: state.attempts,
        maxAttempts,
        hint: 'Fix the root cause, then call verification_gate with {"reset": true}.',
        statePath: statePath(worktree),
        logPath: logPath(worktree),
      };

      appendLog(worktree, {
        timestamp: now,
        event: "stopped",
        attempt: state.attempts,
        maxAttempts,
        status: "STOPPED",
        message: result.message,
      });

      return JSON.stringify(result, null, 2);
    }

    const attempt = state.attempts + 1;
    const checks: Record<string, AnyCheckResult> = {};
    const skipped: string[] = [];
    let failedCheck: string | null = null;

    const runners: Array<[string, () => AnyCheckResult]> = [
      ["types", () => runTypeCheck(worktree)],
      ["tests", () => runTests(worktree)],
      ["build", () => runBuild(worktree)],
      ["freeApi", () => runFreeApiCheck(worktree)],
    ];

    for (const [name, run] of runners) {
      if (failedCheck) {
        skipped.push(name);
        continue;
      }

      const result = run();
      checks[name] = result;

      if (!result.ok) {
        failedCheck = name;
      }
    }

    const status = failedCheck ? "FAIL" : "PASS";
    state.attempts = status === "PASS" ? 0 : attempt;
    state.lastStatus = status;
    state.lastRunAt = now;
    state.startedAt = state.startedAt ?? now;

    writeState(worktree, state);

    const summary = Object.fromEntries(
      Object.entries(checks).map(([name, result]) => [
        name,
        summarizeCheck(result),
      ]),
    );

    appendLog(worktree, {
      timestamp: now,
      event: "check",
      attempt,
      maxAttempts,
      status,
      failedCheck,
      skipped,
      checks: summary,
    });

    const failedResult = failedCheck ? checks[failedCheck] : undefined;

    return JSON.stringify(
      {
        status,
        message:
          status === "PASS"
            ? "All verification checks passed. Retry budget reset."
            : `Verification failed at "${failedCheck}". Fix the cause and rerun.`,
        attempt,
        maxAttempts,
        remainingAttempts: status === "PASS" ? maxAttempts : maxAttempts - state.attempts,
        stopCriterion: `retryLimit=${maxAttempts}`,
        failedCheck,
        skipped,
        checks: summary,
        ...(failedResult?.errorLog ? { errorLog: failedResult.errorLog } : {}),
        statePath: statePath(worktree),
        logPath: logPath(worktree),
      },
      null,
      2,
    );
  },
});
