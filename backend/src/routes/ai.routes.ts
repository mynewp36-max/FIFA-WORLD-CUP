import { Router } from 'express';
import { AiController } from '../controllers/ai.controller';

const router = Router();

// Route: POST /api/ai/chat
router.post('/chat', AiController.handleChat);

export default router;
