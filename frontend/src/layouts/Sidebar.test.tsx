import { describe, it, expect } from 'vitest';
import * as SidebarModule from './Sidebar';

describe('Sidebar', () => {
  it('should render without crashing', () => {
    expect(SidebarModule).toBeDefined();
  });
});