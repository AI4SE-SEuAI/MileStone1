# AGENTS.md

## Commands
- Type check: Run custom tool `check_types`
- Build check: Run custom tool `check_build`
- Test: `npm test`

## Done means
- Both `check_types` and `check_build` tools return `SUCCESS`.
- `npm test` passes completely.
- Unit tests are required only for behaviors listed in the spec's Acceptance Criteria — one test per criterion.
- Your final message lists what files you changed and what was verified.

## Conventions
- Work strictly inside `target-app`.
- Keep weather API keys in `.env` and never commit real secret keys.
- Always handle API failure cases gracefully (e.g., city not found) without unhandled exceptions.
- Display temperatures in Celsius (the weather API returns Kelvin).
