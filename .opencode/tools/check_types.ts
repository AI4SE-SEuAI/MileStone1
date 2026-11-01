import path from "path";
import { execSync } from "child_process";
import { tool } from "@opencode-ai/plugin";

export default tool({
  description:
    "Runs `npx tsc --noEmit` inside the target-app directory to check " +
    "for TypeScript type errors.",

  args: {},

  async execute(_args, context) {
    const targetDir = path.join(context.worktree, "target-app");

    try {
      execSync("npx tsc --noEmit", {
        cwd: targetDir,
        encoding: "utf-8",
      });

      return JSON.stringify({
        status: "SUCCESS",
        message: "No TypeScript type errors found.",
      });
    } catch (error) {
      const err = error as NodeJS.ErrnoException & { stdout?: string | Buffer };
      return JSON.stringify({
        status: "FAILED",
        message: "TypeScript type errors detected.",
        errorLog: err.stdout ? err.stdout.toString() : err.message,
      });
    }
  },
});
