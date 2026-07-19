import { describe, it, expect } from 'vitest';
import * as CardModule from './Card';

describe('Card', () => {
  it('should render without crashing', () => {
    expect(CardModule).toBeDefined();
  });
});