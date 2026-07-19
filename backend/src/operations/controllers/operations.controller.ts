import { Request, Response, NextFunction } from 'express';
import { OperationsService } from '../services/operations.service';
import { OperationsSummaryRequest } from '../types';
import { aiLogger } from '../../ai/utils/logger';
import { sendResponse } from '../../utils/response';

export class OperationsController {
  public static async generateSummary(req: Request, res: Response, next: NextFunction): Promise<void> {
    const startTime = Date.now();

    try {
      const data: OperationsSummaryRequest = req.body;

      // Defaults
      data.language = data.language ?? 'English';
      data.userRole = data.userRole ?? 'Organizer';
      data.weather = data.weather ?? 'Unknown';

      const userId = req.ip || 'anonymous-operations-user';
      aiLogger.info(`Operations summary request | Stadium: ${data.stadium} | Crowd: ${data.crowdStatus} | Transport: ${data.transportStatus}`);

      const result = await OperationsService.generateSummary(data, userId);

      const responseTime = Date.now() - startTime;
      aiLogger.info(`Operations summary generated in ${responseTime}ms`);

      res.status(200).json(sendResponse(req, true, result, 'Operations summary generated successfully.'));
    } catch (error: unknown) {
      next(error);
    }
  }
}
