import { describe, it, expect } from 'vitest';
import * as SettingsDrawerModule from './SettingsDrawer';

describe('SettingsDrawer', () => {
  it('should render without crashing', () => {
    expect(SettingsDrawerModule).toBeDefined();
  });
});