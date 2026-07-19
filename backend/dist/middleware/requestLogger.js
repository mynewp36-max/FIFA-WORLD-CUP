"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = void 0;
const crypto_1 = __importDefault(require("crypto"));
const logger_1 = require("../ai/utils/logger");
const requestLogger = (req, res, next) => {
    const start = Date.now();
    const timestamp = new Date().toISOString();
    req.requestId = crypto_1.default.randomUUID();
    // We hook into the 'finish' event of the response to log after processing is complete
    res.on('finish', () => {
        const executionTime = Date.now() - start;
        const statusCode = res.statusCode;
        // Structured logging
        logger_1.aiLogger.info('HTTP Request', {
            requestId: req.requestId,
            timestamp,
            method: req.method,
            url: req.originalUrl,
            statusCode,
            executionTime,
        });
    });
    next();
};
exports.requestLogger = requestLogger;
//# sourceMappingURL=requestLogger.js.map