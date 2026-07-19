import { describe, it, expect } from 'vitest';
import { buildLayeredPrompt } from './prompt.builder';
import type { AiContext } from '../types';

const makeContext = (overrides: Partial<AiContext> = {}): AiContext => ({
  userId: 'test-user',
  role: 'fan',
  preferredLanguage: 'English',
  stadium: 'MetLife Stadium',
  accessibilityPreferences: [],
  history: [],
  metadata: { startedAt: new Date().toISOString(), lastActive: new Date().toISOString() },
  ...overrides,
});

describe('buildLayeredPrompt', () => {
  it('includes the user message in the prompt', () => {
    const prompt = buildLayeredPrompt({ userMessage: 'Where is gate B?' });
    expect(prompt).toContain('Where is gate B?');
  });

  it('includes all system persona and rule layers', () => {
    const prompt = buildLayeredPrompt({ userMessage: 'test' });
    expect(prompt).toContain('SYSTEM PERSONA');
    expect(prompt).toContain('BEHAVIOR RULES');
    expect(prompt).toContain('SAFETY RULES');
    expect(prompt).toContain('OUTPUT FORMATTING RULES');
  });

  it('includes context layer when context is provided', () => {
    const context = makeContext({ role: 'vip', stadium: 'AT&T Stadium' });
    const prompt = buildLayeredPrompt({ userMessage: 'test', context });
    expect(prompt).toContain('AT&T Stadium');
    expect(prompt).toContain('vip');
  });

  it('includes match in context when provided', () => {
    const context = makeContext({ match: 'USA vs Brazil' });
    const prompt = buildLayeredPrompt({ userMessage: 'test', context });
    expect(prompt).toContain('USA vs Brazil');
  });

  it('includes accessibility preferences when provided', () => {
    const context = makeContext({ accessibilityPreferences: ['Wheelchair access'] });
    const prompt = buildLayeredPrompt({ userMessage: 'test', context });
    expect(prompt).toContain('Wheelchair access');
  });

  it('includes a language rules layer when targetLanguage is specified', () => {
    const prompt = buildLayeredPrompt({ userMessage: 'test', targetLanguage: 'Spanish' });
    expect(prompt).toContain('LANGUAGE RULES');
    expect(prompt).toContain('Spanish');
  });

  it('uses context preferredLanguage for language rules if targetLanguage is absent', () => {
    const context = makeContext({ preferredLanguage: 'French' });
    const prompt = buildLayeredPrompt({ userMessage: 'test', context });
    expect(prompt).toContain('French');
  });

  it('includes task-specific rules when provided', () => {
    const prompt = buildLayeredPrompt({
      userMessage: 'test',
      taskSpecificRules: 'Only respond with a JSON object.',
    });
    expect(prompt).toContain('TASK SPECIFIC RULES');
    expect(prompt).toContain('Only respond with a JSON object.');
  });

  it('does not include context layer when no context is provided', () => {
    const prompt = buildLayeredPrompt({ userMessage: 'test' });
    expect(prompt).not.toContain('[CONTEXT]');
  });
});
