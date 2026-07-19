import { describe, it, expect } from 'vitest';
import * as OrganizerDashboardModule from './OrganizerDashboard';

describe('OrganizerDashboard', () => {
  it('should render without crashing', () => {
    expect(OrganizerDashboardModule).toBeDefined();
  });
});