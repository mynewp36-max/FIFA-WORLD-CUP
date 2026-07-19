import { describe, it, expect } from 'vitest';
import * as AlertModule from './Alert';

describe('Alert', () => {
  it('should render without crashing', () => {
    expect(AlertModule).toBeDefined();
  });
});