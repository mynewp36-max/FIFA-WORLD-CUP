import { describe, it, expect } from 'vitest';
import * as NavbarModule from './Navbar';

describe('Navbar', () => {
  it('should render without crashing', () => {
    expect(NavbarModule).toBeDefined();
  });
});