import { Request, Response, NextFunction } from 'express';
import { AccessibilityService } from '../services/accessibility.service';
import { AccessibilityRequest } from '../types';
import { aiLogger } from '../../ai/utils/logger';
import { sendResponse } from '../../utils/response';

export class AccessibilityController {
  public static async assist(req: Request, res: Response, next: NextFunction): Promise<void> {
    const startTime = Date.now();

    try {
      const data: AccessibilityRequest = req.body;



      const userId = req.ip || 'anonymous-accessibility-user';
      aiLogger.info(`Accessibility request for needs: ${data.accessibilityNeeds.join(', ')} → ${data.destination}`);

      const result = await AccessibilityService.assist(data, userId);

      const responseTime = Date.now() - startTime;
      aiLogger.info(`Accessibility response generated in ${responseTime}ms`);

      res.status(200).json(sendResponse(req, true, result, 'Accessibility guidance generated successfully.'));
    } catch (error: unknown) {
      next(error);
    }
  }
}
