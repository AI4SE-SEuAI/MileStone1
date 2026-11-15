# Milestone 2 — Hướng dẫn trình diễn ngắn

Run-sheet cho buổi trình diễn M2 (5–7 phút): cần nói gì, mở file nào, chạy
lệnh nào và trả lời câu hỏi thường gặp.

## 1. Mục tiêu buổi trình diễn

Chỉ cần chứng minh 4 điểm:

1. Có ít nhất 2 domain-specific tool tự viết.
2. Agent nhận **tín hiệu fail** → sửa → chạy lại → pass, có log chứng minh.
3. Stop criterion **retry limit 5** thực sự có hiệu lực.
4. Sandbox/permission đã được configure và document.

## 2. Chuẩn bị trước khi lên (5 phút)

Mở sẵn:

- Terminal tại repo root.
- `docs/m2-report.md` — báo cáo tổng.
- `results/m2-demo.log` — log RED → GREEN.
- `results/m2-stop-criterion.log` — log 5 lần FAIL → `STOPPED`.
- `opencode.json` — permission matrix.
- `docs/sandbox.md` — giải thích sandbox.

Chạy thử trước 1 lần:

```powershell
node --no-warnings --experimental-strip-types --experimental-loader ./scripts/ts-resolve-loader.mjs scripts/m2-stop-criterion.mjs
node --no-warnings --experimental-strip-types --experimental-loader ./scripts/ts-resolve-loader.mjs scripts/m2-final-gate.mjs
```

Không cần chạy lại `opencode run` live — tốn thời gian/model; chỉ mở log đã lưu.

## 3. Kịch bản 6 phút

| Thời gian | Nội dung | Thao tác |
| --- | --- | --- |
| 0:00–0:30 | Mở đầu | Nói mục tiêu: tool, signal loop, stop criterion, sandbox |
| 0:30–1:30 | Tools & signal | Mở `.opencode/tools/`: `check_tests`, `verification_gate`, `.opencode/lib/verification.ts`. Nói pipeline: types → tests → build → free-API |
| 1:30–2:30 | Sandbox | Mở `opencode.json` và `docs/sandbox.md`: allow / ask / deny, restricted worktree, không đọc `.env`, không push, không network |
| 2:30–4:00 | Demo RED → GREEN | Mở `results/m2-demo.log`: attempt 1 FAIL ở tests, attempt 2 PASS 29/29. Mở `results/m2-demo-verification-log.jsonl` để chỉ số liệu |
| 4:00–5:00 | Stop criterion live | Chạy `scripts/m2-stop-criterion.mjs`, chỉ dòng `STOPPED` và `attempts: 5` |
| 5:00–5:45 | Final gate live | Chạy `scripts/m2-final-gate.mjs`, chỉ `"status": "PASS"` |
| 5:45–6:30 | Q&A | Dùng câu trả lời ở mục 5 |

## 4. Câu chốt nên nói

- “Agent không tự tuyên bố xong; chỉ xong khi `verification_gate` trả `PASS`.”
- “Fail được ghi vào log, sửa xong chạy lại — log chứng minh vòng lặp.”
- “Sau 5 lần fail, gate tự khóa và trả `STOPPED`; người phải reset.”
- “Agent bị giới hạn quyền: chỉ sửa `target-app/src`, `results`, `docs`; không
  đọc `.env`, không push, không fetch URL.”

## 5. Q&A chuẩn bị

### Vì sao chọn retry limit 5?

Đủ để sửa lỗi thường gặp nhưng chặn loop vô hạn và kiểm soát thời gian. Một
`PASS` reset budget về 0.

### Sau `STOPPED` thì làm gì?

Gọi `verification_gate` với `{"reset": true}` để mở chu kỳ mới. Gate từ chối
chạy tiếp cho đến khi được reset.

### Sandbox có phải container không?

Không. Hiện dùng restricted working directory + file allowlist + command
allow/ask/deny. Container/Docker là hardening tùy chọn trong `docs/sandbox.md`.

### Những tool nào tự viết?

`check_types`, `check_tests`, `check_build`, `check_free_weather_api`,
`verification_gate`, `temperature_converter`, dùng chung logic trong
`.opencode/lib/verification.ts`.

### Log nằm ở đâu?

- `results/m2-demo.log`
- `results/m2-stop-criterion.log`
- `results/m2-final-gate.log`
- `results/m2-verification-log.jsonl`
- `results/verification-state.json`

### Vì sao dùng free model?

OpenRouter key trong môi trường này báo limit `$0.00`, nên default model là
`opencode/deepseek-v4.1-flash-free`. Có thể chuyển lại paid model sau khi thêm
budget.

## 6. Lưu ý khi demo live

- Chạy stop-criterion **trước** final gate (script tự reset ở cuối).
- Nếu lệnh live lỗi, chuyển ngay sang mở log tương ứng — không debug trước lớp.
- Đừng chạy `npm install`; mọi thứ đã cài sẵn.
- Build mất vài giây; trong lúc chờ có thể nói về stop criterion.
- Restart OpenCode nếu vừa đổi `opencode.json` hoặc thêm tool.

## 7. Phụ lục — lệnh và output kỳ vọng

### Stop criterion

```powershell
node --no-warnings --experimental-strip-types --experimental-loader ./scripts/ts-resolve-loader.mjs scripts/m2-stop-criterion.mjs
```

Kỳ vọng:

```text
=== failing attempt 5 ===
  "status": "FAIL",
  "attempt": 5,
  "remainingAttempts": 0

=== attempt 6 (must be STOPPED) ===
  "status": "STOPPED",
  "message": "Retry limit reached: 5/5 attempts without a PASS. ..."

=== state after STOPPED ===
  "attempts": 5,
  "lastStatus": "STOPPED"
```

### Final gate

```powershell
node --no-warnings --experimental-strip-types --experimental-loader ./scripts/ts-resolve-loader.mjs scripts/m2-final-gate.mjs
```

Kỳ vọng:

```json
{
  "status": "PASS",
  "attempt": 1,
  "maxAttempts": 5,
  "checks": {
    "types": { "ok": true },
    "tests": { "ok": true, "passed": 29, "failed": 0 },
    "build": { "ok": true },
    "freeApi": { "ok": true, "filesChecked": 20, "findingCount": 0 }
  }
}
```
