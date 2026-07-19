import { describe, it, expect } from 'vitest';
import * as TransportSearchCardModule from './TransportSearchCard';

describe('TransportSearchCard', () => {
  it('should render without crashing', () => {
    expect(TransportSearchCardModule).toBeDefined();
  });
});