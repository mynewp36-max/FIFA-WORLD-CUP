"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const schemas_1 = require("./schemas");
(0, vitest_1.describe)('Zod Validation Schemas', () => {
    (0, vitest_1.describe)('ChatRequestSchema', () => {
        (0, vitest_1.it)('accepts a valid minimal payload', () => {
            const result = schemas_1.ChatRequestSchema.safeParse({ message: 'Hello' });
            (0, vitest_1.expect)(result.success).toBe(true);
        });
        (0, vitest_1.it)('accepts a full valid payload', () => {
            const result = schemas_1.ChatRequestSchema.safeParse({
                message: 'Hello',
                language: 'English',
                userRole: 'Fan',
                stadium: 'MetLife',
                match: 'USA vs Brazil',
                accessibility: true,
            });
            (0, vitest_1.expect)(result.success).toBe(true);
        });
        (0, vitest_1.it)('rejects an empty message', () => {
            const result = schemas_1.ChatRequestSchema.safeParse({ message: '' });
            (0, vitest_1.expect)(result.success).toBe(false);
        });
        (0, vitest_1.it)('rejects a missing message field', () => {
            const result = schemas_1.ChatRequestSchema.safeParse({});
            (0, vitest_1.expect)(result.success).toBe(false);
        });
        (0, vitest_1.it)('rejects a message exceeding 2000 characters', () => {
            const result = schemas_1.ChatRequestSchema.safeParse({ message: 'a'.repeat(2001) });
            (0, vitest_1.expect)(result.success).toBe(false);
        });
        (0, vitest_1.it)('trims whitespace from message', () => {
            const result = schemas_1.ChatRequestSchema.safeParse({ message: '  hello  ' });
            (0, vitest_1.expect)(result.success).toBe(true);
            if (result.success)
                (0, vitest_1.expect)(result.data.message).toBe('hello');
        });
    });
    (0, vitest_1.describe)('CrowdAnalyzeSchema', () => {
        (0, vitest_1.it)('accepts valid crowd analysis input', () => {
            const result = schemas_1.CrowdAnalyzeSchema.safeParse({ activeSector: 'Gate A', density: 'High' });
            (0, vitest_1.expect)(result.success).toBe(true);
        });
        (0, vitest_1.it)('rejects missing activeSector', () => {
            const result = schemas_1.CrowdAnalyzeSchema.safeParse({ density: 'High' });
            (0, vitest_1.expect)(result.success).toBe(false);
        });
        (0, vitest_1.it)('rejects missing density', () => {
            const result = schemas_1.CrowdAnalyzeSchema.safeParse({ activeSector: 'Gate A' });
            (0, vitest_1.expect)(result.success).toBe(false);
        });
    });
    (0, vitest_1.describe)('EmergencyDispatchSchema', () => {
        (0, vitest_1.it)('accepts all valid emergency types', () => {
            const types = ['medical', 'security', 'fire', 'general'];
            for (const type of types) {
                const result = schemas_1.EmergencyDispatchSchema.safeParse({ type, location: 'Section 112' });
                (0, vitest_1.expect)(result.success).toBe(true);
            }
        });
        (0, vitest_1.it)('rejects an invalid emergency type', () => {
            const result = schemas_1.EmergencyDispatchSchema.safeParse({ type: 'earthquake', location: 'Section 1' });
            (0, vitest_1.expect)(result.success).toBe(false);
        });
        (0, vitest_1.it)('rejects a missing location', () => {
            const result = schemas_1.EmergencyDispatchSchema.safeParse({ type: 'medical' });
            (0, vitest_1.expect)(result.success).toBe(false);
        });
    });
    (0, vitest_1.describe)('TransportRecommendSchema', () => {
        (0, vitest_1.it)('accepts a valid destination', () => {
            const result = schemas_1.TransportRecommendSchema.safeParse({ destination: 'Penn Station' });
            (0, vitest_1.expect)(result.success).toBe(true);
        });
        (0, vitest_1.it)('rejects an empty destination', () => {
            const result = schemas_1.TransportRecommendSchema.safeParse({ destination: '' });
            (0, vitest_1.expect)(result.success).toBe(false);
        });
    });
    (0, vitest_1.describe)('OperationsSummarySchema', () => {
        (0, vitest_1.it)('accepts an empty payload (all optional)', () => {
            const result = schemas_1.OperationsSummarySchema.safeParse({});
            (0, vitest_1.expect)(result.success).toBe(true);
        });
        (0, vitest_1.it)('accepts a full optional payload', () => {
            const result = schemas_1.OperationsSummarySchema.safeParse({ timeframe: '1 hour', focus: 'Security' });
            (0, vitest_1.expect)(result.success).toBe(true);
        });
    });
});
//# sourceMappingURL=schemas.test.js.map