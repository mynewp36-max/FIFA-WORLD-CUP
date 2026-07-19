import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { aiCache } from './cache';

describe('InMemoryCache', () => {
  beforeEach(() => {
    aiCache.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('stores and retrieves a value before TTL expires', () => {
    aiCache.set('test-key', { value: 42 }, 60_000);
    const result = aiCache.get<{ value: number }>('test-key');
    expect(result).toEqual({ value: 42 });
  });

  it('returns null for a non-existent key', () => {
    expect(aiCache.get('missing-key')).toBeNull();
  });

  it('returns null after TTL expires', () => {
    aiCache.set('expiring-key', 'hello', 1000);
    vi.advanceTimersByTime(1001);
    expect(aiCache.get('expiring-key')).toBeNull();
  });

  it('does not return value when TTL is exactly expired', () => {
    aiCache.set('edge-key', 'value', 5000);
    vi.advanceTimersByTime(5001);
    expect(aiCache.get('edge-key')).toBeNull();
  });

  it('overwrites an existing key with a new value', () => {
    aiCache.set('overwrite-key', 'original', 60_000);
    aiCache.set('overwrite-key', 'updated', 60_000);
    expect(aiCache.get('overwrite-key')).toBe('updated');
  });

  it('generateKey produces a consistent deterministic hash', () => {
    const payload = { userId: 'u1', message: 'test' };
    const key1 = aiCache.generateKey('structured', payload);
    const key2 = aiCache.generateKey('structured', payload);
    expect(key1).toBe(key2);
  });

  it('generateKey produces different hashes for different payloads', () => {
    const key1 = aiCache.generateKey('prefix', { a: 1 });
    const key2 = aiCache.generateKey('prefix', { a: 2 });
    expect(key1).not.toBe(key2);
  });

  it('generateKey includes the prefix in the key', () => {
    const key = aiCache.generateKey('my-prefix', 'payload');
    expect(key.startsWith('my-prefix:')).toBe(true);
  });

  it('clear() removes all entries', () => {
    aiCache.set('key1', 'val1', 60_000);
    aiCache.set('key2', 'val2', 60_000);
    aiCache.clear();
    expect(aiCache.get('key1')).toBeNull();
    expect(aiCache.get('key2')).toBeNull();
  });
});
