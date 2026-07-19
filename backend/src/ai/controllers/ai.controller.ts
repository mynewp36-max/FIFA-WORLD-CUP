import { Request, Response, NextFunction } from 'express';
import { AiService } from '../services/ai.service';
import { contextManager } from '../context/context.manager';
import { aiLogger } from '../utils/logger';
import { sendResponse } from '../../utils/response';

/**
 * Handles the POST /api/ai/chat route.
 * Input validation is performed upstream by the Zod `validateRequest` middleware.
 * This controller only handles business logic: context update, AI call, response.
 */
export class AiController {
  public static async handleChat(req: Request, res: Response, next: NextFunction): Promise<void> {
    const startTime = Date.now();

    try {
      const { message, language, userRole, stadium, match, accessibility } = req.body as {
        message: string;
        language?: string;
        userRole?: string;
        stadium?: string;
        match?: string;
        accessibility?: boolean;
      };

      const userId = req.ip || 'anonymous-user';
      aiLogger.info(`Request start: /api/ai/chat from ${userId}`);

      // Build context updates only for defined optional fields
      const updates: Record<string, unknown> = {};
      if (userRole) updates.role = userRole.toLowerCase();
      if (language) updates.preferredLanguage = language;
      if (stadium) updates.stadium = stadium;
      if (match) updates.match = match;
      if (accessibility !== undefined) {
        updates.accessibilityPreferences = accessibility ? ['Assistance required'] : [];
      }

      contextManager.updateContext(userId, updates);

      const reply = await AiService.generateResponse(userId, message);

      const responseTime = Date.now() - startTime;
      aiLogger.info(`Response success for ${userId} in ${responseTime}ms`);

      res.status(200).json(
        sendResponse(req, true, { reply, language: language || 'English' }, 'Chat response generated successfully.')
      );
    } catch (error: unknown) {
      next(error);
    }
  }
}
