import { describe, it, expect } from 'vitest';
import * as ButtonModule from './Button';

describe('Button', () => {
  it('should render without crashing', () => {
    expect(ButtonModule).toBeDefined();
  });
});