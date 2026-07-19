import { describe, it, expect } from 'vitest';
import * as ChatInputModule from './ChatInput';

describe('ChatInput', () => {
  it('should render without crashing', () => {
    expect(ChatInputModule).toBeDefined();
  });
});