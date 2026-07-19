import { describe, it, expect } from 'vitest';
import * as IncidentMetadataCardModule from './IncidentMetadataCard';

describe('IncidentMetadataCard', () => {
  it('should render without crashing', () => {
    expect(IncidentMetadataCardModule).toBeDefined();
  });
});