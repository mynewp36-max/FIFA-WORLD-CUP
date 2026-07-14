"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.aiCache = void 0;
const logger_1 = require("./logger");
const crypto_1 = __importDefault(require("crypto"));
class InMemoryCache {
    cache = new Map();
    /**
     * Generates a deterministic hash key from an object or string.
     */
    generateKey(prefix, payload) {
        const data = typeof payload === 'string' ? payload : JSON.stringify(payload);
        const hash = crypto_1.default.createHash('sha256').update(data).digest('hex');
        return `${prefix}:${hash}`;
    }
    get(key) {
        const entry = this.cache.get(key);
        if (!entry)
            return null;
        if (Date.now() > entry.expiresAt) {
            this.cache.delete(key);
            logger_1.aiLogger.debug(`[Cache Miss] Expired key: ${key}`);
            return null;
        }
        logger_1.aiLogger.debug(`[Cache Hit] Key: ${key}`);
        return entry.value;
    }
    set(key, value, ttlMs) {
        const expiresAt = Date.now() + ttlMs;
        this.cache.set(key, { value, expiresAt });
        logger_1.aiLogger.debug(`[Cache Set] Key: ${key} (TTL: ${ttlMs}ms)`);
        // Proactively clean up expired keys periodically to prevent memory leaks
        this.cleanup();
    }
    cleanup() {
        const now = Date.now();
        for (const [key, entry] of this.cache.entries()) {
            if (now > entry.expiresAt) {
                this.cache.delete(key);
            }
        }
    }
    clear() {
        this.cache.clear();
    }
}
exports.aiCache = new InMemoryCache();
//# sourceMappingURL=cache.js.map