"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavigationService = void 0;
const ai_service_1 = require("../../ai/services/ai.service");
const types_1 = require("../types");
const prompt_1 = require("../utils/prompt");
const logger_1 = require("../../ai/utils/logger");
class NavigationService {
    static async getRoute(request, userId = 'system') {
        try {
            const prompt = (0, prompt_1.buildNavigationPrompt)(request);
            const response = await ai_service_1.AiService.generateStructuredResponse(userId, prompt, types_1.NavigationResponseSchema);
            if (!response) {
                throw new Error('AI returned empty response for navigation route.');
            }
            return response;
        }
        catch (error) {
            logger_1.aiLogger.error('Failed to generate navigation route', error);
            throw error;
        }
    }
}
exports.NavigationService = NavigationService;
//# sourceMappingURL=navigation.service.js.map