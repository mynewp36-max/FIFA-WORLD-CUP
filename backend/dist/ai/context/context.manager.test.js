"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const context_manager_1 = require("./context.manager");
// Reset the singleton between tests by clearing all contexts
(0, vitest_1.afterEach)(() => {
    // Access private map via type casting for test cleanup
    const manager = context_manager_1.contextManager;
    manager.contexts.clear();
    vitest_1.vi.restoreAllMocks();
});
(0, vitest_1.describe)('ContextManager', () => {
    (0, vitest_1.describe)('getContext', () => {
        (0, vitest_1.it)('creates and returns a default context for a new userId', () => {
            const ctx = context_manager_1.contextManager.getContext('user-1');
            (0, vitest_1.expect)(ctx.userId).toBe('user-1');
            (0, vitest_1.expect)(ctx.role).toBe('guest');
            (0, vitest_1.expect)(ctx.preferredLanguage).toBe('en');
            (0, vitest_1.expect)(ctx.history).toHaveLength(0);
        });
        (0, vitest_1.it)('returns the same context on repeated calls for the same userId', () => {
            const ctx1 = context_manager_1.contextManager.getContext('user-2');
            const ctx2 = context_manager_1.contextManager.getContext('user-2');
            (0, vitest_1.expect)(ctx1.userId).toBe(ctx2.userId);
        });
        (0, vitest_1.it)('updates lastActive timestamp on each get', async () => {
            const ctx1 = context_manager_1.contextManager.getContext('user-3');
            const firstActive = ctx1.metadata.lastActive;
            // Wait 1ms then fetch again
            await new Promise((r) => setTimeout(r, 1));
            context_manager_1.contextManager.getContext('user-3');
            const ctx2 = context_manager_1.contextManager.getContext('user-3');
            (0, vitest_1.expect)(ctx2.metadata.lastActive >= firstActive).toBe(true);
        });
    });
    (0, vitest_1.describe)('updateContext', () => {
        (0, vitest_1.it)('merges updates into an existing context', () => {
            context_manager_1.contextManager.getContext('user-4');
            context_manager_1.contextManager.updateContext('user-4', { role: 'fan', preferredLanguage: 'es' });
            const updated = context_manager_1.contextManager.getContext('user-4');
            (0, vitest_1.expect)(updated.role).toBe('fan');
            (0, vitest_1.expect)(updated.preferredLanguage).toBe('es');
        });
        (0, vitest_1.it)('creates a context automatically if userId does not exist yet', () => {
            context_manager_1.contextManager.updateContext('new-user', { role: 'vip' });
            const ctx = context_manager_1.contextManager.getContext('new-user');
            (0, vitest_1.expect)(ctx.role).toBe('vip');
        });
    });
    (0, vitest_1.describe)('addInteraction', () => {
        (0, vitest_1.it)('appends an interaction with a timestamp to the history', () => {
            context_manager_1.contextManager.getContext('user-5');
            context_manager_1.contextManager.addInteraction('user-5', { role: 'user', content: 'Hello' });
            const ctx = context_manager_1.contextManager.getContext('user-5');
            (0, vitest_1.expect)(ctx.history).toHaveLength(1);
            (0, vitest_1.expect)(ctx.history[0].content).toBe('Hello');
            (0, vitest_1.expect)(ctx.history[0].timestamp).toBeDefined();
        });
        (0, vitest_1.it)('trims history to the last 10 interactions', () => {
            context_manager_1.contextManager.getContext('user-6');
            for (let i = 0; i < 15; i++) {
                context_manager_1.contextManager.addInteraction('user-6', { role: 'user', content: `Message ${i}` });
            }
            const ctx = context_manager_1.contextManager.getContext('user-6');
            (0, vitest_1.expect)(ctx.history).toHaveLength(10);
            (0, vitest_1.expect)(ctx.history[0].content).toBe('Message 5');
            (0, vitest_1.expect)(ctx.history[9].content).toBe('Message 14');
        });
    });
});
//# sourceMappingURL=context.manager.test.js.map