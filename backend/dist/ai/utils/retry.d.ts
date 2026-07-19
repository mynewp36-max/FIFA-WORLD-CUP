export interface RetryOptions {
    maxRetries?: number;
    baseDelayMs?: number;
}
/**
 * Reusable utility to wrap async operations with an exponential backoff retry
 * strategy. Distinguishes between transient failures (network, 5xx) and
 * permanent failures (400 validation errors) — only transient errors are retried.
 */
export declare const withRetry: <T>(operation: () => Promise<T>, context: string, options?: RetryOptions) => Promise<T>;
//# sourceMappingURL=retry.d.ts.map