import path from "path";
import { execSync } from "child_process";
import { tool } from "@opencode-ai/plugin";

export default tool({
  description:
    "Chạy `npx tsc --noEmit` trong target-app để kiểm tra lỗi kiểu dữ liệu TypeScript.",

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
        message: "Không phát hiện lỗi kiểu dữ liệu nào!",
      });
    } catch (error) {
      const err = error as NodeJS.ErrnoException & { stdout?: string | Buffer };
      return JSON.stringify({
        status: "FAILED",
        message: "Phát hiện lỗi kiểu dữ liệu TypeScript!",
        errorLog: err.stdout ? err.stdout.toString() : err.message,
      });
    }
  },
});
