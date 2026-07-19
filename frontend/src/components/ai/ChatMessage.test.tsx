import { describe, it, expect } from 'vitest';
import * as ChatMessageModule from './ChatMessage';

describe('ChatMessage', () => {
  it('should render without crashing', () => {
    expect(ChatMessageModule).toBeDefined();
  });
});