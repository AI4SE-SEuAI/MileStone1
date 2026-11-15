# Milestone 2 — Báo cáo triển khai

Tài liệu này tổng hợp nội dung đã triển khai cho Milestone 2.

## 1. Đối chiếu yêu cầu M2

| Yêu cầu | Cách đáp ứng |
| --- | --- |
| Ít nhất 2 domain-specific tool tự viết | `check_types`, `check_tests`, `check_build`, `check_free_weather_api`, `verification_gate`, `temperature_converter` |
| Verification signal + log fail → sửa → chạy lại | `check_tests`/`verification_gate`; log tại `results/m2-demo.log` và `results/m2-demo-verification-log.jsonl` |
| Stop criterion rõ ràng và có minh chứng | Retry limit **5**; log tại `results/m2-stop-criterion.log` |
| Sandbox/permission được document + configure | `opencode.json` + `docs/sandbox.md` |
| Demo agent implement 1 feature đến khi pass | Nested `opencode run`; feature `UnitToggle` + `CityTemperatures`; log `results/m2-demo.log` |

## 2. Domain-specific tools

- `.opencode/lib/verification.ts` — logic dùng chung: type check, tests, build,
  free-API check.
- `.opencode/tools/check_types.ts` — chạy `npx tsc --noEmit`.
- `.opencode/tools/check_tests.ts` — chạy `npm test`, trả pass/fail và tên test
  fail; ghi `results/test-report.json`.
- `.opencode/tools/check_build.ts` — chạy `npm run build`.
- `.opencode/tools/check_free_weather_api.ts` — chặn OpenWeatherMap/API key,
  bắt buộc Open-Meteo; ghi `results/free-weather-api.json`.
- `.opencode/tools/verification_gate.ts` — chạy `types → tests → build →
  freeApi`, dừng ở fail đầu tiên, ghi log từng attempt, enforce retry limit 5.

## 3. Verification signal và stop criterion

- Signal: type checker, vitest, Next.js build, free-API domain rule.
- Mỗi lần `verification_gate` là một attempt.
- Sau 5 attempt không PASS, lần gọi tiếp theo trả `STOPPED`.
- Một PASS reset budget về 0.
- Sau `STOPPED`, phải gọi `verification_gate` với `{"reset": true}`.

Minh chứng `results/m2-stop-criterion.log`: 5 lần FAIL ở tests, lần 6 trả
`STOPPED`, state lưu `attempts: 5`, `lastStatus: STOPPED`, sau đó reset.

## 4. Sandbox và permission

Cấu hình trong `opencode.json`:
- Allow: đọc repo; sửa `target-app/src/**`, `results/**`, `docs/**`; chạy
  `npm test`, `npm run build`, `npx tsc --noEmit`; git read-only.
- Ask: sửa ngoài allowlist, `npm install`, `git add`, `git commit`, `task`.
- Deny: `.env`/secrets, path ngoài worktree, `.next`, `node_modules`,
  `git push`, `git reset --hard`, `rm -rf`, `curl`/`wget`,
  `webfetch`/`websearch`.

Chi tiết: `docs/sandbox.md`. Custom tool dùng command cố định và `cwd` cố
định, không nội suy input từ agent.

## 5. Demo feature

Feature: tách `UnitToggle` dùng chung, áp dụng cho `CityTemperatures`, thêm
`formatCityTemperature` và unit tests.

Log:
- `results/m2-demo.log` — attempt 1 FAIL ở tests (`expected '0.0°C' to be
  '13.4°C'`), attempt 2 PASS (29/29 tests, build OK, free-API OK).
- `results/m2-demo-verification-log.jsonl` — log structured của 2 attempt.

## 6. Bằng chứng trong `results/`

| File | Nội dung |
| --- | --- |
| `m2-demo.log` | Transcript nested `opencode run` của demo feature |
| `m2-demo-verification-log.jsonl` | Log gate của demo (FAIL → PASS) |
| `m2-stop-criterion.log` | 5 lần FAIL → `STOPPED` → reset |
| `m2-final-gate.log` | Kết quả gate cuối (`PASS`) |
| `m2-verification-log.jsonl` | Toàn bộ log gate |
| `m2-final-verification-state.json` | State cuối (`PASS`, attempts 0) |
| `test-report.json` | Summary test gần nhất |
| `free-weather-api.json` | Report free-API check |

## 7. File thêm / sửa

Thêm:
- `.opencode/lib/verification.ts`
- `.opencode/tools/check_tests.ts`
- `.opencode/tools/verification_gate.ts`
- `docs/sandbox.md`
- `docs/m2-demo-prompt.md`
- `docs/m2-report.md`
- `docs/m2-presentation-guide.md`
- `scripts/m2-stop-criterion.mjs`
- `scripts/m2-final-gate.mjs`
- `scripts/ts-resolve-loader.mjs`
- `target-app/src/components/UnitToggle.tsx`
- Các file `results/m2-*`

Sửa:
- `opencode.json`
- `README.md`
- `AGENTS.md`
- `model-selection.md`
- `.opencode/package.json`
- `.opencode/tools/check_types.ts`
- `.opencode/tools/check_build.ts`
- `.opencode/tools/check_free_weather_api.ts`
- `target-app/src/components/WeatherSearch.tsx`
- `target-app/src/components/CityTemperatures.tsx`
- `target-app/src/services/weather/temperature_converter.ts`
- `target-app/src/services/weather/temperature_converter.test.ts`

## 8. Kết quả kiểm tra cuối

| Check | Kết quả |
| --- | --- |
| `check_types` | **SUCCESS** |
| `npm test` | **PASS** — 5 files, 29 tests |
| `check_build` | **SUCCESS** |
| `check_free_weather_api` | **SUCCESS** — 20 files, 0 findings |
| `verification_gate` | **PASS** — attempt 1, maxAttempts 5 |
| Type-check tools | exit 0 |

## 9. Cách tái tạo

```powershell
node --no-warnings --experimental-strip-types --experimental-loader ./scripts/ts-resolve-loader.mjs scripts/m2-stop-criterion.mjs
node --no-warnings --experimental-strip-types --experimental-loader ./scripts/ts-resolve-loader.mjs scripts/m2-final-gate.mjs
```

## 10. Lưu ý

- OpenRouter key báo limit `$0.00`, nên default model là
  `opencode/deepseek-v4.1-flash-free`.
- Cần restart OpenCode sau khi đổi `opencode.json` hoặc thêm tool.
- Chưa có container; sandbox hiện dùng restricted directory + deny rules.
- `.next` vẫn bị git track từ M1; có thể dọn bằng
  `git rm -r --cached target-app/.next`.
