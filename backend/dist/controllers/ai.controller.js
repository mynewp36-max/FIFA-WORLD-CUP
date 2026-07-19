"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiController = void 0;
const ai_service_1 = require("../ai/services/ai.service");
const context_manager_1 = require("../ai/context/context.manager");
const logger_1 = require("../ai/utils/logger");
const response_1 = require("../utils/response");
/**
 * Handles the POST /api/ai/chat route.
 * Input validation is performed upstream by the Zod `validateRequest` middleware.
 * This controller only handles business logic: context update, AI call, response.
 */
class AiController {
    static async handleChat(req, res, next) {
        const startTime = Date.now();
        try {
            const { message, language, userRole, stadium, match, accessibility } = req.body;
            const userId = req.ip || 'anonymous-user';
            logger_1.aiLogger.info(`Request start: /api/ai/chat from ${userId}`);
            // Build context updates only for defined optional fields
            const updates = {};
            if (userRole)
                updates.role = userRole.toLowerCase();
            if (language)
                updates.preferredLanguage = language;
            if (stadium)
                updates.stadium = stadium;
            if (match)
                updates.match = match;
            if (accessibility !== undefined) {
                updates.accessibilityPreferences = accessibility ? ['Assistance required'] : [];
            }
            context_manager_1.contextManager.updateContext(userId, updates);
            const reply = await ai_service_1.AiService.generateResponse(userId, message);
            const responseTime = Date.now() - startTime;
            logger_1.aiLogger.info(`Response success for ${userId} in ${responseTime}ms`);
            res.status(200).json((0, response_1.sendResponse)(req, true, { reply, language: language || 'English' }, 'Chat response generated successfully.'));
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AiController = AiController;
//# sourceMappingURL=ai.controller.js.map