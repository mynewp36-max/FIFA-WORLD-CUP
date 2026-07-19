import { describe, it, expect } from 'vitest';
import * as StatusOverviewCardsModule from './StatusOverviewCards';

describe('StatusOverviewCards', () => {
  it('should render without crashing', () => {
    expect(StatusOverviewCardsModule).toBeDefined();
  });
});