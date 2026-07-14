import { AiService } from '../../ai/services/ai.service';
import { EmergencyRequest, EmergencyResponse, EmergencyResponseSchema } from '../types';
import { buildEmergencyPrompt } from '../prompts/templates';
import { aiLogger } from '../../ai/utils/logger';

export class EmergencyService {
  public static async assist(
    request: EmergencyRequest,
    userId: string = 'system'
  ): Promise<EmergencyResponse> {
    try {
      const prompt = buildEmergencyPrompt(request);

      aiLogger.info(`Emergency assist: ${request.incidentType} at ${request.location}`, {
        stadium: request.stadium,
        role: request.userRole,
      });

      const response = await AiService.generateStructuredResponse(
        userId,
        prompt,
        EmergencyResponseSchema
      );

      if (!response) {
        throw new Error('AI returned empty emergency response.');
      }

      return response as EmergencyResponse;
    } catch (error) {
      aiLogger.error('EmergencyService failed', error);
      throw error;
    }
  }
}
