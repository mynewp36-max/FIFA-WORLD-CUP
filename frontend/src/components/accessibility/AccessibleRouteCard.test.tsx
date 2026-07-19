import { describe, it, expect } from 'vitest';
import * as AccessibleRouteCardModule from './AccessibleRouteCard';

describe('AccessibleRouteCard', () => {
  it('should render without crashing', () => {
    expect(AccessibleRouteCardModule).toBeDefined();
  });
});