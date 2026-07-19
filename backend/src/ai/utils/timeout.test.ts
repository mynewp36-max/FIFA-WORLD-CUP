import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { withTimeout } from './timeout';

describe('withTimeout', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('returns the result if the operation completes before timeout', async () => {
    const operation = vi.fn().mockResolvedValue('completed');
    const result = await withTimeout(operation, 5000, 'test-op');
    expect(result).toBe('completed');
  });

  it('throws an error with "too long" message if the operation exceeds the time limit', async () => {
    const slowOperation = () => new Promise<string>((resolve) => {
      setTimeout(() => resolve('late'), 10_000);
    });

    const promise = withTimeout(slowOperation, 1000, 'slow-test');
    vi.advanceTimersByTime(1001);
    await expect(promise).rejects.toThrow('too long');
  });

  it('throws with a 408 statusCode when it times out', async () => {
    const slowOperation = () => new Promise<string>((resolve) => {
      setTimeout(() => resolve('late'), 10_000);
    });

    const promise = withTimeout(slowOperation, 1000, 'slow-test');
    vi.advanceTimersByTime(1001);
    try {
      await promise;
    } catch (err: unknown) {
      expect((err as { statusCode?: number }).statusCode).toBe(408);
    }
  });

  it('does not trigger timeout if operation resolves quickly', async () => {
    const fastOperation = vi.fn().mockResolvedValue('fast');
    const result = await withTimeout(fastOperation, 5000);
    expect(result).toBe('fast');
    expect(fastOperation).toHaveBeenCalledOnce();
  });

  it('re-throws non-timeout errors from the operation', async () => {
    const failingOperation = vi.fn().mockRejectedValue(new Error('Operation failed internally'));
    await expect(withTimeout(failingOperation, 5000)).rejects.toThrow('Operation failed internally');
  });
});
