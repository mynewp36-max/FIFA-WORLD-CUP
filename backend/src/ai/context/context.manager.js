"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contextManager = void 0;
const logger_1 = require("../utils/logger");
class ContextManager {
    // In-memory store keyed by userId or sessionId
    contexts;
    MAX_HISTORY = 10;
    constructor() {
        this.contexts = new Map();
    }
    getContext(userId) {
        let context = this.contexts.get(userId);
        const now = new Date().toISOString();
        if (!context) {
            // Return default anonymous context if not found
            context = {
                userId,
                role: 'guest',
                preferredLanguage: 'en',
                stadium: 'Unknown',
                accessibilityPreferences: [],
                history: [],
                metadata: {
                    startedAt: now,
                    lastActive: now,
                }
            };
            this.contexts.set(userId, context);
            logger_1.aiLogger.debug(`Created default context for ${userId}`);
        }
        else {
            context.metadata.lastActive = now;
        }
        return context;
    }
    updateContext(userId, updates) {
        const existing = this.getContext(userId);
        const now = new Date().toISOString();
        this.contexts.set(userId, {
            ...existing,
            ...updates,
            metadata: {
                ...existing.metadata,
                ...(updates.metadata || {}),
                lastActive: now
            }
        });
        logger_1.aiLogger.debug(`Updated context for ${userId}`);
    }
    addInteraction(userId, interaction) {
        const context = this.getContext(userId);
        context.history.push({
            ...interaction,
            timestamp: new Date().toISOString()
        });
        // Automatic trimming to last 10 interactions
        if (context.history.length > this.MAX_HISTORY) {
            context.history = context.history.slice(-this.MAX_HISTORY);
        }
        context.metadata.lastActive = new Date().toISOString();
        this.contexts.set(userId, context);
        logger_1.aiLogger.debug(`Added interaction to history for ${userId}. History size: ${context.history.length}`);
    }
}
exports.contextManager = new ContextManager();
//# sourceMappingURL=context.manager.js.map