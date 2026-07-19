import { AiService } from '../../ai/services/ai.service';
import { buildCrowdPrompt } from '../prompts/templates';
import { aiLogger } from '../../ai/utils/logger';

export class CrowdService {
  public static async analyzeSector(
    activeSector: string,
    density: string,
    userId: string = 'system'
  ): Promise<unknown> {
    try {
      const prompt = buildCrowdPrompt(activeSector, density);

      const schema = {
        type: 'object',
        properties: {
          strategy: { type: 'string' },
          riskLevel: { type: 'string' },
          recommendedAction: { type: 'string' }
        },
        required: ['strategy', 'riskLevel', 'recommendedAction']
      };

      const result = await AiService.generateStructuredResponse(
        userId,
        prompt,
        schema
      );

      if (!result) {
        throw new Error('AI returned empty crowd analysis.');
      }

      return result;
    } catch (error) {
      aiLogger.error('CrowdService failed', error);
      throw error;
    }
  }
}
