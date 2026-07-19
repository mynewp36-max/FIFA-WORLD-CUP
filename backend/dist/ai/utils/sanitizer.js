"use strict";
/**
 * Utility for sanitizing user inputs before passing them to the AI model.
 * Protects against basic prompt injection, control characters, and oversized inputs.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizePromptInput = void 0;
const MAX_INPUT_LENGTH = 1000;
const sanitizePromptInput = (input) => {
    if (!input || typeof input !== 'string')
        return '';
    // 1. Truncate oversized prompts to prevent DOS / buffer / context window exhaustion
    let sanitized = input.trim();
    if (sanitized.length > MAX_INPUT_LENGTH) {
        sanitized = sanitized.substring(0, MAX_INPUT_LENGTH);
    }
    // 2. Remove control characters (except common whitespace)
    // This prevents terminal escapes or weird hidden characters that confuse the LLM
    sanitized = sanitized.replace(/[\x00-\x09\x0B-\x0C\x0E-\x1F\x7F]/g, '');
    // 3. Strip system instruction attempts
    // A naive but effective defense against obvious system prompt override attempts
    const blacklistedPhrases = [
        /ignore all previous/gi,
        /ignore previous/gi,
        /system prompt/gi,
        /you are an AI/gi,
        /forget all/gi,
        /bypass safety/gi,
        /system directive/gi
    ];
    for (const regex of blacklistedPhrases) {
        sanitized = sanitized.replace(regex, '[REDACTED]');
    }
    // 4. Basic HTML/Markdown stripping to prevent markdown injection
    // Replace < and >
    sanitized = sanitized.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return sanitized;
};
exports.sanitizePromptInput = sanitizePromptInput;
//# sourceMappingURL=sanitizer.js.map