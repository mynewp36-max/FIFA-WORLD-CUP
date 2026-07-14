"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransportController = void 0;
const transport_service_1 = require("../services/transport.service");
const logger_1 = require("../../ai/utils/logger");
const response_1 = require("../../utils/response");
class TransportController {
    static async recommend(req, res, next) {
        const startTime = Date.now();
        try {
            const data = req.body;
            // Validation
            if (!data.stadium || !data.currentLocation || !data.destination) {
                res.status(400).json((0, response_1.sendResponse)(req, false, null, "'stadium', 'currentLocation', and 'destination' are required."));
                return;
            }
            if (data.groupSize !== undefined && (typeof data.groupSize !== 'number' || data.groupSize < 1)) {
                res.status(400).json((0, response_1.sendResponse)(req, false, null, "'groupSize' must be a positive number."));
                return;
            }
            // Defaults
            data.groupSize = data.groupSize ?? 1;
            data.wheelchair = data.wheelchair ?? false;
            data.avoidCrowd = data.avoidCrowd ?? false;
            data.language = data.language ?? 'English';
            data.userRole = data.userRole ?? 'Fan';
            const userId = req.ip || 'anonymous-transport-user';
            logger_1.aiLogger.info(`Transport request: ${data.currentLocation} → ${data.destination} | Role: ${data.userRole} | Group: ${data.groupSize}`);
            const result = await transport_service_1.TransportService.recommend(data, userId);
            const responseTime = Date.now() - startTime;
            logger_1.aiLogger.info(`Transport response generated in ${responseTime}ms`);
            res.status(200).json((0, response_1.sendResponse)(req, true, result, 'Transport recommendation generated successfully.'));
        }
        catch (error) {
            next(error);
        }
    }
}
exports.TransportController = TransportController;
//# sourceMappingURL=transport.controller.js.map