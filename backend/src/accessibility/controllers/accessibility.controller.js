"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessibilityController = void 0;
const accessibility_service_1 = require("../services/accessibility.service");
const logger_1 = require("../../ai/utils/logger");
const response_1 = require("../../utils/response");
class AccessibilityController {
    static async assist(req, res, next) {
        const startTime = Date.now();
        try {
            const data = req.body;
            // Validation
            if (!data.stadium || !data.destination) {
                res.status(400).json((0, response_1.sendResponse)(req, false, null, "'stadium' and 'destination' are required."));
                return;
            }
            if (!Array.isArray(data.accessibilityNeeds) || data.accessibilityNeeds.length === 0) {
                res.status(400).json((0, response_1.sendResponse)(req, false, null, "'accessibilityNeeds' must be a non-empty array."));
                return;
            }
            const userId = req.ip || 'anonymous-accessibility-user';
            logger_1.aiLogger.info(`Accessibility request for needs: ${data.accessibilityNeeds.join(', ')} → ${data.destination}`);
            const result = await accessibility_service_1.AccessibilityService.assist(data, userId);
            const responseTime = Date.now() - startTime;
            logger_1.aiLogger.info(`Accessibility response generated in ${responseTime}ms`);
            res.status(200).json((0, response_1.sendResponse)(req, true, result, 'Accessibility guidance generated successfully.'));
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AccessibilityController = AccessibilityController;
//# sourceMappingURL=accessibility.controller.js.map