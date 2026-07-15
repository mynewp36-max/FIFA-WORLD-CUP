"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = exports.errorHandler = void 0;
const logger_1 = require("../ai/utils/logger");
const response_1 = require("../utils/response");
const errors_1 = require("../utils/errors");
const errorHandler = (err, req, res, _next) => {
    // Determine if it's an operational error we threw intentionally
    const isOperational = err instanceof errors_1.AppError;
    const statusCode = isOperational ? err.statusCode : 500;
    // Safe message to send to the client (never expose stack trace for 500s)
    const message = isOperational
        ? err.message
        : 'An unexpected internal server error occurred.';
    // Log the internal error safely
    if (!isOperational || statusCode >= 500) {
        logger_1.aiLogger.error(`[Unhandled Exception] ${req.method} ${req.url} - RequestID: ${req.requestId}`, err);
    }
    else {
        // Optionally log client errors (4xx) as warnings instead of errors
        logger_1.aiLogger.warn(`[Client Error ${statusCode}] ${req.method} ${req.url} - RequestID: ${req.requestId} - ${message}`);
    }
    // Return formatted JSON response
    res.status(statusCode).json((0, response_1.sendResponse)(req, false, null, message));
};
exports.errorHandler = errorHandler;
const notFoundHandler = (_req, _res, next) => {
    // Pass a structured NotFoundError to the central error handler
    next(new errors_1.NotFoundError('Route not found'));
};
exports.notFoundHandler = notFoundHandler;
//# sourceMappingURL=errorHandler.js.map