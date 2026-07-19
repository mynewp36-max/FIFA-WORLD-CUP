"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const timeout_1 = require("./timeout");
(0, vitest_1.describe)('withTimeout', () => {
    (0, vitest_1.beforeEach)(() => {
        vitest_1.vi.useFakeTimers();
        vitest_1.vi.spyOn(console, 'warn').mockImplementation(() => { });
    });
    (0, vitest_1.afterEach)(() => {
        vitest_1.vi.useRealTimers();
        vitest_1.vi.restoreAllMocks();
    });
    (0, vitest_1.it)('returns the result if the operation completes before timeout', async () => {
        const operation = vitest_1.vi.fn().mockResolvedValue('completed');
        const result = await (0, timeout_1.withTimeout)(operation, 5000, 'test-op');
        (0, vitest_1.expect)(result).toBe('completed');
    });
    (0, vitest_1.it)('throws an error with "too long" message if the operation exceeds the time limit', async () => {
        const slowOperation = () => new Promise((resolve) => {
            setTimeout(() => resolve('late'), 10_000);
        });
        const promise = (0, timeout_1.withTimeout)(slowOperation, 1000, 'slow-test');
        vitest_1.vi.advanceTimersByTime(1001);
        await (0, vitest_1.expect)(promise).rejects.toThrow('too long');
    });
    (0, vitest_1.it)('throws with a 408 statusCode when it times out', async () => {
        const slowOperation = () => new Promise((resolve) => {
            setTimeout(() => resolve('late'), 10_000);
        });
        const promise = (0, timeout_1.withTimeout)(slowOperation, 1000, 'slow-test');
        vitest_1.vi.advanceTimersByTime(1001);
        try {
            await promise;
        }
        catch (err) {
            (0, vitest_1.expect)(err.statusCode).toBe(408);
        }
    });
    (0, vitest_1.it)('does not trigger timeout if operation resolves quickly', async () => {
        const fastOperation = vitest_1.vi.fn().mockResolvedValue('fast');
        const result = await (0, timeout_1.withTimeout)(fastOperation, 5000);
        (0, vitest_1.expect)(result).toBe('fast');
        (0, vitest_1.expect)(fastOperation).toHaveBeenCalledOnce();
    });
    (0, vitest_1.it)('re-throws non-timeout errors from the operation', async () => {
        const failingOperation = vitest_1.vi.fn().mockRejectedValue(new Error('Operation failed internally'));
        await (0, vitest_1.expect)((0, timeout_1.withTimeout)(failingOperation, 5000)).rejects.toThrow('Operation failed internally');
    });
});
//# sourceMappingURL=timeout.test.js.map