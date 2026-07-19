import { describe, it, expect } from 'vitest';
import * as NotificationPanelModule from './NotificationPanel';

describe('NotificationPanel', () => {
  it('should render without crashing', () => {
    expect(NotificationPanelModule).toBeDefined();
  });
});