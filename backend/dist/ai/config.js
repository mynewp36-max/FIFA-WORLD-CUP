"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGenerationConfig = exports.AI_CONFIG = void 0;
const env_1 = require("../config/env");
/**
 * Centralized AI configuration.
 * Environment variables are sourced from the validated `env` module
 * (already validated via Zod at server startup) — no redundant dotenv
 * calls needed here.
 */
exports.AI_CONFIG = {
    OPENROUTER_API_KEY: env_1.env.OPENROUTER_API_KEY,
    DEFAULT_MODEL: process.env.OPENROUTER_MODEL || 'google/gemini-2.5-flash',
    MAX_TOKENS: 4096,
    TEMPERATURE: 0.7,
};
const getGenerationConfig = (overrides = {}) => {
    return {
        model: exports.AI_CONFIG.DEFAULT_MODEL,
        config: {
            maxOutputTokens: exports.AI_CONFIG.MAX_TOKENS,
            temperature: exports.AI_CONFIG.TEMPERATURE,
            ...overrides,
        },
    };
};
exports.getGenerationConfig = getGenerationConfig;
//# sourceMappingURL=config.js.map