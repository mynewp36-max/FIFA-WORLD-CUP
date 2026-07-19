"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const errors_1 = require("./errors");
(0, vitest_1.describe)('App Errors', () => {
    (0, vitest_1.it)('ValidationError has correct status and message', () => {
        const error = new errors_1.ValidationError();
        (0, vitest_1.expect)(error.statusCode).toBe(400);
        (0, vitest_1.expect)(error.message).toBe('Validation failed.');
    });
    (0, vitest_1.it)('UnauthorizedError has correct status and message', () => {
        const error = new errors_1.UnauthorizedError();
        (0, vitest_1.expect)(error.statusCode).toBe(401);
        (0, vitest_1.expect)(error.message).toBe('Unauthorized.');
    });
    (0, vitest_1.it)('ForbiddenError has correct status and message', () => {
        const error = new errors_1.ForbiddenError();
        (0, vitest_1.expect)(error.statusCode).toBe(403);
        (0, vitest_1.expect)(error.message).toBe('Forbidden.');
    });
    (0, vitest_1.it)('NotFoundError has correct status and message', () => {
        const error = new errors_1.NotFoundError();
        (0, vitest_1.expect)(error.statusCode).toBe(404);
        (0, vitest_1.expect)(error.message).toBe('Resource not found.');
    });
    (0, vitest_1.it)('ConflictError has correct status and message', () => {
        const error = new errors_1.ConflictError();
        (0, vitest_1.expect)(error.statusCode).toBe(409);
        (0, vitest_1.expect)(error.message).toBe('Resource conflict.');
    });
    (0, vitest_1.it)('RateLimitError has correct status and message', () => {
        const error = new errors_1.RateLimitError();
        (0, vitest_1.expect)(error.statusCode).toBe(429);
        (0, vitest_1.expect)(error.message).toBe('Too many requests.');
    });
    (0, vitest_1.it)('InternalError has correct status and message', () => {
        const error = new errors_1.InternalError();
        (0, vitest_1.expect)(error.statusCode).toBe(500);
        (0, vitest_1.expect)(error.message).toBe('An internal server error occurred.');
    });
    (0, vitest_1.it)('TimeoutError has correct status and message', () => {
        const error = new errors_1.TimeoutError();
        (0, vitest_1.expect)(error.statusCode).toBe(408);
        (0, vitest_1.expect)(error.message).toBe('Request timed out.');
    });
    (0, vitest_1.it)('Custom messages override default messages', () => {
        const error = new errors_1.ValidationError('Custom validation error');
        (0, vitest_1.expect)(error.message).toBe('Custom validation error');
    });
});
//# sourceMappingURL=errors.test.js.map