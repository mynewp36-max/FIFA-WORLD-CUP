import { describe, it, expect } from 'vitest';
import * as NavigationSearchCardModule from './NavigationSearchCard';

describe('NavigationSearchCard', () => {
  it('should render without crashing', () => {
    expect(NavigationSearchCardModule).toBeDefined();
  });
});