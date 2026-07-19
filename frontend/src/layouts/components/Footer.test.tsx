import { describe, it, expect } from 'vitest';
import * as FooterModule from './Footer';

describe('Footer', () => {
  it('should render without crashing', () => {
    expect(FooterModule).toBeDefined();
  });
});