import fs from "node:fs";
import path from "node:path";
import { tool } from "@opencode-ai/plugin";
import { runTests } from "../lib/verification";

export default tool({
  description:
    "Runs `npm test` (vitest) inside the target-app directory and returns a " +
    "structured summary of passed/failed tests plus the failing test names. " +
    "Writes the summary to results/test-report.json.",

  args: {},

  async execute(_args, context) {
    const result = runTests(context.worktree);
    const reportDir = path.join(context.worktree, "results");
    const reportPath = path.join(reportDir, "test-report.json");
    const status = result.ok ? "SUCCESS" : "FAILED";

    const report = {
      tool: "check_tests",
      status,
      checkedAt: new Date().toISOString(),
      passed: result.passed,
      failed: result.failed,
      total: result.total,
      failingTests: result.failingTests,
      message: result.message,
      ...(result.errorLog ? { errorLog: result.errorLog } : {}),
    };

    fs.mkdirSync(reportDir, { recursive: true });
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), "utf-8");

    return JSON.stringify({
      status,
      message: result.message,
      passed: result.passed,
      failed: result.failed,
      total: result.total,
      failingTests: result.failingTests,
      reportPath,
      ...(result.errorLog ? { errorLog: result.errorLog } : {}),
    });
  },
});
