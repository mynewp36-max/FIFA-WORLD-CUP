import { describe, it, expect, vi, beforeEach } from 'vitest';
import { EmergencyService } from './emergency.service';

vi.mock('../utils/apiClient', () => ({
  default: {
    post: vi.fn().mockResolvedValue({ data: { success: true, data: { status: 'mock' } } }),
    get: vi.fn().mockResolvedValue({ data: { success: true, data: { status: 'mock' } } })
  }
}));

describe('EmergencyService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should exist', () => {
    expect(EmergencyService).toBeDefined();
  });
});