import { Router } from 'express';
import { AccessibilityController } from '../controllers/accessibility.controller';

const router = Router();

// POST /api/accessibility/assist
router.post('/assist', AccessibilityController.assist);

export default router;
