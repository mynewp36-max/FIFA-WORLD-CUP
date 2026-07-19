import { describe, it, expect } from 'vitest';
import * as FanDashboardModule from './FanDashboard';

describe('FanDashboard', () => {
  it('should render without crashing', () => {
    expect(FanDashboardModule).toBeDefined();
  });
});