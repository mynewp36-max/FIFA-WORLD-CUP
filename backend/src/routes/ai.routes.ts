import { Router } from 'express';
import { AiController } from '../controllers/ai.controller';
import { validateRequest } from '../middleware/validateRequest';
import { ChatRequestSchema } from '../utils/schemas';

const router = Router();

// Route: POST /api/ai/chat
router.post('/chat', validateRequest(ChatRequestSchema), AiController.handleChat);

export default router;
