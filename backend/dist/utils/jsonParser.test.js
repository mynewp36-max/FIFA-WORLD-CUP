"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const jsonParser_1 = require("./jsonParser");
(0, vitest_1.describe)('safeJsonParse', () => {
    (0, vitest_1.it)('parses valid JSON string', () => {
        const result = (0, jsonParser_1.safeJsonParse)('{"key":"value"}');
        (0, vitest_1.expect)(result).toEqual({ key: 'value' });
    });
    (0, vitest_1.it)('parses valid JSON with markdown code block', () => {
        const result = (0, jsonParser_1.safeJsonParse)('```json\n{"key":"value"}\n```');
        (0, vitest_1.expect)(result).toEqual({ key: 'value' });
    });
    (0, vitest_1.it)('parses JSON wrapped in plain backtick block without language hint', () => {
        const result = (0, jsonParser_1.safeJsonParse)('```\n{"a":1}\n```');
        (0, vitest_1.expect)(result).toEqual({ a: 1 });
    });
    (0, vitest_1.it)('throws an error with a descriptive message for empty string', () => {
        (0, vitest_1.expect)(() => (0, jsonParser_1.safeJsonParse)('')).toThrow('empty or missing response');
    });
    (0, vitest_1.it)('throws an error for null input', () => {
        (0, vitest_1.expect)(() => (0, jsonParser_1.safeJsonParse)(null)).toThrow('empty or missing response');
    });
    (0, vitest_1.it)('throws an error for undefined input', () => {
        (0, vitest_1.expect)(() => (0, jsonParser_1.safeJsonParse)(undefined)).toThrow('empty or missing response');
    });
    (0, vitest_1.it)('throws an error for invalid/malformed JSON', () => {
        (0, vitest_1.expect)(() => (0, jsonParser_1.safeJsonParse)('{"key": "value"')).toThrow('Failed to parse AI response');
    });
    (0, vitest_1.it)('parses arrays correctly', () => {
        const result = (0, jsonParser_1.safeJsonParse)('[1, 2, 3]');
        (0, vitest_1.expect)(result).toEqual([1, 2, 3]);
    });
    (0, vitest_1.it)('includes context in the log (does not affect parsing output)', () => {
        // Should still throw, context is just for logging
        (0, vitest_1.expect)(() => (0, jsonParser_1.safeJsonParse)('bad json', 'MyContext')).toThrow();
    });
});
//# sourceMappingURL=jsonParser.test.js.map