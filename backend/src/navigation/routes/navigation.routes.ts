import { Router } from 'express';
import { NavigationController } from '../controllers/navigation.controller';

import { validateRequest } from '../../middleware/validateRequest';
import { z } from 'zod';

const NavigationRouteSchema = z.object({
  currentLocation: z.string().min(1),
  destination: z.string().min(1),
  stadium: z.string().min(1),
  userRole: z.string().optional(),
  wheelchair: z.boolean().optional(),
  avoidCrowd: z.boolean().optional(),
  language: z.string().optional(),
  ecoFriendly: z.boolean().optional()
});

const router = Router();

// Route: POST /api/navigation/route
router.post('/route', validateRequest(NavigationRouteSchema), NavigationController.getRoute);

export default router;
