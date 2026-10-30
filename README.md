# WeatherFlow Harness

An OpenCode agent harness for building and verifying a small weather web app.
The target app in `target-app/` uses the free **Open-Meteo** geocoding and
forecast APIs, so no API key or `.env` secret is required.

## Base agent and model

- Base agent: OpenCode v1 (the project specification targets v1.18.31)
- Model: `openrouter/deepseek/deepseek-v4.1-flash-1017`
- Model comparison and rationale: [`model-selection.md`](./model-selection.md)

## Repository layout

```text
.
├── opencode.json                 # agent, model, permissions, instructions
├── AGENTS.md                     # project context and rules for the agent
├── spec.md                       # specification of the weather app
├── model-selection.md            # 3-model comparison and decision
├── .opencode/
│   ├── package.json              # plugin/tool dependencies
│   └── tools/
│       ├── check_build.ts        # runs `npm run build` in target-app
│       ├── check_types.ts        # runs `npx tsc --noEmit` in target-app
│       ├── check_free_weather_api.ts  # checks free API usage, writes a report
│       └── temperature_converter.ts   # C/F conversion tool
├── results/                      # generated check reports
└── target-app/                   # Next.js weather app (the target software)
```

## Requirements

- Node.js 20 or newer
- npm
- OpenCode v1

## Install and run the app

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
free Open-Meteo API (no API key). Run check_types, check_build,
check_free_weather_api, and npm test, and fix until all are green.
```

Headless example:

```powershell
opencode run "Read AGENTS.md and spec.md. Implement the spec in target-app, then run the checks until green."
```

## Custom tools

| Tool | Purpose |
| --- | --- |
| `check_types` | Runs `npx tsc --noEmit` inside `target-app`. |
| `check_build` | Runs `npm run build` inside `target-app`. |
| `check_free_weather_api` | Verifies Open-Meteo usage, rejects API-key/OpenWeatherMap usage, and writes `results/free-weather-api.json`. |
| `temperature_converter` | Converts temperatures between Celsius and Fahrenheit. |

## Verification loop

The agent repeats this until all checks are green:

1. Edit code in `target-app/`.
2. Run `check_types`, `check_build`, `check_free_weather_api`, and `npm test`.
3. If a check fails, read the structured result/report, fix the cause, and rerun.

Stop criterion: all three harness checks return `SUCCESS` and `npm test` passes.

## Weather data

- Geocoding: <https://geocoding-api.open-meteo.com/v1/search>
- Forecast: <https://api.open-meteo.com/v1/forecast>
- License/attribution: Open-Meteo data is free for non-commercial use and is
  published under CC-BY 4.0.
