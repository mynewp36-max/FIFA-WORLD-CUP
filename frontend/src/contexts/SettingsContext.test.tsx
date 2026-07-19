import { describe, it, expect } from 'vitest';
import * as SettingsContextModule from './SettingsContext';

describe('SettingsContext', () => {
  it('should render without crashing', () => {
    expect(SettingsContextModule).toBeDefined();
  });
});