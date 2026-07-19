"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withTimeout = void 0;
const errors_1 = require("../../utils/errors");
const logger_1 = require("./logger");
/**
 * Reusable utility to enforce a strict maximum execution time on any asynchronous operation.
 * If the operation exceeds the timeoutMs, it forcefully throws a TimeoutError, terminating
 * the wait and returning a graceful failure to the client.
 */
const withTimeout = async (operation, timeoutMs, context = 'Operation') => {
    let timer;
    const timeoutPromise = new Promise((_, reject) => {
        timer = setTimeout(() => {
            logger_1.aiLogger.warn(`[Timeout Enforced] ${context} exceeded the maximum allowed time of ${timeoutMs}ms.`);
            reject(new errors_1.TimeoutError(`The AI response took too long to generate (Max ${timeoutMs / 1000}s). Please try asking again.`));
        }, timeoutMs);
    });
    try {
        // Race the actual operation against the ticking timeout clock
        return await Promise.race([operation(), timeoutPromise]);
    }
    finally {
        // Always clean up the timeout if the operation succeeds quickly enough
        clearTimeout(timer);
    }
};
exports.withTimeout = withTimeout;
//# sourceMappingURL=timeout.js.map