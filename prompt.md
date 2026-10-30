Adhere strictly to all directives and conventions outlined in AGENTS.md.

### What:
Implement the Open-Meteo geocoding and forecast integration inside `target-app/src/services/weather/`.
- Add a typed function to resolve city names into coordinates using the Open-Meteo Geocoding API.
- Add a typed function to fetch current weather conditions and a 7-day forecast using resolved coordinates.
- Implement explicit error handling for empty results, network timeouts, and non-200 responses without throwing unhandled exceptions.

### Why:
`target-app` requires real-time forecast data. A robust, strongly typed service layer ensures UI consumers remain stable during external API outages or malformed inputs.

### When Done:
- Geocoding and weather client functions are implemented with complete TypeScript types.
- Unit tests cover success paths, empty search results, and network failure modes.
- `check_types`, `check_build`, and `check_free_weather_api` return SUCCESS.
- `npm test` passes inside `target-app`.
- Final response outputs a concise changelog of touched files and verification outputs.