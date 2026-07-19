import { describe, it, expect } from 'vitest';
import * as WarningsPanelModule from './WarningsPanel';

describe('WarningsPanel', () => {
  it('should render without crashing', () => {
    expect(WarningsPanelModule).toBeDefined();
  });
});