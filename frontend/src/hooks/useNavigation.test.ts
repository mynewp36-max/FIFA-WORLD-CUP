import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useNavigation } from './useNavigation';

vi.mock('../services/navigation.service', () => ({
  NavigationService: {
    assist: vi.fn(),
    assess: vi.fn(),
    getRoute: vi.fn(),
    generateSummary: vi.fn(),
    recommend: vi.fn()
  }
}));

describe('useNavigation', () => {
  it('should return default values', () => {
    const { result } = renderHook(() => useNavigation());
    expect(result.current).toBeDefined();
  });
});