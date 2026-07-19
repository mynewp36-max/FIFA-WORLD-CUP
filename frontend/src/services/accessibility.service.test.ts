import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AccessibilityService } from './accessibility.service';

vi.mock('../utils/apiClient', () => ({
  default: {
    post: vi.fn().mockResolvedValue({ data: { success: true, data: { status: 'mock' } } }),
    get: vi.fn().mockResolvedValue({ data: { success: true, data: { status: 'mock' } } })
  }
}));

describe('AccessibilityService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should exist', () => {
    expect(AccessibilityService).toBeDefined();
  });
});