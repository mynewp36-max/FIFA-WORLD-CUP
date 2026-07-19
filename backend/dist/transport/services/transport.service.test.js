"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const transport_service_1 = require("./transport.service");
const ai_service_1 = require("../../ai/services/ai.service");
(0, vitest_1.describe)('TransportService', () => {
    (0, vitest_1.beforeEach)(() => {
        vitest_1.vi.spyOn(ai_service_1.AiService, 'generateStructuredResponse').mockResolvedValue({
            summary: 'Mocked summary route',
            recommendedTransport: 'Bus',
            alternativeOptions: ['Metro'],
            departureStrategy: 'Leave now',
            estimatedTravelTime: '15 min',
            crowdImpact: 'Low',
            priority: 'Low',
            travelTips: ['Tip 1'],
        });
    });
    (0, vitest_1.afterEach)(() => {
        vitest_1.vi.restoreAllMocks();
    });
    const validRequest = {
        stadium: 'MetLife',
        currentLocation: 'Lot G',
        destination: 'Times Square',
        language: 'English',
        userRole: 'Fan',
        wheelchair: false,
        avoidCrowd: false,
        groupSize: 2,
    };
    (0, vitest_1.it)('recommend returns parsed transport recommendations successfully', async () => {
        const result = await transport_service_1.TransportService.recommend(validRequest, 'user-1');
        (0, vitest_1.expect)(result.recommendedTransport).toBe('Bus');
        (0, vitest_1.expect)(result.alternativeOptions).toEqual(['Metro']);
        (0, vitest_1.expect)(ai_service_1.AiService.generateStructuredResponse).toHaveBeenCalledTimes(1);
    });
    (0, vitest_1.it)('recommend throws an error when AI returns null or empty response', async () => {
        vitest_1.vi.spyOn(ai_service_1.AiService, 'generateStructuredResponse').mockResolvedValueOnce(null);
        await (0, vitest_1.expect)(transport_service_1.TransportService.recommend(validRequest, 'user-2')).rejects.toThrow('AI returned empty transport response.');
    });
    (0, vitest_1.it)('recommend propagates errors thrown by AiService', async () => {
        vitest_1.vi.spyOn(ai_service_1.AiService, 'generateStructuredResponse').mockRejectedValueOnce(new Error('AI failed'));
        await (0, vitest_1.expect)(transport_service_1.TransportService.recommend(validRequest, 'user-3')).rejects.toThrow('AI failed');
    });
});
//# sourceMappingURL=transport.service.test.js.map