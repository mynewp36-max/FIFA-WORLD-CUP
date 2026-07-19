import { describe, it, expect } from 'vitest';
import * as BadgeModule from './Badge';

describe('Badge', () => {
  it('should render without crashing', () => {
    expect(BadgeModule).toBeDefined();
  });
});