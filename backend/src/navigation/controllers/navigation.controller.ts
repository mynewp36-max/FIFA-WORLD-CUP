import { Request, Response, NextFunction } from 'express';
import { NavigationService } from '../services/navigation.service';
import { NavigationRequest } from '../types';
import { aiLogger } from '../../ai/utils/logger';
import { sendResponse } from '../../utils/response';

export class NavigationController {
  public static async getRoute(req: Request, res: Response, next: NextFunction): Promise<void> {
    const startTime = Date.now();
    try {
      const data: NavigationRequest = req.body;
      

      
      const userId = req.ip || 'anonymous-navigator';
      aiLogger.info(`Navigation request from ${data.currentLocation} to ${data.destination}`);
      
      const routeResponse = await NavigationService.getRoute(data, userId);
      
      const responseTime = Date.now() - startTime;
      aiLogger.info(`Navigation generated in ${responseTime}ms`);
      
      res.status(200).json(sendResponse(req, true, routeResponse, 'Route calculated successfully.'));
    } catch (error: unknown) {
      next(error);
    }
  }
}
