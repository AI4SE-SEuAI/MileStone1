const gateModule = await import("../.opencode/tools/verification_gate.ts");
const gate = gateModule.default;

const raw = await gate.execute({}, { worktree: process.cwd() });
const result = JSON.parse(raw);

console.log(JSON.stringify(result, null, 2));

if (result.status !== "PASS") {
  process.exitCode = 1;
}
