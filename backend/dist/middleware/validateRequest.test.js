"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const validateRequest_1 = require("./validateRequest");
const zod_1 = require("zod");
// Factory to create a mock Request
const mockReq = (body = {}) => ({
    body,
    method: 'POST',
    originalUrl: '/api/test',
    requestId: 'test-id',
});
// Factory to create a mock Response
const mockRes = () => {
    const res = {};
    res.status = vitest_1.vi.fn().mockReturnValue(res);
    res.json = vitest_1.vi.fn().mockReturnValue(res);
    return res;
};
(0, vitest_1.describe)('validateRequest middleware', () => {
    const schema = zod_1.z.object({
        name: zod_1.z.string().min(1),
        age: zod_1.z.number().optional(),
    });
    const middleware = (0, validateRequest_1.validateRequest)(schema);
    let next;
    (0, vitest_1.beforeEach)(() => {
        next = vitest_1.vi.fn();
    });
    (0, vitest_1.afterEach)(() => {
        vitest_1.vi.clearAllMocks();
    });
    (0, vitest_1.it)('calls next() when the body is valid', async () => {
        const req = mockReq({ name: 'John' });
        const res = mockRes();
        await middleware(req, res, next);
        (0, vitest_1.expect)(next).toHaveBeenCalledTimes(1);
        (0, vitest_1.expect)(next).toHaveBeenCalledWith(); // no error argument
    });
    (0, vitest_1.it)('strips extra fields not in the schema', async () => {
        const req = mockReq({ name: 'John', extraField: 'hack' });
        const res = mockRes();
        await middleware(req, res, next);
        (0, vitest_1.expect)(req.body).toEqual({ name: 'John' });
        (0, vitest_1.expect)(req.body.extraField).toBeUndefined();
    });
    (0, vitest_1.it)('returns 400 when a required field is missing', async () => {
        const req = mockReq({});
        const res = mockRes();
        await middleware(req, res, next);
        (0, vitest_1.expect)(res.status).toHaveBeenCalledWith(400);
        (0, vitest_1.expect)(res.json).toHaveBeenCalledTimes(1);
        (0, vitest_1.expect)(next).not.toHaveBeenCalled();
    });
    (0, vitest_1.it)('returns a descriptive validation error message', async () => {
        const req = mockReq({});
        const res = mockRes();
        await middleware(req, res, next);
        const jsonCall = res.json.mock.calls[0][0];
        (0, vitest_1.expect)(jsonCall.success).toBe(false);
        (0, vitest_1.expect)(jsonCall.message).toContain('Validation failed');
        (0, vitest_1.expect)(jsonCall.message).toContain('name');
    });
    (0, vitest_1.it)('returns 400 when a field has the wrong type', async () => {
        const req = mockReq({ name: 'John', age: 'not-a-number' });
        const res = mockRes();
        await middleware(req, res, next);
        (0, vitest_1.expect)(res.status).toHaveBeenCalledWith(400);
        const jsonCall = res.json.mock.calls[0][0];
        (0, vitest_1.expect)(jsonCall.message).toContain('age');
    });
    (0, vitest_1.it)('calls next(error) for non-Zod errors', async () => {
        const badSchema = {
            parseAsync: vitest_1.vi.fn().mockRejectedValue(new Error('Some unexpected error')),
        };
        const badMiddleware = (0, validateRequest_1.validateRequest)(badSchema);
        const req = mockReq({ name: 'John' });
        const res = mockRes();
        await badMiddleware(req, res, next);
        (0, vitest_1.expect)(next).toHaveBeenCalledWith(vitest_1.expect.any(Error));
        (0, vitest_1.expect)(res.status).not.toHaveBeenCalled();
    });
});
//# sourceMappingURL=validateRequest.test.js.map