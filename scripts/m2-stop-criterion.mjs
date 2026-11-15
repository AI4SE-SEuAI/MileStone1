import fs from "node:fs";
import path from "node:path";

const gateModule = await import("../.opencode/tools/verification_gate.ts");
const gate = gateModule.default;
const context = { worktree: process.cwd() };

const tempTestPath = path.join(
  "target-app",
  "src",
  "services",
  "weather",
  "__stop_criterion_demo.test.ts",
);

const tempTestSource = `import { describe, expect, it } from "vitest";

describe("stop criterion demo", () => {
  it("intentionally fails so the gate can exhaust its retry budget", () => {
    expect(1).toBe(2);
  });
});
`;

function parse(raw) {
  try {
    return JSON.parse(raw);
  } catch {
    return { status: "UNPARSEABLE", raw };
  }
}

async function call(args) {
  const result = parse(await gate.execute(args, context));
  console.log(
    JSON.stringify(
      {
        args,
        status: result.status,
        attempt: result.attempt,
        maxAttempts: result.maxAttempts,
        remainingAttempts: result.remainingAttempts,
        failedCheck: result.failedCheck,
        message: result.message,
      },
      null,
      2,
    ),
  );
  return result;
}

console.log("=== create temporary failing test ===");
fs.writeFileSync(tempTestPath, tempTestSource, "utf-8");
console.log(tempTestPath);

try {
  console.log("=== reset ===");
  await call({ reset: true });

  for (let attempt = 1; attempt <= 5; attempt += 1) {
    console.log(`=== failing attempt ${attempt} ===`);
    await call({});
  }

  console.log("=== attempt 6 (must be STOPPED) ===");
  const stopped = await call({});

  if (stopped.status !== "STOPPED") {
    throw new Error("STOP CRITERION DID NOT ENGAGE");
  }

  console.log("=== state after STOPPED ===");
  console.log(
    fs.readFileSync(path.join("results", "verification-state.json"), "utf-8"),
  );
} finally {
  fs.rmSync(tempTestPath, { force: true });
  console.log(`=== removed temporary failing test ===`);
}

console.log("=== reset for final verification ===");
await call({ reset: true });
