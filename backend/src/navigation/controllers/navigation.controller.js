"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavigationController = void 0;
const navigation_service_1 = require("../services/navigation.service");
const logger_1 = require("../../ai/utils/logger");
const response_1 = require("../../utils/response");
class NavigationController {
    static async getRoute(req, res, next) {
        const startTime = Date.now();
        try {
            const data = req.body;
            if (!data.currentLocation || !data.destination || !data.stadium) {
                res.status(400).json((0, response_1.sendResponse)(req, false, null, 'currentLocation, destination, and stadium are required.'));
                return;
            }
            const userId = req.ip || 'anonymous-navigator';
            logger_1.aiLogger.info(`Navigation request from ${data.currentLocation} to ${data.destination}`);
            const routeResponse = await navigation_service_1.NavigationService.getRoute(data, userId);
            const responseTime = Date.now() - startTime;
            logger_1.aiLogger.info(`Navigation generated in ${responseTime}ms`);
            res.status(200).json((0, response_1.sendResponse)(req, true, routeResponse, 'Route calculated successfully.'));
        }
        catch (error) {
            next(error);
        }
    }
}
exports.NavigationController = NavigationController;
//# sourceMappingURL=navigation.controller.js.map