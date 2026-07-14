import { AI_CONFIG } from '../config';
import { aiLogger } from '../utils/logger';

export class OpenRouterClient {
  private static instance: OpenRouterClient;
  private readonly baseUrl = 'https://openrouter.ai/api/v1';

  private constructor() {
    if (!AI_CONFIG.OPENROUTER_API_KEY) {
      aiLogger.error('Initialization Failed', new Error('OPENROUTER_API_KEY is not defined in the environment.'));
    }
    
    aiLogger.info('OpenRouter Client initialized.');
  }

  public static getInstance(): OpenRouterClient {
    if (!OpenRouterClient.instance) {
      OpenRouterClient.instance = new OpenRouterClient();
    }
    return OpenRouterClient.instance;
  }

  public getHeaders(): HeadersInit {
    return {
      'Authorization': `Bearer ${AI_CONFIG.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json'
    };
  }

  public getEndpoint(): string {
    return `${this.baseUrl}/chat/completions`;
  }
}

export const getOpenRouterClient = () => OpenRouterClient.getInstance();
