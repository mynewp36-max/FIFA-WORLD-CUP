import { aiLogger } from './logger';

export interface RetryOptions {
  maxRetries?: number;
  baseDelayMs?: number;
}

/** Shape of errors that may carry an HTTP status code. */
interface StatusError extends Error {
  status?: number;
  statusCode?: number;
  response?: { status?: number };
}

/**
 * Reusable utility to wrap async operations with an exponential backoff retry
 * strategy. Distinguishes between transient failures (network, 5xx) and
 * permanent failures (400 validation errors) — only transient errors are retried.
 */
export const withRetry = async <T>(
  operation: () => Promise<T>,
  context: string,
  options: RetryOptions = {}
): Promise<T> => {
  const maxRetries = options.maxRetries ?? 2;
  const baseDelayMs = options.baseDelayMs ?? 1000;
  let attempt = 0;

  while (true) {
    try {
      return await operation();
    } catch (rawError: unknown) {
      attempt++;

      const error = rawError as StatusError;
      // Extract status code from various standard error shapes
      const status = error?.status ?? error?.response?.status ?? error?.statusCode;

      // Do NOT retry 400, 401, 403, 404 — these are permanent failures
      const isTransient =
        !status || // Network disconnected, DNS failures (no HTTP status)
        status >= 500 || // Upstream server errors
        status === 429 || // Rate limiting — back off and retry
        error.message?.toLowerCase().includes('timeout') ||
        error.message?.toLowerCase().includes('network');

      if (!isTransient || attempt > maxRetries) {
        if (!isTransient) {
          aiLogger.error(
            `[Retry Bypassed] ${context} encountered a permanent error (Status: ${status}).`,
            error
          );
        } else {
          aiLogger.error(
            `[Retry Exhausted] ${context} failed after ${attempt} attempts.`,
            error
          );
        }
        throw error;
      }

      // Exponential backoff: baseDelay * 2^(attempt-1)
      const delay = baseDelayMs * Math.pow(2, attempt - 1);
      aiLogger.warn(
        `[Retry] ${context} attempt ${attempt} failed (Transient). Retrying in ${delay}ms...`,
        { errorMessage: error.message, attempt, status }
      );

      await new Promise<void>((resolve) => setTimeout(resolve, delay));
    }
  }
};
