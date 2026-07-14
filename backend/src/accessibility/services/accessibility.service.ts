import { AiService } from '../../ai/services/ai.service';
import { AccessibilityRequest, AccessibilityResponse, AccessibilityResponseSchema } from '../types';
import { buildAccessibilityPrompt } from '../prompts/templates';
import { aiLogger } from '../../ai/utils/logger';

export class AccessibilityService {
  public static async assist(
    request: AccessibilityRequest,
    userId: string = 'system'
  ): Promise<AccessibilityResponse> {
    try {
      const prompt = buildAccessibilityPrompt(request);

      aiLogger.debug('Accessibility prompt built', {
        needs: request.accessibilityNeeds,
        destination: request.destination,
      });

      const response = await AiService.generateStructuredResponse(
        userId,
        prompt,
        AccessibilityResponseSchema
      );

      if (!response) {
        throw new Error('AI returned empty response for accessibility request.');
      }

      return response as AccessibilityResponse;
    } catch (error) {
      aiLogger.error('AccessibilityService failed', error);
      throw error;
    }
  }
}
