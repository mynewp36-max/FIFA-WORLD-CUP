import { Router } from 'express';
import { EmergencyController } from '../controllers/emergency.controller';
import { validateRequest } from '../../middleware/validateRequest';
import { EmergencyDispatchSchema } from '../../utils/schemas';

const router = Router();

// POST /api/emergency/assist
router.post('/assist', validateRequest(EmergencyDispatchSchema), EmergencyController.assist);

export default router;
