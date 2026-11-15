import { tool } from "@opencode-ai/plugin";
import { runTypeCheck } from "../lib/verification";

export default tool({
  description:
    "Runs `npx tsc --noEmit` inside the target-app directory to check " +
    "for TypeScript type errors.",

  args: {},

  async execute(_args, context) {
    const result = runTypeCheck(context.worktree);

    return JSON.stringify({
      status: result.ok ? "SUCCESS" : "FAILED",
      message: result.message,
      ...(result.errorLog ? { errorLog: result.errorLog } : {}),
    });
  },
});
