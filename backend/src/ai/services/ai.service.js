"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiService = void 0;
const openrouter_client_1 = require("../client/openrouter.client");
const errors_1 = require("../../utils/errors");
const context_manager_1 = require("../context/context.manager");
const prompt_builder_1 = require("../prompts/prompt.builder");
const config_1 = require("../config");
const logger_1 = require("../utils/logger");
const jsonParser_1 = require("../../utils/jsonParser");
const retry_1 = require("../utils/retry");
const timeout_1 = require("../utils/timeout");
const cache_1 = require("../utils/cache");
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
class AiService {
    /**
     * Centralized execution pipeline for all Gemini interactions.
     * Enforces DRY principles by handling try/catch blocks, client initialization,
     * context injection, layered prompting, and strict schema parsing.
     */
    static async execute(params) {
        try {
            const client = (0, openrouter_client_1.getOpenRouterClient)();
            // Auto-inject context if a userId is provided
            if (params.userId && !params.context) {
                params.context = context_manager_1.contextManager.getContext(params.userId);
            }
            const finalPrompt = (0, prompt_builder_1.buildLayeredPrompt)({
                userMessage: params.userMessage,
                context: params.context,
                targetLanguage: params.targetLanguage,
                taskSpecificRules: params.taskSpecificRules
            });
            logger_1.aiLogger.debug(`Executing AI action: ${params.actionName}`, { userId: params.userId });
            let responseFormat = undefined;
            const configOverrides = {};
            // Apply strict JSON formatting overrides if a schema is requested
            if (params.schema) {
                configOverrides.temperature = 0.1;
                responseFormat = { type: 'json_object' };
            }
            // Use lower token limit for typical short responses
            if (['generateResponse', 'generateStructuredResponse'].includes(params.actionName)) {
                configOverrides.maxOutputTokens = 1024;
            }
            const { model, config } = (0, config_1.getGenerationConfig)(configOverrides);
            const payload = {
                model,
                messages: [{ role: 'user', content: finalPrompt }],
                temperature: config.temperature,
                max_tokens: config.maxOutputTokens, // Automatically falls back to AI_CONFIG.MAX_TOKENS
                ...(responseFormat ? { response_format: responseFormat } : {})
            };
            const response = await (0, retry_1.withRetry)(() => (0, timeout_1.withTimeout)(async () => {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 15000);
                try {
                    const res = await fetch(client.getEndpoint(), {
                        method: 'POST',
                        headers: client.getHeaders(),
                        body: JSON.stringify(payload),
                        signal: controller.signal
                    });
                    clearTimeout(timeoutId);
                    if (!res.ok) {
                        let errorBody = {};
                        try {
                            errorBody = await res.json();
                        }
                        catch (e) {
                            errorBody = { message: res.statusText };
                        }
                        logger_1.aiLogger.error(`OpenRouter API error ${res.status}`, {
                            status: res.status,
                            errorMessage: errorBody.error?.message || errorBody.message || 'Unknown error',
                            providerMessage: errorBody.error?.metadata?.provider_message || errorBody.error?.metadata?.provider_name || undefined,
                            model: errorBody.error?.metadata?.model || payload.model,
                            code: errorBody.error?.code || undefined,
                            rawBody: errorBody
                        });
                        switch (res.status) {
                            case 401: throw new errors_1.UnauthorizedError('Invalid OpenRouter API key');
                            case 403: throw new errors_1.ForbiddenError('Access to OpenRouter API forbidden');
                            case 404: throw new errors_1.NotFoundError('Model or resource not found on OpenRouter');
                            case 429: throw new errors_1.RateLimitError('OpenRouter rate limit exceeded');
                            case 500: throw new errors_1.InternalError('OpenRouter internal server error');
                            case 503: throw new errors_1.InternalError('OpenRouter service unavailable');
                            default: throw new errors_1.InternalError(`OpenRouter API error: ${res.status}`);
                        }
                    }
                    return await res.json();
                }
                catch (err) {
                    if (err.name === 'AbortError') {
                        throw new errors_1.TimeoutError('OpenRouter request timed out');
                    }
                    throw err;
                }
            }, 15000, `OpenRouter.generateContent(${params.actionName})`), `OpenRouter.generateContent(${params.actionName})`, { maxRetries: 2, baseDelayMs: 1000 });
            const text = response.choices?.[0]?.message?.content || '';
            if (params.schema) {
                return (0, jsonParser_1.safeJsonParse)(text, params.actionName);
            }
            return text;
        }
        catch (error) {
            logger_1.aiLogger.error(`Error during AI execution: ${params.actionName}`, error);
            throw error;
        }
    }
    static async generateResponse(userId, userMessage) {
        return this.execute({
            actionName: 'generateResponse',
            userId,
            userMessage
        });
    }
    static async generateStructuredResponse(userId, userMessage, schema) {
        const cacheKey = cache_1.aiCache.generateKey('structured', { userId, userMessage, schema });
        const cached = cache_1.aiCache.get(cacheKey);
        if (cached)
            return cached;
        const result = await this.execute({
            actionName: 'generateStructuredResponse',
            userId,
            userMessage,
            schema
        });
        cache_1.aiCache.set(cacheKey, result, CACHE_TTL_MS);
        return result;
    }
    static async summarize(text) {
        const cacheKey = cache_1.aiCache.generateKey('summarize', { text });
        const cached = cache_1.aiCache.get(cacheKey);
        if (cached)
            return cached;
        const result = await this.execute({
            actionName: 'summarize',
            userMessage: text,
            taskSpecificRules: 'Summarize the provided user request concisely.'
        });
        cache_1.aiCache.set(cacheKey, result, CACHE_TTL_MS);
        return result;
    }
    static async translate(text, targetLanguage) {
        const cacheKey = cache_1.aiCache.generateKey('translate', { text, targetLanguage });
        const cached = cache_1.aiCache.get(cacheKey);
        if (cached)
            return cached;
        const result = await this.execute({
            actionName: 'translate',
            userMessage: text,
            targetLanguage,
            taskSpecificRules: 'Translate the provided user request accurately without altering its original meaning or tone.'
        });
        cache_1.aiCache.set(cacheKey, result, CACHE_TTL_MS);
        return result;
    }
}
exports.AiService = AiService;
//# sourceMappingURL=ai.service.js.map