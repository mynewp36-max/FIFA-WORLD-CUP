import { Request, Response, NextFunction } from 'express';
import { EmergencyService } from '../services/emergency.service';
import { EmergencyRequest } from '../types';
import { aiLogger } from '../../ai/utils/logger';
import { sendResponse } from '../../utils/response';

const VALID_INCIDENT_TYPES = [
  'Medical Assistance', 'Lost Child', 'Lost Property', 'Crowd Congestion',
  'Blocked Exit', 'Accessibility Assistance', 'Suspicious Activity', 'General Help Request',
];

export class EmergencyController {
  public static async assist(req: Request, res: Response, next: NextFunction): Promise<void> {
    const startTime = Date.now();

    try {
      const data: EmergencyRequest = req.body;

      // Validation
      if (!data.incidentType || !VALID_INCIDENT_TYPES.includes(data.incidentType)) {
        res.status(400).json(sendResponse(req, false, null, `'incidentType' must be one of: ${VALID_INCIDENT_TYPES.join(', ')}.`));
        return;
      }
      if (!data.stadium || !data.location) {
        res.status(400).json(sendResponse(req, false, null, "'stadium' and 'location' are required."));
        return;
      }

      // Defaults
      data.language = data.language ?? 'English';
      data.userRole = data.userRole ?? 'Fan';

      const userId = req.ip || 'anonymous-emergency-user';
      aiLogger.info(`Emergency request received: [${data.incidentType}] at ${data.location} — ${data.stadium}`);

      const result = await EmergencyService.assist(data, userId);

      const responseTime = Date.now() - startTime;
      aiLogger.info(`Emergency response generated in ${responseTime}ms | Priority: ${result.priority}`);

      res.status(200).json(sendResponse(req, true, result, 'Emergency guidance generated successfully.'));
    } catch (error: any) {
      next(error);
    }
  }
}
