import { getOpenRouterClient } from '../client/openrouter.client';
import { UnauthorizedError, ForbiddenError, NotFoundError, RateLimitError, InternalError, TimeoutError } from '../../utils/errors';
import { contextManager } from '../context/context.manager';
import { buildLayeredPrompt, LayeredPromptParams } from '../prompts/prompt.builder';
import { getGenerationConfig } from '../config';
import { aiLogger } from '../utils/logger';
import { safeJsonParse } from '../../utils/jsonParser';
import { withRetry } from '../utils/retry';
import { withTimeout } from '../utils/timeout';
import { aiCache } from '../utils/cache';
import { sanitizePromptInput } from '../utils/sanitizer';

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

interface ExecuteParams extends LayeredPromptParams {
  actionName: string;
  userId?: string;
  schema?: Record<string, unknown>;
}

export class AiService {
  
  /**
   * Centralized execution pipeline for all Gemini interactions.
   * Enforces DRY principles by handling try/catch blocks, client initialization,
   * context injection, layered prompting, and strict schema parsing.
   */
  private static async execute(params: ExecuteParams): Promise<unknown> {
    try {
      const client = getOpenRouterClient();
      
      // Auto-inject context if a userId is provided
      if (params.userId && !params.context) {
        params.context = contextManager.getContext(params.userId);
      }
      
      const sanitizedMessage = sanitizePromptInput(params.userMessage);
      
      const finalPrompt = buildLayeredPrompt({
        userMessage: sanitizedMessage,
        context: params.context,
        targetLanguage: params.targetLanguage,
        taskSpecificRules: params.taskSpecificRules
      });
      
      aiLogger.debug(`Executing AI action: ${params.actionName}`, { userId: params.userId });
      
      let responseFormat: Record<string, string> | undefined = undefined;
      
      const configOverrides: Record<string, unknown> = {};
      // Apply strict JSON formatting overrides if a schema is requested
      if (params.schema) {
        configOverrides.temperature = 0.1;
        responseFormat = { type: 'json_object' };
      }
      
      // Use lower token limit for typical short responses
      if (['generateResponse', 'generateStructuredResponse'].includes(params.actionName)) {
        configOverrides.maxOutputTokens = 1024;
      }

      const { model, config } = getGenerationConfig(configOverrides);
      
      const payload = {
        model,
        messages: [{ role: 'user', content: finalPrompt }],
        temperature: config.temperature,
        max_tokens: config.maxOutputTokens, // Automatically falls back to AI_CONFIG.MAX_TOKENS
        ...(responseFormat ? { response_format: responseFormat } : {})
      };

      const response = await withRetry(
        () => withTimeout(
          async () => {
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
                let errorBody: Record<string, unknown> | null = null;
                try {
                  errorBody = await res.json();
                } catch (e) {
                  errorBody = { message: res.statusText };
                }

                aiLogger.error(`OpenRouter API error ${res.status}`, {
                  status: res.status,
                  errorMessage: (errorBody as Record<string, any>)?.error?.message || (errorBody as Record<string, any>)?.message || 'Unknown error',
                  providerMessage: (errorBody as Record<string, any>)?.error?.metadata?.provider_message || (errorBody as Record<string, any>)?.error?.metadata?.provider_name || undefined,
                  model: (errorBody as Record<string, any>)?.error?.metadata?.model || payload.model,
                  code: (errorBody as Record<string, any>)?.error?.code || undefined,
                  rawBody: errorBody
                });

                switch (res.status) {
                  case 401: throw new UnauthorizedError('Invalid OpenRouter API key');
                  case 403: throw new ForbiddenError('Access to OpenRouter API forbidden');
                  case 404: throw new NotFoundError('Model or resource not found on OpenRouter');
                  case 429: throw new RateLimitError('OpenRouter rate limit exceeded');
                  case 500: throw new InternalError('OpenRouter internal server error');
                  case 503: throw new InternalError('OpenRouter service unavailable');
                  default: throw new InternalError(`OpenRouter API error: ${res.status}`);
                }
              }
              
              return await res.json();
            } catch (err: unknown) {
              if (err instanceof Error && err.name === 'AbortError') {
                throw new TimeoutError('OpenRouter request timed out');
              }
              throw err;
            }
          },
          15000,
          `OpenRouter.generateContent(${params.actionName})`
        ),
        `OpenRouter.generateContent(${params.actionName})`,
        { maxRetries: 2, baseDelayMs: 1000 }
      );
      
      const text = response.choices?.[0]?.message?.content || '';
      
      if (params.schema) {
        return safeJsonParse(text, params.actionName);
      }
      
      return text;
    } catch (error) {
      aiLogger.error(`Error during AI execution: ${params.actionName}`, error);
      throw error;
    }
  }

  public static async generateResponse(userId: string, userMessage: string): Promise<string> {
    const result = await this.execute({
      actionName: 'generateResponse',
      userId,
      userMessage
    });
    return result as string;
  }

  public static async generateStructuredResponse<T>(userId: string, userMessage: string, schema: Record<string, unknown>): Promise<T> {
    const cacheKey = aiCache.generateKey('structured', { userId, userMessage, schema });
    const cached = aiCache.get<T>(cacheKey);
    if (cached) return cached;

    const result = await this.execute({
      actionName: 'generateStructuredResponse',
      userId,
      userMessage,
      schema
    });

    aiCache.set(cacheKey, result, CACHE_TTL_MS);
    return result as T;
  }

  public static async summarize(text: string): Promise<string> {
    const cacheKey = aiCache.generateKey('summarize', { text });
    const cached = aiCache.get<string>(cacheKey);
    if (cached) return cached;

    const result = await this.execute({
      actionName: 'summarize',
      userMessage: text,
      taskSpecificRules: 'Summarize the provided user request concisely.'
    });

    aiCache.set(cacheKey, result, CACHE_TTL_MS);
    return result as string;
  }

  public static async translate(text: string, targetLanguage: string): Promise<string> {
    const cacheKey = aiCache.generateKey('translate', { text, targetLanguage });
    const cached = aiCache.get<string>(cacheKey);
    if (cached) return cached;

    const result = await this.execute({
      actionName: 'translate',
      userMessage: text,
      targetLanguage,
      taskSpecificRules: 'Translate the provided user request accurately without altering its original meaning or tone.'
    });

    aiCache.set(cacheKey, result, CACHE_TTL_MS);
    return result as string;
  }
}
