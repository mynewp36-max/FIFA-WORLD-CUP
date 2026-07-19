"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const errorHandler_1 = require("./errorHandler");
const errors_1 = require("../utils/errors");
const mockReq = () => ({
    method: 'GET',
    url: '/api/test',
    originalUrl: '/api/test',
    requestId: 'test-req-id',
});
const mockRes = () => {
    const res = {};
    res.status = vitest_1.vi.fn().mockReturnValue(res);
    res.json = vitest_1.vi.fn().mockReturnValue(res);
    return res;
};
(0, vitest_1.describe)('errorHandler middleware', () => {
    let next;
    (0, vitest_1.beforeEach)(() => {
        next = vitest_1.vi.fn();
        vitest_1.vi.spyOn(console, 'error').mockImplementation(() => { });
        vitest_1.vi.spyOn(console, 'warn').mockImplementation(() => { });
        vitest_1.vi.spyOn(console, 'log').mockImplementation(() => { });
    });
    (0, vitest_1.it)('returns 400 for ValidationError with the correct message', () => {
        const req = mockReq();
        const res = mockRes();
        const err = new errors_1.ValidationError('Bad payload');
        (0, errorHandler_1.errorHandler)(err, req, res, next);
        (0, vitest_1.expect)(res.status).toHaveBeenCalledWith(400);
        const payload = res.json.mock.calls[0][0];
        (0, vitest_1.expect)(payload.success).toBe(false);
        (0, vitest_1.expect)(payload.message).toBe('Bad payload');
    });
    (0, vitest_1.it)('returns 404 for NotFoundError', () => {
        const req = mockReq();
        const res = mockRes();
        const err = new errors_1.NotFoundError('Route missing');
        (0, errorHandler_1.errorHandler)(err, req, res, next);
        (0, vitest_1.expect)(res.status).toHaveBeenCalledWith(404);
        const payload = res.json.mock.calls[0][0];
        (0, vitest_1.expect)(payload.message).toBe('Route missing');
    });
    (0, vitest_1.it)('returns 500 for InternalError', () => {
        const req = mockReq();
        const res = mockRes();
        const err = new errors_1.InternalError('DB connection lost');
        (0, errorHandler_1.errorHandler)(err, req, res, next);
        (0, vitest_1.expect)(res.status).toHaveBeenCalledWith(500);
        const payload = res.json.mock.calls[0][0];
        (0, vitest_1.expect)(payload.success).toBe(false);
        (0, vitest_1.expect)(payload.message).toBe('DB connection lost');
    });
    (0, vitest_1.it)('masks unknown errors with a generic 500 response', () => {
        const req = mockReq();
        const res = mockRes();
        const err = new Error('Unhandled crash with secrets');
        (0, errorHandler_1.errorHandler)(err, req, res, next);
        (0, vitest_1.expect)(res.status).toHaveBeenCalledWith(500);
        const payload = res.json.mock.calls[0][0];
        (0, vitest_1.expect)(payload.message).toBe('An unexpected internal server error occurred.');
        (0, vitest_1.expect)(payload.message).not.toContain('secrets');
        (0, vitest_1.expect)(payload.success).toBe(false);
    });
    (0, vitest_1.it)('includes requestId and timestamp in all responses', () => {
        const req = mockReq();
        const res = mockRes();
        (0, errorHandler_1.errorHandler)(new errors_1.ValidationError(), req, res, next);
        const payload = res.json.mock.calls[0][0];
        (0, vitest_1.expect)(payload.requestId).toBeDefined();
        (0, vitest_1.expect)(payload.timestamp).toBeDefined();
    });
});
(0, vitest_1.describe)('notFoundHandler middleware', () => {
    (0, vitest_1.it)('calls next() with an error carrying statusCode 404', () => {
        const next = vitest_1.vi.fn();
        const req = mockReq();
        const res = mockRes();
        (0, errorHandler_1.notFoundHandler)(req, res, next);
        (0, vitest_1.expect)(next).toHaveBeenCalledTimes(1);
        const calledError = next.mock.calls[0]?.[0];
        (0, vitest_1.expect)(calledError.statusCode).toBe(404);
        (0, vitest_1.expect)(calledError.message).toContain('not found');
    });
});
//# sourceMappingURL=errorHandler.test.js.map