# Model Selection

The harness needs a model that can follow `AGENTS.md`/`spec.md`, call custom
tools reliably, and iterate on TypeScript code without excessive cost.

## Comparison matrix

| Model | Quality | Cost | Latency | License | Privacy | Verdict |
| --- | --- | --- | --- | --- | --- | --- |
| `openrouter/deepseek/deepseek-v4.1-flash-1017` | High for coding and tool use; strong instruction following | Medium (paid API, token-based) | Fast; suitable for iterative tool loops | DeepSeek model license plus OpenRouter API terms (check model card) | Prompts are sent to OpenRouter and routed to the model provider; avoid secrets/PII | **Selected** |
| `openrouter/deepseek/deepseek-v4-pro` | Very high; best for complex refactors and difficult bugs | High (paid API, token-based) | Slower than Flash; higher cost per iteration | DeepSeek model license plus OpenRouter API terms | Same routing/retention considerations as other OpenRouter models | Fallback for tasks Flash cannot solve |
| `opencode/deepseek-v4.1-flash-free` | Good; may be rate-limited or slightly less consistent | Free | Variable; free tiers can be slower or throttled | OpenCode free-model terms | Free-tier data handling must be reviewed; do not send secrets | Zero-cost fallback and demo option |

## Decision

Use `openrouter/deepseek/deepseek-v4.1-flash-1017` as the default model.

Reasons:

1. It handles TypeScript editing and tool calls well enough for the harness loop.
2. Its latency and cost are balanced for repeated `check_types` /
   `check_build` / `npm test` iterations.
3. The paid OpenRouter route avoids free-tier throttling during the demo.
4. A cheaper free model remains available as a fallback if cost or quota
   becomes a problem, and `deepseek-v4-pro` can be selected manually for
   unusually difficult tasks.

## Risks and mitigations

- **Data privacy**: prompts may contain project code. Keep secrets out of the
  repository and out of prompts; the weather app uses a keyless API.
- **Provider availability / rate limits**: switch to the free model or retry
  later if OpenRouter throttles requests.
- **Model changes**: model IDs and pricing change over time; verify the model
  in `opencode models` before a run.
- **License compliance**: review the model card and provider terms before
  redistributing generated code or deploying commercially.
