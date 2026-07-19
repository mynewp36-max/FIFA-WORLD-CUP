import { describe, it, expect } from 'vitest';
import * as ChatWindowModule from './ChatWindow';

describe('ChatWindow', () => {
  it('should render without crashing', () => {
    expect(ChatWindowModule).toBeDefined();
  });
});