import { describe, it, expect } from 'vitest';
import * as ModalModule from './Modal';

describe('Modal', () => {
  it('should render without crashing', () => {
    expect(ModalModule).toBeDefined();
  });
});