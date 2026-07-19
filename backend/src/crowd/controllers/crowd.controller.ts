import { Request, Response, NextFunction } from 'express';
import { CrowdService } from '../services/crowd.service';
import { sendResponse } from '../../utils/response';
import { aiLogger } from '../../ai/utils/logger';

export class CrowdController {
  public static async analyzeSector(req: Request, res: Response, next: NextFunction): Promise<void> {
    const startTime = Date.now();
    try {
      const { activeSector = 'North Plaza', density = 'High' } = req.body;
      const userId = req.ip || 'anonymous-user';
      
      const result = await CrowdService.analyzeSector(activeSector, density, userId);

      const responseTime = Date.now() - startTime;
      aiLogger.info(`Crowd analysis generated in ${responseTime}ms`);

      res.status(200).json(sendResponse(req, true, result, 'Crowd analysis generated successfully.'));
    } catch (error: unknown) {
      next(error);
    }
  }
}
