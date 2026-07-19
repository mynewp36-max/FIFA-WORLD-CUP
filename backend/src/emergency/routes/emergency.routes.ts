import { Router } from 'express';
import { EmergencyController } from '../controllers/emergency.controller';
import { validateRequest } from '../../middleware/validateRequest';
import { z } from 'zod';

const EmergencyAssistSchema = z.object({
  incidentType: z.string().min(1),
  location: z.string().min(1),
  stadium: z.string().min(1),
  language: z.string().optional(),
  userRole: z.string().optional()
});

const router = Router();

// POST /api/emergency/assist
router.post('/assist', validateRequest(EmergencyAssistSchema), EmergencyController.assist);

export default router;
