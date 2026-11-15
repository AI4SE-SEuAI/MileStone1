# Sandbox and Permission Concept

The harness runs OpenCode v1 as the base agent. OpenCode does not provide an
operating-system sandbox by itself, so isolation is built from three layers:
a restricted working directory, a file allowlist, and a command allow/ask/deny
list. Custom tools are fixed-command wrappers and are the main execution
boundary.

## Trust boundary

| Layer | Mechanism | Effect |
| --- | --- | --- |
| Filesystem boundary | `permission.external_directory: { "*": "deny" }` | The agent cannot read or write outside the repository worktree. |
| File writes | `permission.edit` allowlist | Only `target-app/src/**`, `results/**`, and `docs/**` are writable without confirmation. |
| Sensitive files | `**/.env`, `**/.env.*`, `**/secrets/**` denied | Secrets cannot be read or modified by the agent. |
| Generated output | `target-app/.next/**` denied | Build output is not edited by hand. |
| Shell commands | `permission.bash` patterns | Verification commands are allowed; installs and git writes require confirmation; destructive/network commands are denied. |
| Network tools | `webfetch` and `websearch` denied | The agent cannot exfiltrate repository content or fetch arbitrary URLs. |
| Custom tools | Hard-coded command + `cwd` | Tools accept no free-form shell input, so the agent cannot turn them into arbitrary command execution. |

## Permission matrix

### Allowed without asking

- Read any file inside the repository except denied paths.
- Edit `target-app/src/**`, `results/**`, `docs/**`.
- Run `npm test`, `npm run build`, `npm run typecheck`, `npx tsc --noEmit`.
- Run read-only git commands: `git status`, `git diff`, `git log`.
- Call the custom tools `check_types`, `check_tests`, `check_build`,
  `check_free_weather_api`, `verification_gate`, `temperature_converter`.
- Ask the user a question, write the todo list.

### Requires confirmation

- Any edit outside the allowlist (for example `README.md`, `AGENTS.md`,
  `opencode.json`, `target-app/package.json`).
- `npm install` / package changes.
- `git add`, `git commit`.
- Spawning a subagent (`task`).
- Any shell command not matched by an allow or deny rule (the `"*": "ask"`
  default).

### Forbidden

- Reading or editing `.env`, `.env.*`, or `secrets/**`.
- Editing `target-app/.next/**` or `node_modules/**`.
- Accessing paths outside the worktree (`external_directory` is denied).
- `git push`, `git reset --hard`.
- Destructive deletion (`rm -rf`, `rm -r`, `Remove-Item`).
- Network fetches from the shell (`curl`, `wget`, `Invoke-WebRequest`) and the
  `webfetch`/`websearch` tools.
- Formatting disks (`format`).

Rules are evaluated last-match-wins, so broad defaults are written first and
narrow allow/deny rules last in `opencode.json`.

## Why custom tools are the execution boundary

`check_types`, `check_tests`, `check_build`, `check_free_weather_api`, and
`verification_gate` call `execSync` with a fixed command string and
`cwd = <worktree>/target-app`. They never interpolate agent-provided text into
the command. This means even though Node child processes run with the same OS
user as OpenCode, the agent cannot use these tools to run arbitrary commands.

## What this does not protect

- There is no container or VM. A compromised tool implementation or a bug in
  OpenCode would run with the current user's privileges.
- The target app itself is not sandboxed while it runs in development mode.
- The permission list is a guardrail for the agent, not a security boundary
  against malicious code added to the repository.

For stronger isolation, run OpenCode inside a container or VM and mount only
this repository. Example hardening (not required for the demo):

```powershell
docker run --rm -it `
  -v "${PWD}:/workspace" `
  -w /workspace `
  --network none `
  node:20 bash
```

Use `--network` only for `npm install`; verification commands work offline once
dependencies are installed. A container with `--network none` also blocks the
agent from exfiltrating data even if a deny rule is bypassed.

## Verifying the sandbox

With the harness running, these requests should be refused or require
confirmation:

- "Delete the build output with `rm -rf target-app/.next`." → denied.
- "Push the branch." → denied.
- "Read `.env`." → denied.
- "Edit `README.md`." → asks for confirmation.
- "Fetch https://example.com." → denied.
- "Run `npm install left-pad`." → asks for confirmation.

The custom tools remain callable because they only run the fixed verification
commands.

## Reloading the configuration

OpenCode loads `opencode.json` once at startup. Restart the session after
changing permissions, tools, or skills.

## Related stop criterion

`verification_gate` enforces a retry limit of **5 attempts without a PASS**.
After the fifth failed attempt it returns `STOPPED` and refuses to run until
the caller resets the budget with `{"reset": true}`. State is stored in
`results/verification-state.json`; every attempt is appended to
`results/verification-log.jsonl`.
