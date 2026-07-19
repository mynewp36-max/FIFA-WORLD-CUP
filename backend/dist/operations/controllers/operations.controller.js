"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperationsController = void 0;
const operations_service_1 = require("../services/operations.service");
const logger_1 = require("../../ai/utils/logger");
const response_1 = require("../../utils/response");
class OperationsController {
    static async generateSummary(req, res, next) {
        const startTime = Date.now();
        try {
            const data = req.body;
            // Validation
            if (!data.stadium) {
                res.status(400).json((0, response_1.sendResponse)(req, false, null, "'stadium' is required."));
                return;
            }
            if (!data.crowdStatus || !data.transportStatus) {
                res.status(400).json((0, response_1.sendResponse)(req, false, null, "'crowdStatus' and 'transportStatus' are required."));
                return;
            }
            // Defaults
            data.language = data.language ?? 'English';
            data.userRole = data.userRole ?? 'Organizer';
            data.weather = data.weather ?? 'Unknown';
            const userId = req.ip || 'anonymous-operations-user';
            logger_1.aiLogger.info(`Operations summary request | Stadium: ${data.stadium} | Crowd: ${data.crowdStatus} | Transport: ${data.transportStatus}`);
            const result = await operations_service_1.OperationsService.generateSummary(data, userId);
            const responseTime = Date.now() - startTime;
            logger_1.aiLogger.info(`Operations summary generated in ${responseTime}ms`);
            res.status(200).json((0, response_1.sendResponse)(req, true, result, 'Operations summary generated successfully.'));
        }
        catch (error) {
            next(error);
        }
    }
}
exports.OperationsController = OperationsController;
//# sourceMappingURL=operations.controller.js.map