import { describe, it, expect } from 'vitest';
import * as EmptyChatModule from './EmptyChat';

describe('EmptyChat', () => {
  it('should render without crashing', () => {
    expect(EmptyChatModule).toBeDefined();
  });
});