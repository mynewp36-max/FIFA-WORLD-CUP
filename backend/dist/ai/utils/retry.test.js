"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const retry_1 = require("./retry");
const errors_1 = require("../../utils/errors");
// NOTE: These tests use real timers with very short baseDelayMs (1ms) to avoid
// the complexity of fake timers interacting with async retry loops.
(0, vitest_1.describe)('withRetry', () => {
    afterEach(() => {
        vitest_1.vi.restoreAllMocks();
    });
    (0, vitest_1.it)('returns the result immediately if the operation succeeds on the first attempt', async () => {
        const operation = vitest_1.vi.fn().mockResolvedValue('success');
        const result = await (0, retry_1.withRetry)(operation, 'test-context');
        (0, vitest_1.expect)(result).toBe('success');
        (0, vitest_1.expect)(operation).toHaveBeenCalledTimes(1);
    });
    (0, vitest_1.it)('retries on transient 500 errors and eventually succeeds', async () => {
        const serverError = Object.assign(new Error('Internal Server Error'), { statusCode: 500 });
        const operation = vitest_1.vi.fn()
            .mockRejectedValueOnce(serverError)
            .mockResolvedValueOnce('recovered');
        const result = await (0, retry_1.withRetry)(operation, 'test', { maxRetries: 2, baseDelayMs: 1 });
        (0, vitest_1.expect)(result).toBe('recovered');
        (0, vitest_1.expect)(operation).toHaveBeenCalledTimes(2);
    });
    (0, vitest_1.it)('retries on network errors (no status code)', async () => {
        const networkError = new Error('network failure');
        const operation = vitest_1.vi.fn()
            .mockRejectedValueOnce(networkError)
            .mockResolvedValueOnce('ok');
        const result = await (0, retry_1.withRetry)(operation, 'test', { maxRetries: 1, baseDelayMs: 1 });
        (0, vitest_1.expect)(result).toBe('ok');
        (0, vitest_1.expect)(operation).toHaveBeenCalledTimes(2);
    });
    (0, vitest_1.it)('does NOT retry on permanent 400 errors', async () => {
        const clientError = Object.assign(new errors_1.ValidationError('Bad input'), { statusCode: 400 });
        const operation = vitest_1.vi.fn().mockRejectedValue(clientError);
        await (0, vitest_1.expect)((0, retry_1.withRetry)(operation, 'test', { maxRetries: 3 })).rejects.toThrow('Bad input');
        (0, vitest_1.expect)(operation).toHaveBeenCalledTimes(1); // No retries
    });
    (0, vitest_1.it)('does NOT retry on 401 Unauthorized errors', async () => {
        const authError = Object.assign(new Error('Unauthorized'), { statusCode: 401 });
        const operation = vitest_1.vi.fn().mockRejectedValue(authError);
        await (0, vitest_1.expect)((0, retry_1.withRetry)(operation, 'test', { maxRetries: 3 })).rejects.toThrow('Unauthorized');
        (0, vitest_1.expect)(operation).toHaveBeenCalledTimes(1);
    });
    (0, vitest_1.it)('exhausts all retries and rethrows after maxRetries', async () => {
        const transientError = Object.assign(new Error('Server down'), { statusCode: 500 });
        const operation = vitest_1.vi.fn().mockRejectedValue(transientError);
        await (0, vitest_1.expect)((0, retry_1.withRetry)(operation, 'test', { maxRetries: 2, baseDelayMs: 1 })).rejects.toThrow('Server down');
        (0, vitest_1.expect)(operation).toHaveBeenCalledTimes(3); // 1 original + 2 retries
    });
});
//# sourceMappingURL=retry.test.js.map