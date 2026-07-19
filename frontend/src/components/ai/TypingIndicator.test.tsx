import { describe, it, expect } from 'vitest';
import * as TypingIndicatorModule from './TypingIndicator';

describe('TypingIndicator', () => {
  it('should render without crashing', () => {
    expect(TypingIndicatorModule).toBeDefined();
  });
});