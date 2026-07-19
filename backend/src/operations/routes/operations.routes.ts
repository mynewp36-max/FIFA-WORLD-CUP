import { Router } from 'express';
import { OperationsController } from '../controllers/operations.controller';
import { validateRequest } from '../../middleware/validateRequest';
import { z } from 'zod';

const OperationsSummarySchema = z.object({
  stadium: z.string().min(1),
  match: z.string().optional(),
  timeToKickoff: z.string().optional(),
  crowdStatus: z.string().min(1),
  transportStatus: z.string().min(1),
  weather: z.string().optional(),
  activeAlerts: z.array(z.string()).optional(),
  language: z.string().optional(),
  userRole: z.string().optional()
});

const router = Router();

// POST /api/operations/summary
router.post('/summary', validateRequest(OperationsSummarySchema), OperationsController.generateSummary);

export default router;
