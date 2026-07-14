import { AiService } from '../../ai/services/ai.service';
import { TransportRequest, TransportResponse, TransportResponseSchema } from '../types';
import { buildTransportPrompt } from '../prompts/templates';
import { aiLogger } from '../../ai/utils/logger';

export class TransportService {
  public static async recommend(
    request: TransportRequest,
    userId: string = 'system'
  ): Promise<TransportResponse> {
    try {
      const prompt = buildTransportPrompt(request);

      aiLogger.debug('Transport prompt built', {
        role: request.userRole,
        from: request.currentLocation,
        to: request.destination,
        groupSize: request.groupSize,
      });

      const response = await AiService.generateStructuredResponse(
        userId,
        prompt,
        TransportResponseSchema
      );

      if (!response) {
        throw new Error('AI returned empty transport response.');
      }

      return response as TransportResponse;
    } catch (error) {
      aiLogger.error('TransportService failed', error);
      throw error;
    }
  }
}
