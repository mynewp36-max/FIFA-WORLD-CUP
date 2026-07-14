"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOpenRouterClient = exports.OpenRouterClient = void 0;
const config_1 = require("../config");
const logger_1 = require("../utils/logger");
class OpenRouterClient {
    static instance;
    baseUrl = 'https://openrouter.ai/api/v1';
    constructor() {
        if (!config_1.AI_CONFIG.OPENROUTER_API_KEY) {
            logger_1.aiLogger.error('Initialization Failed', new Error('OPENROUTER_API_KEY is not defined in the environment.'));
        }
        logger_1.aiLogger.info('OpenRouter Client initialized.');
    }
    static getInstance() {
        if (!OpenRouterClient.instance) {
            OpenRouterClient.instance = new OpenRouterClient();
        }
        return OpenRouterClient.instance;
    }
    getHeaders() {
        return {
            'Authorization': `Bearer ${config_1.AI_CONFIG.OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json'
        };
    }
    getEndpoint() {
        return `${this.baseUrl}/chat/completions`;
    }
}
exports.OpenRouterClient = OpenRouterClient;
const getOpenRouterClient = () => OpenRouterClient.getInstance();
exports.getOpenRouterClient = getOpenRouterClient;
//# sourceMappingURL=openrouter.client.js.map