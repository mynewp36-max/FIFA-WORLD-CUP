import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useEmergency } from './useEmergency';

vi.mock('../services/emergency.service', () => ({
  EmergencyService: {
    assist: vi.fn(),
    assess: vi.fn(),
    getRoute: vi.fn(),
    generateSummary: vi.fn(),
    recommend: vi.fn()
  }
}));

describe('useEmergency', () => {
  it('should return default values', () => {
    const { result } = renderHook(() => useEmergency());
    expect(result.current).toBeDefined();
  });
});