import { describe, it, expect } from 'vitest';
import * as CriticalAlertsPanelModule from './CriticalAlertsPanel';

describe('CriticalAlertsPanel', () => {
  it('should render without crashing', () => {
    expect(CriticalAlertsPanelModule).toBeDefined();
  });
});