"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const transport_controller_1 = require("./transport.controller");
const transport_service_1 = require("../services/transport.service");
const mockReq = (body = {}) => ({
    body,
    ip: '127.0.0.1',
    method: 'POST',
    originalUrl: '/api/transport/recommend',
    requestId: 'req-transport-123',
});
const mockRes = () => {
    const res = {};
    res.status = vitest_1.vi.fn().mockReturnValue(res);
    res.json = vitest_1.vi.fn().mockReturnValue(res);
    return res;
};
(0, vitest_1.describe)('TransportController', () => {
    let next;
    (0, vitest_1.beforeEach)(() => {
        next = vitest_1.vi.fn();
        vitest_1.vi.spyOn(transport_service_1.TransportService, 'recommend').mockResolvedValue({
            summary: 'Success transport strategy',
            recommendedTransport: 'Walk',
            alternativeOptions: ['Metro'],
            departureStrategy: 'Strategy',
            estimatedTravelTime: '10 min',
            crowdImpact: 'Low',
            priority: 'Low',
            travelTips: [],
        });
    });
    (0, vitest_1.afterEach)(() => {
        vitest_1.vi.restoreAllMocks();
    });
    (0, vitest_1.it)('recommend returns 200 with transport suggestions when inputs are valid', async () => {
        const req = mockReq({
            stadium: 'MetLife Stadium',
            currentLocation: 'Section A',
            destination: 'Hotel',
            groupSize: 2,
        });
        const res = mockRes();
        await transport_controller_1.TransportController.recommend(req, res, next);
        (0, vitest_1.expect)(transport_service_1.TransportService.recommend).toHaveBeenCalledWith({
            stadium: 'MetLife Stadium',
            currentLocation: 'Section A',
            destination: 'Hotel',
            groupSize: 2,
            wheelchair: false,
            avoidCrowd: false,
            language: 'English',
            userRole: 'Fan',
        }, '127.0.0.1');
        (0, vitest_1.expect)(res.status).toHaveBeenCalledWith(200);
        const jsonCall = res.json.mock.calls[0][0];
        (0, vitest_1.expect)(jsonCall.success).toBe(true);
        (0, vitest_1.expect)(jsonCall.data.recommendedTransport).toBe('Walk');
        (0, vitest_1.expect)(next).not.toHaveBeenCalled();
    });
    (0, vitest_1.it)('recommend returns 400 when stadium, currentLocation or destination is missing', async () => {
        const req = mockReq({
            stadium: 'MetLife Stadium',
            // currentLocation missing
            destination: 'Hotel',
        });
        const res = mockRes();
        await transport_controller_1.TransportController.recommend(req, res, next);
        (0, vitest_1.expect)(res.status).toHaveBeenCalledWith(400);
        const jsonCall = res.json.mock.calls[0][0];
        (0, vitest_1.expect)(jsonCall.success).toBe(false);
        (0, vitest_1.expect)(jsonCall.message).toContain('required');
        (0, vitest_1.expect)(transport_service_1.TransportService.recommend).not.toHaveBeenCalled();
    });
    (0, vitest_1.it)('recommend returns 400 when groupSize is invalid (less than 1)', async () => {
        const req = mockReq({
            stadium: 'MetLife Stadium',
            currentLocation: 'Gate 1',
            destination: 'Station',
            groupSize: 0,
        });
        const res = mockRes();
        await transport_controller_1.TransportController.recommend(req, res, next);
        (0, vitest_1.expect)(res.status).toHaveBeenCalledWith(400);
        const jsonCall = res.json.mock.calls[0][0];
        (0, vitest_1.expect)(jsonCall.success).toBe(false);
        (0, vitest_1.expect)(jsonCall.message).toContain('positive number');
    });
    (0, vitest_1.it)('recommend forwards errors to next() on service error', async () => {
        const req = mockReq({
            stadium: 'MetLife Stadium',
            currentLocation: 'Gate 1',
            destination: 'Station',
        });
        const res = mockRes();
        const serviceError = new Error('Service down');
        vitest_1.vi.spyOn(transport_service_1.TransportService, 'recommend').mockRejectedValueOnce(serviceError);
        await transport_controller_1.TransportController.recommend(req, res, next);
        (0, vitest_1.expect)(next).toHaveBeenCalledWith(serviceError);
    });
});
//# sourceMappingURL=transport.controller.test.js.map