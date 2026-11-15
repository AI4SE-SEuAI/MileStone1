# AGENTS.md

## Target Application Overview

`target-app` is a lightweight weather forecasting web app built with [Next.js App module].

- **Core Functionality:** Allows users to search a city, fetch coordinates via Open-Meteo Geocoding API.
- **Key Architecture:**
  - `src/services/weather/`: External API integration and payload normalization.
  - `src/components/`: UI layer for search inputs and forecast cards.
  - `src/types/`: TypeScript definitions for geocoding and forecast schemas.

## Execution Context & Scope

- **Working Directory:** Work strictly within the `target-app/` directory (or ensure all commands run inside `target-app/`).
- Do not create, modify, or delete files outside `target-app/` unless explicitly instructed.

## Commands

- **Type Check:** Call the custom tool `check_types`
- **Build Check:** Call the custom tool `check_build`
- **Free-API Check:** Call the custom tool `check_free_weather_api`
- **Unit Tests:** Call the custom tool `check_tests` (or `npm test` inside `target-app/`)
- **Full Verification Gate:** Call `verification_gate`. It runs types → tests →
  build → free API, stops at the first failure, and logs every attempt.

## Conventions & Rules

- **API Usage:** Use exclusively the free Open-Meteo geocoding and forecast endpoints. Never add API keys, secrets, or `.env` files.
- **Error Handling:** Handle all external API failure modes gracefully (e.g., city not found, network timeouts, invalid JSON payload). Do not let uncaught errors crash the application flow.
- **Code Quality:** Keep logic modular and avoid unnecessary dependencies.
- **Stop Criterion:** `verification_gate` stops after **5 attempts without a PASS** and returns `STOPPED`. A `PASS` resets the budget. After `STOPPED`, report the blocker instead of retrying; a human must call `verification_gate` with `{"reset": true}`.
- **Sandbox:** Respect the permission matrix in `docs/sandbox.md`. Do not attempt to read `.env`/secrets, write outside `target-app/src`/`results`/`docs`, push to git, or fetch URLs.

## Definition of Done (DoD)

Before declaring the task complete:

1. `verification_gate` returns `PASS` (types, tests, build, and free-API check all `SUCCESS`), or the retry budget is exhausted and the blocker is reported.
2. `npm test` passes with zero failures.
3. Every new weather logic path, parser, or utility function includes corresponding unit tests.
4. Your final response includes a concise summary of:
   - Modified, added, or deleted files.
   - Exact checks/tests executed and their results.
