/**
 * Reusable utility to enforce a strict maximum execution time on any asynchronous operation.
 * If the operation exceeds the timeoutMs, it forcefully throws a TimeoutError, terminating
 * the wait and returning a graceful failure to the client.
 */
export declare const withTimeout: <T>(operation: () => Promise<T>, timeoutMs: number, context?: string) => Promise<T>;
//# sourceMappingURL=timeout.d.ts.map