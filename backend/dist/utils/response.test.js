"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const response_1 = require("./response");
(0, vitest_1.describe)('sendResponse', () => {
    (0, vitest_1.it)('should format a successful response correctly', () => {
        const mockReq = { method: 'GET', originalUrl: '/api/test' };
        const data = { id: 1, name: 'test' };
        const response = (0, response_1.sendResponse)(mockReq, true, data, 'Success');
        (0, vitest_1.expect)(response.success).toBe(true);
        (0, vitest_1.expect)(response.message).toBe('Success');
        (0, vitest_1.expect)(response.data).toEqual(data);
        (0, vitest_1.expect)(response.requestId).toBeDefined();
        (0, vitest_1.expect)(response.timestamp).toBeDefined();
    });
    (0, vitest_1.it)('should format an error response correctly', () => {
        const mockReq = { method: 'POST', originalUrl: '/api/error' };
        const response = (0, response_1.sendResponse)(mockReq, false, null, 'Error occurred');
        (0, vitest_1.expect)(response.success).toBe(false);
        (0, vitest_1.expect)(response.message).toBe('Error occurred');
        (0, vitest_1.expect)(response.data).toBeNull();
        (0, vitest_1.expect)(response.requestId).toBeDefined();
    });
});
//# sourceMappingURL=response.test.js.map