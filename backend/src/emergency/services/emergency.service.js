"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmergencyService = void 0;
const ai_service_1 = require("../../ai/services/ai.service");
const types_1 = require("../types");
const templates_1 = require("../prompts/templates");
const logger_1 = require("../../ai/utils/logger");
class EmergencyService {
    static async assist(request, userId = 'system') {
        try {
            const prompt = (0, templates_1.buildEmergencyPrompt)(request);
            logger_1.aiLogger.info(`Emergency assist: ${request.incidentType} at ${request.location}`, {
                stadium: request.stadium,
                role: request.userRole,
            });
            const response = await ai_service_1.AiService.generateStructuredResponse(userId, prompt, types_1.EmergencyResponseSchema);
            if (!response) {
                throw new Error('AI returned empty emergency response.');
            }
            return response;
        }
        catch (error) {
            logger_1.aiLogger.error('EmergencyService failed', error);
            throw error;
        }
    }
}
exports.EmergencyService = EmergencyService;
//# sourceMappingURL=emergency.service.js.map