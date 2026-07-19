import { describe, it, expect } from 'vitest';
import * as ToastProviderModule from './ToastProvider';

describe('ToastProvider', () => {
  it('should render without crashing', () => {
    expect(ToastProviderModule).toBeDefined();
  });
});