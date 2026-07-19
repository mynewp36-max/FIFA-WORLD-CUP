import { Router } from 'express';
import { AiController } from '../controllers/ai.controller';
import { validateRequest } from '../../middleware/validateRequest';
import { z } from 'zod';

const ChatRequestSchema = z.object({
  message: z.string().min(1).max(2000).trim(),
  language: z.string().max(50).optional(),
  userRole: z.string().max(50).optional(),
  stadium: z.string().max(100).optional(),
  match: z.string().max(100).optional(),
  accessibility: z.boolean().optional()
});

const router = Router();

// Route: POST /api/ai/chat
router.post('/chat', validateRequest(ChatRequestSchema), AiController.handleChat);

export default router;
