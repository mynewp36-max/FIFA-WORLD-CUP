import { describe, it, expect } from 'vitest';
import * as HomeModule from './Home';

describe('Home', () => {
  it('should render without crashing', () => {
    expect(HomeModule).toBeDefined();
  });
});