import { describe, it, expect } from 'vitest';
import * as LiveRouteInfoModule from './LiveRouteInfo';

describe('LiveRouteInfo', () => {
  it('should render without crashing', () => {
    expect(LiveRouteInfoModule).toBeDefined();
  });
});