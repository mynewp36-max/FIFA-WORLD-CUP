import { describe, it, expect, vi } from 'vitest';
import { withRetry } from './retry';
import { ValidationError } from '../../utils/errors';

// NOTE: These tests use real timers with very short baseDelayMs (1ms) to avoid
// the complexity of fake timers interacting with async retry loops.

describe('withRetry', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns the result immediately if the operation succeeds on the first attempt', async () => {
    const operation = vi.fn().mockResolvedValue('success');
    const result = await withRetry(operation, 'test-context');
    expect(result).toBe('success');
    expect(operation).toHaveBeenCalledTimes(1);
  });

  it('retries on transient 500 errors and eventually succeeds', async () => {
    const serverError = Object.assign(new Error('Internal Server Error'), { statusCode: 500 });
    const operation = vi.fn()
      .mockRejectedValueOnce(serverError)
      .mockResolvedValueOnce('recovered');

    const result = await withRetry(operation, 'test', { maxRetries: 2, baseDelayMs: 1 });
    expect(result).toBe('recovered');
    expect(operation).toHaveBeenCalledTimes(2);
  });

  it('retries on network errors (no status code)', async () => {
    const networkError = new Error('network failure');
    const operation = vi.fn()
      .mockRejectedValueOnce(networkError)
      .mockResolvedValueOnce('ok');

    const result = await withRetry(operation, 'test', { maxRetries: 1, baseDelayMs: 1 });
    expect(result).toBe('ok');
    expect(operation).toHaveBeenCalledTimes(2);
  });

  it('does NOT retry on permanent 400 errors', async () => {
    const clientError = Object.assign(new ValidationError('Bad input'), { statusCode: 400 });
    const operation = vi.fn().mockRejectedValue(clientError);

    await expect(withRetry(operation, 'test', { maxRetries: 3 })).rejects.toThrow('Bad input');
    expect(operation).toHaveBeenCalledTimes(1); // No retries
  });

  it('does NOT retry on 401 Unauthorized errors', async () => {
    const authError = Object.assign(new Error('Unauthorized'), { statusCode: 401 });
    const operation = vi.fn().mockRejectedValue(authError);

    await expect(withRetry(operation, 'test', { maxRetries: 3 })).rejects.toThrow('Unauthorized');
    expect(operation).toHaveBeenCalledTimes(1);
  });

  it('exhausts all retries and rethrows after maxRetries', async () => {
    const transientError = Object.assign(new Error('Server down'), { statusCode: 500 });
    const operation = vi.fn().mockRejectedValue(transientError);

    await expect(
      withRetry(operation, 'test', { maxRetries: 2, baseDelayMs: 1 })
    ).rejects.toThrow('Server down');
    expect(operation).toHaveBeenCalledTimes(3); // 1 original + 2 retries
  });
});
