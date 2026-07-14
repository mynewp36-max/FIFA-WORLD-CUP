"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransportService = void 0;
const ai_service_1 = require("../../ai/services/ai.service");
const types_1 = require("../types");
const templates_1 = require("../prompts/templates");
const logger_1 = require("../../ai/utils/logger");
class TransportService {
    static async recommend(request, userId = 'system') {
        try {
            const prompt = (0, templates_1.buildTransportPrompt)(request);
            logger_1.aiLogger.debug('Transport prompt built', {
                role: request.userRole,
                from: request.currentLocation,
                to: request.destination,
                groupSize: request.groupSize,
            });
            const response = await ai_service_1.AiService.generateStructuredResponse(userId, prompt, types_1.TransportResponseSchema);
            if (!response) {
                throw new Error('AI returned empty transport response.');
            }
            return response;
        }
        catch (error) {
            logger_1.aiLogger.error('TransportService failed', error);
            throw error;
        }
    }
}
exports.TransportService = TransportService;
//# sourceMappingURL=transport.service.js.map