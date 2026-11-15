# WeatherFlow Harness

An OpenCode agent harness for building and verifying a small weather web app.
The target app in `target-app/` uses the free **Open-Meteo** geocoding and
forecast APIs, so no API key or `.env` secret is required.

## Base agent and model

- Base agent: OpenCode v1 (the project specification targets v1.18.31)
- Model: `opencode/deepseek-v4.1-flash-free` (see `model-selection.md`).
  The OpenRouter key in this environment reports a `$0.00` limit; pass
  `-m openrouter/deepseek/deepseek-v4.1-flash-1017` after adding budget.
- Model comparison and rationale: [`model-selection.md`](./model-selection.md)

## Repository layout

```text
.
├── opencode.json                 # agent, model, permissions, instructions
├── AGENTS.md                     # project context and rules for the agent
├── spec.md                       # specification of the weather app
├── model-selection.md            # 3-model comparison and decision
├── .opencode/
│   ├── package.json              # @opencode-ai/plugin dependency
│   ├── lib/
│   │   └── verification.ts       # shared check runners (types/tests/build/free API)
│   └── tools/
│       ├── check_build.ts            # runs `npm run build` in target-app
│       ├── check_types.ts            # runs `npx tsc --noEmit` in target-app
│       ├── check_tests.ts            # runs `npm test`, returns failing test names
│       ├── check_free_weather_api.ts # checks free API usage, writes a report
│       ├── verification_gate.ts      # full pipeline + retry-limit stop criterion
│       └── temperature_converter.ts  # C/F conversion tool
├── docs/
│   ├── sandbox.md                # allow / ask / deny sandbox concept
│   └── m2-demo-prompt.md         # exact headless demo prompt
├── scripts/
│   ├── m2-stop-criterion.mjs     # demonstrates retry-limit STOPPED
│   ├── m2-final-gate.mjs         # runs the gate for the final check
│   └── ts-resolve-loader.mjs     # Node loader for extensionless TS imports
├── results/                      # generated check reports and verification logs
└── target-app/                   # Next.js weather app (the target software)
```

## Requirements

- Node.js 20 or newer
- npm
- OpenCode v1 (v1.18.31)

## Install the harness into a project

To install this harness into an existing repository:

1. Copy `opencode.json`, `AGENTS.md`, `spec.md`, and the `.opencode/` directory into the project root.
2. Install the OpenCode plugin dependencies:

```powershell
npm install --prefix .opencode
```

## Install and run the target app

```powershell
npm install --prefix target-app
npm run dev --prefix target-app
```

Open <http://localhost:3000>, type a city name, and submit. No API key is needed.

Other target-app commands:

```powershell
npm test --prefix target-app       # vitest
npm run build --prefix target-app  # production build
```

## Use the harness

Start OpenCode from the repository root so `AGENTS.md`, `spec.md`, and the
custom tools are loaded:

```powershell
opencode
```

Example prompt:

```text
Read AGENTS.md and spec.md. Implement the weather app in target-app using the
free Open-Meteo API (no API key). Run verification_gate and fix until it
returns PASS within the 5-attempt retry budget.
```

Headless example:

```powershell
opencode run "Read AGENTS.md and spec.md. Implement the spec in target-app, then run verification_gate until it passes."
```

## Custom tools

| Tool | Purpose |
| --- | --- |
| `check_types` | Runs `npx tsc --noEmit` inside `target-app`. |
| `check_tests` | Runs `npm test` (vitest) and returns pass/fail counts plus failing test names. |
| `check_build` | Runs `npm run build` inside `target-app`. |
| `check_free_weather_api` | Verifies Open-Meteo usage, rejects API-key/OpenWeatherMap usage, and writes `results/free-weather-api.json`. |
| `verification_gate` | Runs types → tests → build → free-API, logs every attempt, and enforces the retry-limit stop criterion. |
| `temperature_converter` | Converts temperatures between Celsius and Fahrenheit. |

## Verification loop

The agent repeats this until the gate passes:

1. Edit code in `target-app/src/`.
2. Run `verification_gate`. It runs `check_types` → `check_tests` →
   `check_build` → `check_free_weather_api` in order and stops at the first
   failure.
3. If the gate returns `FAIL`, read the structured result,
   `results/verification-log.jsonl`, and `results/test-report.json`; fix the
   cause and rerun.

**Stop criterion:** the gate returns `STOPPED` after **5 attempts without a
PASS**. A `PASS` resets the retry budget. After `STOPPED`, call
`verification_gate` with `{"reset": true}` to start a new cycle.

Milestone 2 evidence:

- `results/m2-demo.log` — headless `opencode run` transcript for the demo feature
  (RED → fix → GREEN).
- `results/m2-demo-verification-log.jsonl` — gate attempts from that demo run.
- `results/m2-stop-criterion.log` — five failed attempts followed by `STOPPED`.
- `results/m2-verification-log.jsonl` — full gate log (demo + stop criterion +
  final PASS).
- `results/m2-final-gate.log` — final `PASS` result.
- `results/verification-state.json` — current retry counter.
- `results/test-report.json` — latest test summary.
- `docs/m2-demo-prompt.md` — exact prompt used for the demo.
- `scripts/m2-stop-criterion.mjs`, `scripts/m2-final-gate.mjs` — reproducible
  gate drivers.

The demo feature added a reusable `UnitToggle` component and applied it to the
"Cities right now" list, with `formatCityTemperature` covered by unit tests.

Reproduce the stop criterion and the final gate:

```powershell
node --no-warnings --experimental-strip-types --experimental-loader ./scripts/ts-resolve-loader.mjs scripts/m2-stop-criterion.mjs
node --no-warnings --experimental-strip-types --experimental-loader ./scripts/ts-resolve-loader.mjs scripts/m2-final-gate.mjs
```

`m2-stop-criterion.mjs` creates a temporary failing test, runs the gate five
times, shows the sixth call returning `STOPPED`, deletes the temporary test, and
resets the budget.

## Sandbox and permissions

The agent runs with a restricted working directory, a file-write allowlist, and
a command allow/ask/deny list. The full matrix and its limitations are in
[`docs/sandbox.md`](./docs/sandbox.md).

- **Allowed:** edits in `target-app/src/`, `results/`, `docs/`; the verification
  commands (`npm test`, `npm run build`, `npx tsc --noEmit`).
- **Requires confirmation:** edits elsewhere, `npm install`, `git add`/`commit`.
- **Forbidden:** `.env`/secrets, paths outside the worktree, `git push`,
  destructive deletes, shell network fetches, `webfetch`/`websearch`.

## Weather data

- Geocoding: <https://geocoding-api.open-meteo.com/v1/search>
- Forecast: <https://api.open-meteo.com/v1/forecast>
- License/attribution: Open-Meteo data is free for non-commercial use and is
  published under CC-BY 4.0.
