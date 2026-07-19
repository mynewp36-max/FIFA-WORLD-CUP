import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useAccessibility } from './useAccessibility';

vi.mock('../services/accessibility.service', () => ({
  AccessibilityService: {
    assist: vi.fn(),
    assess: vi.fn(),
    getRoute: vi.fn(),
    generateSummary: vi.fn(),
    recommend: vi.fn()
  }
}));

describe('useAccessibility', () => {
  it('should return default values', () => {
    const { result } = renderHook(() => useAccessibility());
    expect(result.current).toBeDefined();
  });
});