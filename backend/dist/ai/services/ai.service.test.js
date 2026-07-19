"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const ai_service_1 = require("./ai.service");
const cache_1 = require("../utils/cache");
(0, vitest_1.describe)('AiService', () => {
    (0, vitest_1.beforeEach)(() => {
        vitest_1.vi.stubGlobal('fetch', vitest_1.vi.fn());
        cache_1.aiCache.clear();
    });
    (0, vitest_1.afterEach)(() => {
        vitest_1.vi.restoreAllMocks();
    });
    const mockSuccessResponse = (content) => new Response(JSON.stringify({
        choices: [
            {
                message: {
                    content,
                },
            },
        ],
    }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
    const mockErrorResponse = (status, message) => new Response(JSON.stringify({
        error: {
            message,
            code: 'TEST_ERROR',
        },
    }), {
        status,
        headers: { 'Content-Type': 'application/json' },
    });
    (0, vitest_1.it)('generateResponse returns successful message content', async () => {
        vitest_1.vi.mocked(fetch).mockResolvedValueOnce(mockSuccessResponse('Hello from AI!'));
        const result = await ai_service_1.AiService.generateResponse('user-123', 'Hi');
        (0, vitest_1.expect)(result).toBe('Hello from AI!');
        (0, vitest_1.expect)(fetch).toHaveBeenCalledTimes(1);
    });
    (0, vitest_1.it)('generateStructuredResponse returns parsed JSON object and uses cache', async () => {
        const jsonString = JSON.stringify({ strategy: 'redirect' });
        vitest_1.vi.mocked(fetch).mockResolvedValueOnce(mockSuccessResponse(jsonString));
        const schema = { type: 'object' };
        const result1 = await ai_service_1.AiService.generateStructuredResponse('user-123', 'Get plan', schema);
        (0, vitest_1.expect)(result1).toEqual({ strategy: 'redirect' });
        // Second call should hit the cache and not trigger another fetch
        const result2 = await ai_service_1.AiService.generateStructuredResponse('user-123', 'Get plan', schema);
        (0, vitest_1.expect)(result2).toEqual({ strategy: 'redirect' });
        (0, vitest_1.expect)(fetch).toHaveBeenCalledTimes(1);
    });
    (0, vitest_1.it)('summarize returns summary content and uses cache', async () => {
        vitest_1.vi.mocked(fetch).mockResolvedValueOnce(mockSuccessResponse('Short summary'));
        const result1 = await ai_service_1.AiService.summarize('Long text...');
        (0, vitest_1.expect)(result1).toBe('Short summary');
        // Cached call
        const result2 = await ai_service_1.AiService.summarize('Long text...');
        (0, vitest_1.expect)(result2).toBe('Short summary');
        (0, vitest_1.expect)(fetch).toHaveBeenCalledTimes(1);
    });
    (0, vitest_1.it)('translate returns translated content and uses cache', async () => {
        vitest_1.vi.mocked(fetch).mockResolvedValueOnce(mockSuccessResponse('Hola'));
        const result1 = await ai_service_1.AiService.translate('Hello', 'es');
        (0, vitest_1.expect)(result1).toBe('Hola');
        // Cached call
        const result2 = await ai_service_1.AiService.translate('Hello', 'es');
        (0, vitest_1.expect)(result2).toBe('Hola');
        (0, vitest_1.expect)(fetch).toHaveBeenCalledTimes(1);
    });
    (0, vitest_1.it)('handles UnauthorizedError on 401', async () => {
        vitest_1.vi.mocked(fetch).mockResolvedValueOnce(mockErrorResponse(401, 'Unauthorized key'));
        await (0, vitest_1.expect)(ai_service_1.AiService.generateResponse('user-1', 'Hi')).rejects.toThrow('Invalid OpenRouter API key');
    });
    (0, vitest_1.it)('handles ForbiddenError on 403', async () => {
        vitest_1.vi.mocked(fetch).mockResolvedValueOnce(mockErrorResponse(403, 'Forbidden action'));
        await (0, vitest_1.expect)(ai_service_1.AiService.generateResponse('user-1', 'Hi')).rejects.toThrow('Access to OpenRouter API forbidden');
    });
    (0, vitest_1.it)('handles NotFoundError on 404', async () => {
        vitest_1.vi.mocked(fetch).mockResolvedValueOnce(mockErrorResponse(404, 'Model not found'));
        await (0, vitest_1.expect)(ai_service_1.AiService.generateResponse('user-1', 'Hi')).rejects.toThrow('Model or resource not found on OpenRouter');
    });
    (0, vitest_1.it)('handles RateLimitError on 429', async () => {
        vitest_1.vi.mocked(fetch).mockResolvedValue(mockErrorResponse(429, 'Rate limit exceeded'));
        await (0, vitest_1.expect)(ai_service_1.AiService.generateResponse('user-1', 'Hi')).rejects.toThrow('OpenRouter rate limit exceeded');
    });
    (0, vitest_1.it)('handles InternalError on 500', async () => {
        // 500 error will trigger retry. Let's make it fail all 3 times (1 original + 2 retries)
        vitest_1.vi.mocked(fetch).mockResolvedValue(mockErrorResponse(500, 'Internal Server Error'));
        await (0, vitest_1.expect)(ai_service_1.AiService.generateResponse('user-1', 'Hi')).rejects.toThrow('OpenRouter internal server error');
        (0, vitest_1.expect)(fetch).toHaveBeenCalledTimes(3);
    });
});
//# sourceMappingURL=ai.service.test.js.map