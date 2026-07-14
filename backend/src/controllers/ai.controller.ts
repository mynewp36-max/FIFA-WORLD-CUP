import { Request, Response, NextFunction } from 'express';
import { AiService } from '../ai/services/ai.service';
import { contextManager } from '../ai/context/context.manager';
import { aiLogger } from '../ai/utils/logger';
import { sendResponse } from '../utils/response';

export class AiController {
  
  public static async handleChat(req: Request, res: Response, next: NextFunction): Promise<void> {
    const startTime = Date.now();
    
    try {
      // 1. Validation
      const { message, language, userRole, stadium, match, accessibility } = req.body;
      
      if (!message || typeof message !== 'string') {
        res.status(400).json(sendResponse(req, false, null, "Valid 'message' string is required."));
        return;
      }
      
      const userId = req.ip || 'anonymous-user';
      aiLogger.info(`Request start: /api/ai/chat from ${userId}`);
      
      // 2. Update Context
      const updates: any = {};
      if (userRole) updates.role = userRole.toLowerCase();
      if (language) updates.preferredLanguage = language;
      if (stadium) updates.stadium = stadium;
      if (match) updates.match = match;
      if (accessibility !== undefined) {
        updates.accessibilityPreferences = accessibility ? ['Assistance required'] : [];
      }
      
      contextManager.updateContext(userId, updates);
      
      // 3. Call AI Service
      const reply = await AiService.generateResponse(userId, message);
      
      const responseTime = Date.now() - startTime;
      aiLogger.info(`Response success for ${userId} in ${responseTime}ms`);
      
      // 4. Return Structured JSON
      res.status(200).json(sendResponse(req, true, {
        reply,
        language: language || 'English'
      }, 'Chat response generated successfully.'));
      
    } catch (error: any) {
      next(error);
    }
  }
}
