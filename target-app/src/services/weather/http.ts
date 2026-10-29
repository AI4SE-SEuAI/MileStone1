import { describeError, fail, ok } from "@/services/weather/errors";
import type { WeatherResult } from "@/types/weather";

export const DEFAULT_TIMEOUT_MS = 8000;

export type FetchLike = (
  input: string | URL,
  init?: RequestInit,
) => Promise<Response>;

export interface RequestOptions {
  fetchImpl?: FetchLike;
  timeoutMs?: number;
  signal?: AbortSignal;
}

function isAbortError(error: unknown): boolean {
  return (
    error instanceof Error &&
    (error.name === "AbortError" || error.name === "TimeoutError")
  );
}

export async function requestJson(
  url: string | URL,
  options: RequestOptions = {},
): Promise<WeatherResult<unknown>> {
  const fetchImpl = options.fetchImpl ?? globalThis.fetch;

  if (typeof fetchImpl !== "function") {
    return fail(
      "NETWORK_ERROR",
      "No fetch implementation is available in this environment.",
    );
  }

  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const controller = new AbortController();
  let timedOut = false;

  const timer = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, timeoutMs);

  const abortFromCaller = () => controller.abort();

  if (options.signal) {
    if (options.signal.aborted) {
      clearTimeout(timer);
      return fail("TIMEOUT", "The request was aborted before it started.");
    }

    options.signal.addEventListener("abort", abortFromCaller, { once: true });
  }

  try {
    const response = await fetchImpl(url, {
      signal: controller.signal,
      headers: { accept: "application/json" },
    });

    if (!response.ok) {
      return fail(
        "HTTP_ERROR",
        `The weather service responded with HTTP ${response.status}.`,
        { status: response.status },
      );
    }

    try {
      return ok(await response.json());
    } catch (error) {
      return fail(
        "INVALID_RESPONSE",
        "The weather service returned malformed JSON.",
        { cause: describeError(error) },
      );
    }
  } catch (error) {
    if (timedOut) {
      return fail(
        "TIMEOUT",
        `The weather service did not respond within ${timeoutMs}ms.`,
        { cause: describeError(error) },
      );
    }

    if (isAbortError(error)) {
      return fail("TIMEOUT", "The weather request was aborted.", {
        cause: describeError(error),
      });
    }

    return fail(
      "NETWORK_ERROR",
      "Unable to reach the weather service. Check your connection.",
      { cause: describeError(error) },
    );
  } finally {
    clearTimeout(timer);
    options.signal?.removeEventListener("abort", abortFromCaller);
  }
}
