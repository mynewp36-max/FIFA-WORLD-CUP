"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aiLogger = void 0;
class StructuredLogger {
    log(level, message, meta, err) {
        const payload = {
            timestamp: new Date().toISOString(),
            level,
            message,
        };
        if (meta) {
            // Extract specific top-level properties if they exist, otherwise keep them in metadata
            // Shallow copy to avoid mutating the original object
            const metaCopy = typeof meta === 'object' && meta !== null ? { ...meta } : { raw: meta };
            if (metaCopy.requestId) {
                payload.requestId = metaCopy.requestId;
                delete metaCopy.requestId;
            }
            if (metaCopy.executionTime !== undefined) {
                payload.executionTime = metaCopy.executionTime;
                delete metaCopy.executionTime;
            }
            if (Object.keys(metaCopy).length > 0) {
                payload.metadata = metaCopy;
            }
        }
        if (err) {
            if (err instanceof Error) {
                payload.error = err.message;
                if (err.stack) {
                    payload.stack = err.stack;
                }
            }
            else {
                payload.error = String(err);
            }
        }
        // Output strict JSON
        const logString = JSON.stringify(payload);
        if (level === 'ERROR') {
            console.error(logString);
        }
        else if (level === 'WARN') {
            console.warn(logString);
        }
        else {
            console.log(logString);
        }
    }
    info(message, meta) {
        this.log('INFO', message, meta);
    }
    debug(message, meta) {
        if (process.env.NODE_ENV !== 'production') {
            this.log('DEBUG', message, meta);
        }
    }
    warn(message, meta) {
        this.log('WARN', message, meta);
    }
    error(message, errorOrMeta) {
        // Keep API backward compatible: aiLogger.error('msg', err) or aiLogger.error('msg', meta)
        if (errorOrMeta instanceof Error) {
            this.log('ERROR', message, undefined, errorOrMeta);
        }
        else {
            this.log('ERROR', message, errorOrMeta);
        }
    }
}
exports.aiLogger = new StructuredLogger();
//# sourceMappingURL=logger.js.map