# Milestone 2 demo prompt

This is the exact prompt used for the headless harness demo. A deliberately
failing test and stub were committed to `target-app/src` beforehand so the
first `verification_gate` call always returns `FAIL`.

```text
You are running with the WeatherFlow harness. Read AGENTS.md, spec.md, and
docs/sandbox.md first.

Implement ONE small feature in target-app using the existing failing test as
the RED signal.

Feature: reusable Celsius/Fahrenheit unit toggle applied to the "Cities right
now" list.

Acceptance criteria:
1. Replace the stub `formatCityTemperature` in
   target-app/src/services/weather/temperature_converter.ts with a real
   implementation: return "—" for null, otherwise the same output as
   formatTemperature(celsius, unit).
2. Keep the tests for `formatCityTemperature` in
   target-app/src/services/weather/temperature_converter.test.ts passing.
3. Extract the °C/°F toggle markup from
   target-app/src/components/WeatherSearch.tsx into a reusable `UnitToggle`
   component at target-app/src/components/UnitToggle.tsx with props
   `{ unit: TemperatureUnit; onChange: (unit: TemperatureUnit) => void }`.
   Use it in WeatherSearch.
4. Add the same UnitToggle to target-app/src/components/CityTemperatures.tsx
   and render each city temperature with
   formatCityTemperature(entry.temperatureC, unit).
5. Do not add dependencies. Do not modify files outside target-app/src.

Required workflow:
- Step A (RED): call `verification_gate` first. It must return FAIL because of
  the pre-seeded stub. Note the failing test name.
- Step B (GREEN): implement the feature, then call `verification_gate` again.
  Fix and rerun until it returns PASS.
- If the gate returns STOPPED (5 attempts without a PASS), stop and report the
  blocker instead of retrying.

Constraints:
- Do not run npm install.
- Do not edit package.json, opencode.json, AGENTS.md, or files outside
  target-app/src.
- Do not use git commit or git push.
- Finish with a short summary: files changed and the RED/GREEN gate results.
```
