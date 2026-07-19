"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const cache_1 = require("./cache");
(0, vitest_1.describe)('InMemoryCache', () => {
    (0, vitest_1.beforeEach)(() => {
        cache_1.aiCache.clear();
        vitest_1.vi.useFakeTimers();
    });
    (0, vitest_1.afterEach)(() => {
        vitest_1.vi.useRealTimers();
        vitest_1.vi.restoreAllMocks();
    });
    (0, vitest_1.it)('stores and retrieves a value before TTL expires', () => {
        cache_1.aiCache.set('test-key', { value: 42 }, 60_000);
        const result = cache_1.aiCache.get('test-key');
        (0, vitest_1.expect)(result).toEqual({ value: 42 });
    });
    (0, vitest_1.it)('returns null for a non-existent key', () => {
        (0, vitest_1.expect)(cache_1.aiCache.get('missing-key')).toBeNull();
    });
    (0, vitest_1.it)('returns null after TTL expires', () => {
        cache_1.aiCache.set('expiring-key', 'hello', 1000);
        vitest_1.vi.advanceTimersByTime(1001);
        (0, vitest_1.expect)(cache_1.aiCache.get('expiring-key')).toBeNull();
    });
    (0, vitest_1.it)('does not return value when TTL is exactly expired', () => {
        cache_1.aiCache.set('edge-key', 'value', 5000);
        vitest_1.vi.advanceTimersByTime(5001);
        (0, vitest_1.expect)(cache_1.aiCache.get('edge-key')).toBeNull();
    });
    (0, vitest_1.it)('overwrites an existing key with a new value', () => {
        cache_1.aiCache.set('overwrite-key', 'original', 60_000);
        cache_1.aiCache.set('overwrite-key', 'updated', 60_000);
        (0, vitest_1.expect)(cache_1.aiCache.get('overwrite-key')).toBe('updated');
    });
    (0, vitest_1.it)('generateKey produces a consistent deterministic hash', () => {
        const payload = { userId: 'u1', message: 'test' };
        const key1 = cache_1.aiCache.generateKey('structured', payload);
        const key2 = cache_1.aiCache.generateKey('structured', payload);
        (0, vitest_1.expect)(key1).toBe(key2);
    });
    (0, vitest_1.it)('generateKey produces different hashes for different payloads', () => {
        const key1 = cache_1.aiCache.generateKey('prefix', { a: 1 });
        const key2 = cache_1.aiCache.generateKey('prefix', { a: 2 });
        (0, vitest_1.expect)(key1).not.toBe(key2);
    });
    (0, vitest_1.it)('generateKey includes the prefix in the key', () => {
        const key = cache_1.aiCache.generateKey('my-prefix', 'payload');
        (0, vitest_1.expect)(key.startsWith('my-prefix:')).toBe(true);
    });
    (0, vitest_1.it)('clear() removes all entries', () => {
        cache_1.aiCache.set('key1', 'val1', 60_000);
        cache_1.aiCache.set('key2', 'val2', 60_000);
        cache_1.aiCache.clear();
        (0, vitest_1.expect)(cache_1.aiCache.get('key1')).toBeNull();
        (0, vitest_1.expect)(cache_1.aiCache.get('key2')).toBeNull();
    });
});
//# sourceMappingURL=cache.test.js.map