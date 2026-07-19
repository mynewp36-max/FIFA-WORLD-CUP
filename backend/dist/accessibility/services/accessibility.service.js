"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessibilityService = void 0;
const ai_service_1 = require("../../ai/services/ai.service");
const types_1 = require("../types");
const templates_1 = require("../prompts/templates");
const logger_1 = require("../../ai/utils/logger");
class AccessibilityService {
    static async assist(request, userId = 'system') {
        try {
            const prompt = (0, templates_1.buildAccessibilityPrompt)(request);
            logger_1.aiLogger.debug('Accessibility prompt built', {
                needs: request.accessibilityNeeds,
                destination: request.destination,
            });
            const response = await ai_service_1.AiService.generateStructuredResponse(userId, prompt, types_1.AccessibilityResponseSchema);
            if (!response) {
                throw new Error('AI returned empty response for accessibility request.');
            }
            return response;
        }
        catch (error) {
            logger_1.aiLogger.error('AccessibilityService failed', error);
            throw error;
        }
    }
}
exports.AccessibilityService = AccessibilityService;
//# sourceMappingURL=accessibility.service.js.map