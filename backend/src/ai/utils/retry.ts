import { aiLogger } from './logger';

export interface RetryOptions {
  maxRetries?: number;
  baseDelayMs?: number;
}

/**
 * Reusable utility to wrap async operations with an exponential backoff retry strategy.
 * Specifically handles distinguishing between transient failures (network, 5xx) and 
 * permanent failures (400 validation errors).
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
    } catch (error: any) {
      attempt++;

      // Extract status code from various standard error shapes (fetch, axios, custom AppErrors)
      const status = error?.status || error?.response?.status || error?.statusCode;
      
      // We explicitly DO NOT retry 400 (Validation), 401 (Auth), 403 (Forbidden), 404 (Not Found)
      const isTransient = 
        !status || // Network disconnected, DNS failures, etc (no HTTP status)
        status >= 500 || // Internal server errors upstream
        status === 429 || // Rate limits
        error.message?.toLowerCase().includes('timeout') ||
        error.message?.toLowerCase().includes('network');

      if (!isTransient || attempt > maxRetries) {
        if (!isTransient) {
          aiLogger.error(`[Retry Bypassed] ${context} encountered a permanent error (Status: ${status}).`, error);
        } else {
          aiLogger.error(`[Retry Exhausted] ${context} failed after ${attempt} attempts.`, error);
        }
        throw error;
      }

      // Exponential backoff: baseDelay * 2^(attempt-1)
      const delay = baseDelayMs * Math.pow(2, attempt - 1);
      aiLogger.warn(`[Retry] ${context} attempt ${attempt} failed (Transient). Retrying in ${delay}ms...`, { error: error.message, attempt, status });
      
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};
