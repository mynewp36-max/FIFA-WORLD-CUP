import { Router } from 'express';
import { AccessibilityController } from '../controllers/accessibility.controller';

import { validateRequest } from '../../middleware/validateRequest';
import { z } from 'zod';

const AccessibilityAssistSchema = z.object({
  stadium: z.string().min(1),
  match: z.string().optional(),
  userRole: z.string().optional(),
  language: z.string().optional(),
  location: z.string().optional(),
  destination: z.string().min(1),
  accessibilityNeeds: z.array(z.string()).min(1)
});

const router = Router();

// POST /api/accessibility/assist
router.post('/assist', validateRequest(AccessibilityAssistSchema), AccessibilityController.assist);

export default router;
