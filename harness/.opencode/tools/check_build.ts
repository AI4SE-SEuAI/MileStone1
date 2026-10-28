import path from "path";
import { execSync } from "child_process";
import { tool } from "@opencode-ai/plugin";

export default tool({
  description:
    "Runs `npm run build` inside the target-app directory to check " +
    "whether the project has any build/type-check errors.",

  args: {},

  async execute(_args, context) {
    const targetDir = path.join(context.worktree, "target-app");

    try {
      const stdout = execSync("npm run build", {
        cwd: targetDir,
        encoding: "utf-8",
      });

      return JSON.stringify({
        status: "SUCCESS",
        message: "Build completed successfully. No errors found.",
        output: stdout.slice(-300),
      });
    } catch (error) {
      const err = error as NodeJS.ErrnoException & { stdout?: string | Buffer };
      return JSON.stringify({
        status: "FAILED",
        message: "Build failed.",
        errorLog: err.stdout ? err.stdout.toString() : err.message,
      });
    }
  },
});
