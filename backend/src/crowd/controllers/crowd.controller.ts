import { Request, Response, NextFunction } from 'express';
import { AiService } from '../../ai/services/ai.service';
import { buildCrowdPrompt } from '../prompts/templates';
import { sendResponse } from '../../utils/response';
import { aiLogger } from '../../ai/utils/logger';

export class CrowdController {
  public static async analyzeSector(req: Request, res: Response, next: NextFunction): Promise<void> {
    const startTime = Date.now();
    try {
      const { activeSector = 'North Plaza', density = 'High' } = req.body;
      
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
        req.ip || 'anonymous-user',
        prompt,
        schema
      );

      const responseTime = Date.now() - startTime;
      aiLogger.info(`Crowd analysis generated in ${responseTime}ms`);

      res.status(200).json(sendResponse(req, true, result, 'Crowd analysis generated successfully.'));
    } catch (error: unknown) {
      next(error);
    }
  }
}
