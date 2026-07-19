"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeoutError = exports.InternalError = exports.RateLimitError = exports.ConflictError = exports.NotFoundError = exports.ForbiddenError = exports.UnauthorizedError = exports.ValidationError = exports.AppError = void 0;
class AppError extends Error {
    statusCode;
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
class ValidationError extends AppError {
    constructor(message = 'Validation failed.') {
        super(message, 400);
    }
}
exports.ValidationError = ValidationError;
class UnauthorizedError extends AppError {
    constructor(message = 'Unauthorized.') {
        super(message, 401);
    }
}
exports.UnauthorizedError = UnauthorizedError;
class ForbiddenError extends AppError {
    constructor(message = 'Forbidden.') {
        super(message, 403);
    }
}
exports.ForbiddenError = ForbiddenError;
class NotFoundError extends AppError {
    constructor(message = 'Resource not found.') {
        super(message, 404);
    }
}
exports.NotFoundError = NotFoundError;
class ConflictError extends AppError {
    constructor(message = 'Resource conflict.') {
        super(message, 409);
    }
}
exports.ConflictError = ConflictError;
class RateLimitError extends AppError {
    constructor(message = 'Too many requests.') {
        super(message, 429);
    }
}
exports.RateLimitError = RateLimitError;
class InternalError extends AppError {
    constructor(message = 'An internal server error occurred.') {
        super(message, 500);
    }
}
exports.InternalError = InternalError;
class TimeoutError extends AppError {
    constructor(message = 'Request timed out.') {
        super(message, 408);
    }
}
exports.TimeoutError = TimeoutError;
//# sourceMappingURL=errors.js.map