import { AiService } from '../../ai/services/ai.service';
import { OperationsSummaryRequest, OperationsSummaryResponse, OperationsSummarySchema } from '../types';
import { buildOperationsPrompt } from '../prompts/templates';
import { aiLogger } from '../../ai/utils/logger';

export class OperationsService {
  public static async generateSummary(
    request: OperationsSummaryRequest,
    userId: string = 'system'
  ): Promise<OperationsSummaryResponse> {
    try {
      const prompt = buildOperationsPrompt(request);

      aiLogger.debug('Operations prompt built', {
        stadium: request.stadium,
        crowdStatus: request.crowdStatus,
        transportStatus: request.transportStatus,
      });

      const response = await AiService.generateStructuredResponse(
        userId,
        prompt,
        OperationsSummarySchema
      );

      if (!response) {
        throw new Error('AI returned empty response for operations summary.');
      }

      return response as OperationsSummaryResponse;
    } catch (error) {
      aiLogger.error('OperationsService failed', error);
      throw error;
    }
  }
}
