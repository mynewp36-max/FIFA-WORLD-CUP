import { Request, Response, NextFunction } from 'express';
import { TransportService } from '../services/transport.service';
import { TransportRequest } from '../types';
import { aiLogger } from '../../ai/utils/logger';
import { sendResponse } from '../../utils/response';

export class TransportController {
  public static async recommend(req: Request, res: Response, next: NextFunction): Promise<void> {
    const startTime = Date.now();

    try {
      const data: TransportRequest = req.body;

      // Validation
      if (!data.stadium || !data.currentLocation || !data.destination) {
        res.status(400).json(sendResponse(req, false, null, "'stadium', 'currentLocation', and 'destination' are required."));
        return;
      }

      if (data.groupSize !== undefined && (typeof data.groupSize !== 'number' || data.groupSize < 1)) {
        res.status(400).json(sendResponse(req, false, null, "'groupSize' must be a positive number."));
        return;
      }

      // Defaults
      data.groupSize = data.groupSize ?? 1;
      data.wheelchair = data.wheelchair ?? false;
      data.avoidCrowd = data.avoidCrowd ?? false;
      data.language = data.language ?? 'English';
      data.userRole = data.userRole ?? 'Fan';

      const userId = req.ip || 'anonymous-transport-user';
      aiLogger.info(`Transport request: ${data.currentLocation} → ${data.destination} | Role: ${data.userRole} | Group: ${data.groupSize}`);

      const result = await TransportService.recommend(data, userId);

      const responseTime = Date.now() - startTime;
      aiLogger.info(`Transport response generated in ${responseTime}ms`);

      res.status(200).json(sendResponse(req, true, result, 'Transport recommendation generated successfully.'));
    } catch (error: any) {
      next(error);
    }
  }
}
