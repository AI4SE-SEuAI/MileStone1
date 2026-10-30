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
- **Unit Tests:** `npm test` (run inside `target-app/`)

## Conventions & Rules

- **API Usage:** Use exclusively the free Open-Meteo geocoding and forecast endpoints. Never add API keys, secrets, or `.env` files.
- **Error Handling:** Handle all external API failure modes gracefully (e.g., city not found, network timeouts, invalid JSON payload). Do not let uncaught errors crash the application flow.
- **Code Quality:** Keep logic modular and avoid unnecessary dependencies.

## Definition of Done (DoD)

Before declaring the task complete:

1. Verification tools `check_types`, `check_build`, and `check_free_weather_api` all return `SUCCESS`.
2. `npm test` passes with zero failures.
3. Every new weather logic path, parser, or utility function includes corresponding unit tests.
4. Your final response includes a concise summary of:
   - Modified, added, or deleted files.
   - Exact checks/tests executed and their results.
