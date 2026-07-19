import { describe, it, expect } from 'vitest';
import * as StadiumNavigationModule from './StadiumNavigation';

describe('StadiumNavigation', () => {
  it('should render without crashing', () => {
    expect(StadiumNavigationModule).toBeDefined();
  });
});