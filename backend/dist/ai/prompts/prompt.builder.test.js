"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const prompt_builder_1 = require("./prompt.builder");
const makeContext = (overrides = {}) => ({
    userId: 'test-user',
    role: 'fan',
    preferredLanguage: 'English',
    stadium: 'MetLife Stadium',
    accessibilityPreferences: [],
    history: [],
    metadata: { startedAt: new Date().toISOString(), lastActive: new Date().toISOString() },
    ...overrides,
});
(0, vitest_1.describe)('buildLayeredPrompt', () => {
    (0, vitest_1.it)('includes the user message in the prompt', () => {
        const prompt = (0, prompt_builder_1.buildLayeredPrompt)({ userMessage: 'Where is gate B?' });
        (0, vitest_1.expect)(prompt).toContain('Where is gate B?');
    });
    (0, vitest_1.it)('includes all system persona and rule layers', () => {
        const prompt = (0, prompt_builder_1.buildLayeredPrompt)({ userMessage: 'test' });
        (0, vitest_1.expect)(prompt).toContain('SYSTEM PERSONA');
        (0, vitest_1.expect)(prompt).toContain('BEHAVIOR RULES');
        (0, vitest_1.expect)(prompt).toContain('SAFETY RULES');
        (0, vitest_1.expect)(prompt).toContain('OUTPUT FORMATTING RULES');
    });
    (0, vitest_1.it)('includes context layer when context is provided', () => {
        const context = makeContext({ role: 'vip', stadium: 'AT&T Stadium' });
        const prompt = (0, prompt_builder_1.buildLayeredPrompt)({ userMessage: 'test', context });
        (0, vitest_1.expect)(prompt).toContain('AT&T Stadium');
        (0, vitest_1.expect)(prompt).toContain('vip');
    });
    (0, vitest_1.it)('includes match in context when provided', () => {
        const context = makeContext({ match: 'USA vs Brazil' });
        const prompt = (0, prompt_builder_1.buildLayeredPrompt)({ userMessage: 'test', context });
        (0, vitest_1.expect)(prompt).toContain('USA vs Brazil');
    });
    (0, vitest_1.it)('includes accessibility preferences when provided', () => {
        const context = makeContext({ accessibilityPreferences: ['Wheelchair access'] });
        const prompt = (0, prompt_builder_1.buildLayeredPrompt)({ userMessage: 'test', context });
        (0, vitest_1.expect)(prompt).toContain('Wheelchair access');
    });
    (0, vitest_1.it)('includes a language rules layer when targetLanguage is specified', () => {
        const prompt = (0, prompt_builder_1.buildLayeredPrompt)({ userMessage: 'test', targetLanguage: 'Spanish' });
        (0, vitest_1.expect)(prompt).toContain('LANGUAGE RULES');
        (0, vitest_1.expect)(prompt).toContain('Spanish');
    });
    (0, vitest_1.it)('uses context preferredLanguage for language rules if targetLanguage is absent', () => {
        const context = makeContext({ preferredLanguage: 'French' });
        const prompt = (0, prompt_builder_1.buildLayeredPrompt)({ userMessage: 'test', context });
        (0, vitest_1.expect)(prompt).toContain('French');
    });
    (0, vitest_1.it)('includes task-specific rules when provided', () => {
        const prompt = (0, prompt_builder_1.buildLayeredPrompt)({
            userMessage: 'test',
            taskSpecificRules: 'Only respond with a JSON object.',
        });
        (0, vitest_1.expect)(prompt).toContain('TASK SPECIFIC RULES');
        (0, vitest_1.expect)(prompt).toContain('Only respond with a JSON object.');
    });
    (0, vitest_1.it)('does not include context layer when no context is provided', () => {
        const prompt = (0, prompt_builder_1.buildLayeredPrompt)({ userMessage: 'test' });
        (0, vitest_1.expect)(prompt).not.toContain('[CONTEXT]');
    });
});
//# sourceMappingURL=prompt.builder.test.js.map