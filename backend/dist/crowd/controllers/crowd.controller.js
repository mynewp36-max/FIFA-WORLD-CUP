"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrowdController = void 0;
const ai_service_1 = require("../../ai/services/ai.service");
const templates_1 = require("../prompts/templates");
const response_1 = require("../../utils/response");
const logger_1 = require("../../ai/utils/logger");
class CrowdController {
    static async analyzeSector(req, res, next) {
        const startTime = Date.now();
        try {
            const { activeSector = 'North Plaza', density = 'High' } = req.body;
            const prompt = (0, templates_1.buildCrowdPrompt)(activeSector, density);
            const schema = {
                type: 'object',
                properties: {
                    strategy: { type: 'string' },
                    riskLevel: { type: 'string' },
                    recommendedAction: { type: 'string' }
                },
                required: ['strategy', 'riskLevel', 'recommendedAction']
            };
            const result = await ai_service_1.AiService.generateStructuredResponse(req.ip || 'anonymous-user', prompt, schema);
            const responseTime = Date.now() - startTime;
            logger_1.aiLogger.info(`Crowd analysis generated in ${responseTime}ms`);
            res.status(200).json((0, response_1.sendResponse)(req, true, result, 'Crowd analysis generated successfully.'));
        }
        catch (error) {
            next(error);
        }
    }
}
exports.CrowdController = CrowdController;
//# sourceMappingURL=crowd.controller.js.map