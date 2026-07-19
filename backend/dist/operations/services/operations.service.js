"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperationsService = void 0;
const ai_service_1 = require("../../ai/services/ai.service");
const types_1 = require("../types");
const templates_1 = require("../prompts/templates");
const logger_1 = require("../../ai/utils/logger");
class OperationsService {
    static async generateSummary(request, userId = 'system') {
        try {
            const prompt = (0, templates_1.buildOperationsPrompt)(request);
            logger_1.aiLogger.debug('Operations prompt built', {
                stadium: request.stadium,
                crowdStatus: request.crowdStatus,
                transportStatus: request.transportStatus,
            });
            const response = await ai_service_1.AiService.generateStructuredResponse(userId, prompt, types_1.OperationsSummarySchema);
            if (!response) {
                throw new Error('AI returned empty response for operations summary.');
            }
            return response;
        }
        catch (error) {
            logger_1.aiLogger.error('OperationsService failed', error);
            throw error;
        }
    }
}
exports.OperationsService = OperationsService;
//# sourceMappingURL=operations.service.js.map