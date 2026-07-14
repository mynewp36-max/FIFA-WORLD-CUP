"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiController = void 0;
const ai_service_1 = require("../ai/services/ai.service");
const context_manager_1 = require("../ai/context/context.manager");
const logger_1 = require("../ai/utils/logger");
const response_1 = require("../utils/response");
class AiController {
    static async handleChat(req, res, next) {
        const startTime = Date.now();
        try {
            // 1. Validation
            const { message, language, userRole, stadium, match, accessibility } = req.body;
            if (!message || typeof message !== 'string') {
                res.status(400).json((0, response_1.sendResponse)(req, false, null, "Valid 'message' string is required."));
                return;
            }
            const userId = req.ip || 'anonymous-user';
            logger_1.aiLogger.info(`Request start: /api/ai/chat from ${userId}`);
            // 2. Update Context
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
            // 3. Call AI Service
            const reply = await ai_service_1.AiService.generateResponse(userId, message);
            const responseTime = Date.now() - startTime;
            logger_1.aiLogger.info(`Response success for ${userId} in ${responseTime}ms`);
            // 4. Return Structured JSON
            res.status(200).json((0, response_1.sendResponse)(req, true, {
                reply,
                language: language || 'English'
            }, 'Chat response generated successfully.'));
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AiController = AiController;
//# sourceMappingURL=ai.controller.js.map