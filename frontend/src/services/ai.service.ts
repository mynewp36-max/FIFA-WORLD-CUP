import type { ChatRequest, ChatResponse } from '../types/ai';
import { apiClient } from '../utils/apiClient';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export class AiService {
  public static async sendMessage(request: ChatRequest): Promise<ChatResponse> {
    try {
      const response = await apiClient<{ success: boolean; data: ChatResponse; message?: string; timestamp?: string }>(`${API_BASE_URL}/ai/chat`, {
        method: 'POST',
        body: JSON.stringify(request),
        retries: 1,
      });

      return {
        ...response.data,
        success: response.success,
        timestamp: response.timestamp,
        error: response.message
      } as ChatResponse;
    } catch (error: unknown) {
      console.error('AiService Error:', error);
      return {
        success: false,
        reply: "I'm having trouble connecting right now. Please try again later.",
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : String(error)
      } as ChatResponse;
    }
  }
}
