import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NavigationService } from './navigation.service';

vi.mock('../utils/apiClient', () => ({
  default: {
    post: vi.fn().mockResolvedValue({ data: { success: true, data: { status: 'mock' } } }),
    get: vi.fn().mockResolvedValue({ data: { success: true, data: { status: 'mock' } } })
  }
}));

describe('NavigationService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should exist', () => {
    expect(NavigationService).toBeDefined();
  });
});