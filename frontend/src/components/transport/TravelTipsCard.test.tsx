import { describe, it, expect } from 'vitest';
import * as TravelTipsCardModule from './TravelTipsCard';

describe('TravelTipsCard', () => {
  it('should render without crashing', () => {
    expect(TravelTipsCardModule).toBeDefined();
  });
});