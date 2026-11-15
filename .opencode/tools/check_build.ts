import { tool } from "@opencode-ai/plugin";
import { runBuild } from "../lib/verification";

export default tool({
  description:
    "Runs `npm run build` inside the target-app directory to check " +
    "whether the project has any build errors.",

  args: {},

  async execute(_args, context) {
    const result = runBuild(context.worktree);

    return JSON.stringify({
      status: result.ok ? "SUCCESS" : "FAILED",
      message: result.message,
      ...(result.errorLog ? { errorLog: result.errorLog } : {}),
    });
  },
});
