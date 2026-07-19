import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useOperations } from './useOperations';

vi.mock('../services/operations.service', () => ({
  OperationsService: {
    assist: vi.fn(),
    assess: vi.fn(),
    getRoute: vi.fn(),
    generateSummary: vi.fn(),
    recommend: vi.fn()
  }
}));

describe('useOperations', () => {
  it('should return default values', () => {
    const { result } = renderHook(() => useOperations());
    expect(result.current).toBeDefined();
  });
});