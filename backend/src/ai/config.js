"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGenerationConfig = exports.AI_CONFIG = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.AI_CONFIG = {
    OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY || '',
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
            ...overrides
        }
    };
};
exports.getGenerationConfig = getGenerationConfig;
//# sourceMappingURL=config.js.map