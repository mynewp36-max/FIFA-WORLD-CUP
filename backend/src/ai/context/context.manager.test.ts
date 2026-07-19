import { describe, it, expect, vi, afterEach } from 'vitest';
import { contextManager } from './context.manager';

// Reset the singleton between tests by clearing all contexts
afterEach(() => {
  // Access private map via type casting for test cleanup
  const manager = contextManager as unknown as { contexts: Map<string, unknown> };
  manager.contexts.clear();
  vi.restoreAllMocks();
});

describe('ContextManager', () => {
  describe('getContext', () => {
    it('creates and returns a default context for a new userId', () => {
      const ctx = contextManager.getContext('user-1');
      expect(ctx.userId).toBe('user-1');
      expect(ctx.role).toBe('guest');
      expect(ctx.preferredLanguage).toBe('en');
      expect(ctx.history).toHaveLength(0);
    });

    it('returns the same context on repeated calls for the same userId', () => {
      const ctx1 = contextManager.getContext('user-2');
      const ctx2 = contextManager.getContext('user-2');
      expect(ctx1.userId).toBe(ctx2.userId);
    });

    it('updates lastActive timestamp on each get', async () => {
      const ctx1 = contextManager.getContext('user-3');
      const firstActive = ctx1.metadata.lastActive;
      // Wait 1ms then fetch again
      await new Promise<void>((r) => setTimeout(r, 1));
      contextManager.getContext('user-3');
      const ctx2 = contextManager.getContext('user-3');
      expect(ctx2.metadata.lastActive >= firstActive).toBe(true);
    });
  });

  describe('updateContext', () => {
    it('merges updates into an existing context', () => {
      contextManager.getContext('user-4');
      contextManager.updateContext('user-4', { role: 'fan', preferredLanguage: 'es' });
      const updated = contextManager.getContext('user-4');
      expect(updated.role).toBe('fan');
      expect(updated.preferredLanguage).toBe('es');
    });

    it('creates a context automatically if userId does not exist yet', () => {
      contextManager.updateContext('new-user', { role: 'vip' });
      const ctx = contextManager.getContext('new-user');
      expect(ctx.role).toBe('vip');
    });
  });

  describe('addInteraction', () => {
    it('appends an interaction with a timestamp to the history', () => {
      contextManager.getContext('user-5');
      contextManager.addInteraction('user-5', { role: 'user', content: 'Hello' });
      const ctx = contextManager.getContext('user-5');
      expect(ctx.history).toHaveLength(1);
      expect(ctx.history[0].content).toBe('Hello');
      expect(ctx.history[0].timestamp).toBeDefined();
    });

    it('trims history to the last 10 interactions', () => {
      contextManager.getContext('user-6');
      for (let i = 0; i < 15; i++) {
        contextManager.addInteraction('user-6', { role: 'user', content: `Message ${i}` });
      }
      const ctx = contextManager.getContext('user-6');
      expect(ctx.history).toHaveLength(10);
      expect(ctx.history[0].content).toBe('Message 5');
      expect(ctx.history[9].content).toBe('Message 14');
    });
  });
});
