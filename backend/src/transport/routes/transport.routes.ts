import { Router } from 'express';
import { TransportController } from '../controllers/transport.controller';
import { validateRequest } from '../../middleware/validateRequest';
import { z } from 'zod';

const TransportRecommendSchema = z.object({
  stadium: z.string().min(1),
  currentLocation: z.string().min(1),
  destination: z.string().min(1),
  groupSize: z.number().positive().optional(),
  wheelchair: z.boolean().optional(),
  avoidCrowd: z.boolean().optional(),
  language: z.string().optional(),
  userRole: z.string().optional(),
  ecoFriendly: z.boolean().optional(),
  weather: z.string().optional()
});

const router = Router();

// POST /api/transport/recommend
router.post('/recommend', validateRequest(TransportRecommendSchema), TransportController.recommend);

export default router;
