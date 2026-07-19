import { describe, it, expect } from 'vitest';
import * as FacilityCardsModule from './FacilityCards';

describe('FacilityCards', () => {
  it('should render without crashing', () => {
    expect(FacilityCardsModule).toBeDefined();
  });
});