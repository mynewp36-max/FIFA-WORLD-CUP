import { Router } from 'express';
import { EmergencyController } from '../controllers/emergency.controller';

const router = Router();

// POST /api/emergency/assist
router.post('/assist', EmergencyController.assist);

export default router;
