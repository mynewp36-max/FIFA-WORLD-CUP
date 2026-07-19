"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const ai_controller_1 = require("./ai.controller");
const ai_service_1 = require("../ai/services/ai.service");
const context_manager_1 = require("../ai/context/context.manager");
const mockReq = (body = {}) => ({
    body,
    ip: '127.0.0.1',
    method: 'POST',
    originalUrl: '/api/ai/chat',
    requestId: 'req-id-123',
});
const mockRes = () => {
    const res = {};
    res.status = vitest_1.vi.fn().mockReturnValue(res);
    res.json = vitest_1.vi.fn().mockReturnValue(res);
    return res;
};
(0, vitest_1.describe)('AiController', () => {
    let next;
    (0, vitest_1.beforeEach)(() => {
        next = vitest_1.vi.fn();
        vitest_1.vi.spyOn(ai_service_1.AiService, 'generateResponse').mockResolvedValue('AI response message');
        vitest_1.vi.spyOn(context_manager_1.contextManager, 'updateContext').mockImplementation(() => { });
    });
    (0, vitest_1.afterEach)(() => {
        vitest_1.vi.restoreAllMocks();
    });
    (0, vitest_1.it)('handleChat successfully generates response, updates context and returns 200', async () => {
        const req = mockReq({
            message: 'Hello AI',
            language: 'Spanish',
            userRole: 'Organizer',
            stadium: 'Stadium A',
            match: 'Match 1',
            accessibility: true,
        });
        const res = mockRes();
        await ai_controller_1.AiController.handleChat(req, res, next);
        (0, vitest_1.expect)(context_manager_1.contextManager.updateContext).toHaveBeenCalledWith('127.0.0.1', {
            role: 'organizer',
            preferredLanguage: 'Spanish',
            stadium: 'Stadium A',
            match: 'Match 1',
            accessibilityPreferences: ['Assistance required'],
        });
        (0, vitest_1.expect)(ai_service_1.AiService.generateResponse).toHaveBeenCalledWith('127.0.0.1', 'Hello AI');
        (0, vitest_1.expect)(res.status).toHaveBeenCalledWith(200);
        const jsonCall = res.json.mock.calls[0][0];
        (0, vitest_1.expect)(jsonCall.success).toBe(true);
        (0, vitest_1.expect)(jsonCall.data).toEqual({
            reply: 'AI response message',
            language: 'Spanish',
        });
        (0, vitest_1.expect)(next).not.toHaveBeenCalled();
    });
    (0, vitest_1.it)('handleChat handles optional fields gracefully when accessibility is false', async () => {
        const req = mockReq({
            message: 'Hello AI',
            accessibility: false,
        });
        const res = mockRes();
        await ai_controller_1.AiController.handleChat(req, res, next);
        (0, vitest_1.expect)(context_manager_1.contextManager.updateContext).toHaveBeenCalledWith('127.0.0.1', {
            accessibilityPreferences: [],
        });
        (0, vitest_1.expect)(res.status).toHaveBeenCalledWith(200);
    });
    (0, vitest_1.it)('handleChat forwards errors to next() on service failure', async () => {
        const req = mockReq({ message: 'Hello AI' });
        const res = mockRes();
        const serviceError = new Error('Service Failure');
        vitest_1.vi.spyOn(ai_service_1.AiService, 'generateResponse').mockRejectedValueOnce(serviceError);
        await ai_controller_1.AiController.handleChat(req, res, next);
        (0, vitest_1.expect)(next).toHaveBeenCalledWith(serviceError);
        (0, vitest_1.expect)(res.status).not.toHaveBeenCalled();
    });
});
//# sourceMappingURL=ai.controller.test.js.map