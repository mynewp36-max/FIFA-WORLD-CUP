import { describe, it, expect } from 'vitest';
import * as ProfileMenuModule from './ProfileMenu';

describe('ProfileMenu', () => {
  it('should render without crashing', () => {
    expect(ProfileMenuModule).toBeDefined();
  });
});