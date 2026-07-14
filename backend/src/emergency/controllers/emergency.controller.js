"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmergencyController = void 0;
const emergency_service_1 = require("../services/emergency.service");
const logger_1 = require("../../ai/utils/logger");
const response_1 = require("../../utils/response");
const VALID_INCIDENT_TYPES = [
    'Medical Assistance', 'Lost Child', 'Lost Property', 'Crowd Congestion',
    'Blocked Exit', 'Accessibility Assistance', 'Suspicious Activity', 'General Help Request',
];
class EmergencyController {
    static async assist(req, res, next) {
        const startTime = Date.now();
        try {
            const data = req.body;
            // Validation
            if (!data.incidentType || !VALID_INCIDENT_TYPES.includes(data.incidentType)) {
                res.status(400).json((0, response_1.sendResponse)(req, false, null, `'incidentType' must be one of: ${VALID_INCIDENT_TYPES.join(', ')}.`));
                return;
            }
            if (!data.stadium || !data.location) {
                res.status(400).json((0, response_1.sendResponse)(req, false, null, "'stadium' and 'location' are required."));
                return;
            }
            // Defaults
            data.language = data.language ?? 'English';
            data.userRole = data.userRole ?? 'Fan';
            const userId = req.ip || 'anonymous-emergency-user';
            logger_1.aiLogger.info(`Emergency request received: [${data.incidentType}] at ${data.location} — ${data.stadium}`);
            const result = await emergency_service_1.EmergencyService.assist(data, userId);
            const responseTime = Date.now() - startTime;
            logger_1.aiLogger.info(`Emergency response generated in ${responseTime}ms | Priority: ${result.priority}`);
            res.status(200).json((0, response_1.sendResponse)(req, true, result, 'Emergency guidance generated successfully.'));
        }
        catch (error) {
            next(error);
        }
    }
}
exports.EmergencyController = EmergencyController;
//# sourceMappingURL=emergency.controller.js.map