import { AiService } from '../../ai/services/ai.service';
import { NavigationRequest, NavigationResponse, NavigationResponseSchema } from '../types';
import { buildNavigationPrompt } from '../utils/prompt';
import { aiLogger } from '../../ai/utils/logger';

export class NavigationService {
  public static async getRoute(request: NavigationRequest, userId: string = 'system'): Promise<NavigationResponse> {
    try {
      const prompt = buildNavigationPrompt(request);
      
      const response = await AiService.generateStructuredResponse(
        userId, 
        prompt, 
        NavigationResponseSchema
      );
      
      if (!response) {
        throw new Error('AI returned empty response for navigation route.');
      }
      
      return response as NavigationResponse;
    } catch (error) {
      aiLogger.error('Failed to generate navigation route', error);
      throw error;
    }
  }
}
