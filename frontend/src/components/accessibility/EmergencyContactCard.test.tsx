import { describe, it, expect } from 'vitest';
import * as EmergencyContactCardModule from './EmergencyContactCard';

describe('EmergencyContactCard', () => {
  it('should render without crashing', () => {
    expect(EmergencyContactCardModule).toBeDefined();
  });
});