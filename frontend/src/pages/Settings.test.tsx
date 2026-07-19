import { describe, it, expect } from 'vitest';
import * as SettingsModule from './Settings';

describe('Settings', () => {
  it('should render without crashing', () => {
    expect(SettingsModule).toBeDefined();
  });
});