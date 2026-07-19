import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { AiService } from './ai.service';
import { aiCache } from '../utils/cache';

describe('AiService', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
    aiCache.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const mockSuccessResponse = (content: string) =>
    new Response(
      JSON.stringify({
        choices: [
          {
            message: {
              content,
            },
          },
        ],
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );

  const mockErrorResponse = (status: number, message: string) =>
    new Response(
      JSON.stringify({
        error: {
          message,
          code: 'TEST_ERROR',
        },
      }),
      {
        status,
        headers: { 'Content-Type': 'application/json' },
      }
    );

  it('generateResponse returns successful message content', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(mockSuccessResponse('Hello from AI!'));

    const result = await AiService.generateResponse('user-123', 'Hi');
    expect(result).toBe('Hello from AI!');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('generateStructuredResponse returns parsed JSON object and uses cache', async () => {
    const jsonString = JSON.stringify({ strategy: 'redirect' });
    vi.mocked(fetch).mockResolvedValueOnce(mockSuccessResponse(jsonString));

    const schema = { type: 'object' };
    const result1 = await AiService.generateStructuredResponse<{ strategy: string }>(
      'user-123',
      'Get plan',
      schema
    );
    expect(result1).toEqual({ strategy: 'redirect' });

    // Second call should hit the cache and not trigger another fetch
    const result2 = await AiService.generateStructuredResponse<{ strategy: string }>(
      'user-123',
      'Get plan',
      schema
    );
    expect(result2).toEqual({ strategy: 'redirect' });
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('summarize returns summary content and uses cache', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(mockSuccessResponse('Short summary'));

    const result1 = await AiService.summarize('Long text...');
    expect(result1).toBe('Short summary');

    // Cached call
    const result2 = await AiService.summarize('Long text...');
    expect(result2).toBe('Short summary');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('translate returns translated content and uses cache', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(mockSuccessResponse('Hola'));

    const result1 = await AiService.translate('Hello', 'es');
    expect(result1).toBe('Hola');

    // Cached call
    const result2 = await AiService.translate('Hello', 'es');
    expect(result2).toBe('Hola');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('handles UnauthorizedError on 401', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(mockErrorResponse(401, 'Unauthorized key'));

    await expect(AiService.generateResponse('user-1', 'Hi')).rejects.toThrow(
      'Invalid OpenRouter API key'
    );
  });

  it('handles ForbiddenError on 403', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(mockErrorResponse(403, 'Forbidden action'));

    await expect(AiService.generateResponse('user-1', 'Hi')).rejects.toThrow(
      'Access to OpenRouter API forbidden'
    );
  });

  it('handles NotFoundError on 404', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(mockErrorResponse(404, 'Model not found'));

    await expect(AiService.generateResponse('user-1', 'Hi')).rejects.toThrow(
      'Model or resource not found on OpenRouter'
    );
  });

  it('handles RateLimitError on 429', async () => {
    vi.mocked(fetch).mockResolvedValue(mockErrorResponse(429, 'Rate limit exceeded'));

    await expect(AiService.generateResponse('user-1', 'Hi')).rejects.toThrow(
      'OpenRouter rate limit exceeded'
    );
  });

  it('handles InternalError on 500', async () => {
    // 500 error will trigger retry. Let's make it fail all 3 times (1 original + 2 retries)
    vi.mocked(fetch).mockResolvedValue(mockErrorResponse(500, 'Internal Server Error'));

    await expect(AiService.generateResponse('user-1', 'Hi')).rejects.toThrow(
      'OpenRouter internal server error'
    );
    expect(fetch).toHaveBeenCalledTimes(3);
  });
});
