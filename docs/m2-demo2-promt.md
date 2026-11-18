# Milestone 2 demo2 prompt

```text
You are running with the WeatherFlow harness. Read AGENTS.md, spec.md, and
docs/sandbox.md first.

Implement new feature: location detection and show the current temperature of user location in target-app, if there is posible to rain on the day, show a symbol and message to remind.

Acceptance criteria:
1. Create new service in
   target-app/src/services/ with a real implementation.
2. Keep the tests for the new service passing.
3. Do not add dependencies. Do not modify files outside target-app/src.

Required workflow:
- Step A : call `verification_gate` first.
- Step B : implement the feature, then call `verification_gate` again.
  Fix and rerun until it returns PASS.
- If the gate returns STOPPED (5 attempts without a PASS), stop and report the
  blocker instead of retrying.

Constraints:
- Do not run npm install.
- Do not edit package.json, opencode.json, AGENTS.md, or files outside
  target-app/src.
- Do not use git commit or git push.
- Finish with a short summary: files changed and the RED/GREEN gate results.
- Logs muss be written as evidence.
```
