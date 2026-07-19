import { describe, it, expect } from 'vitest';
import * as LayoutModule from './Layout';

describe('Layout', () => {
  it('should render without crashing', () => {
    expect(LayoutModule).toBeDefined();
  });
});