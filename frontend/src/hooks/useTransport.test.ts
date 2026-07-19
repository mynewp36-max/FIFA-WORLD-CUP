import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useTransport } from './useTransport';

vi.mock('../services/transport.service', () => ({
  TransportService: {
    assist: vi.fn(),
    assess: vi.fn(),
    getRoute: vi.fn(),
    generateSummary: vi.fn(),
    recommend: vi.fn()
  }
}));

describe('useTransport', () => {
  it('should return default values', () => {
    const { result } = renderHook(() => useTransport());
    expect(result.current).toBeDefined();
  });
});