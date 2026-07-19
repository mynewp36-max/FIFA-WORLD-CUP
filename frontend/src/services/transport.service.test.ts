import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TransportService } from './transport.service';

vi.mock('../utils/apiClient', () => ({
  default: {
    post: vi.fn().mockResolvedValue({ data: { success: true, data: { status: 'mock' } } }),
    get: vi.fn().mockResolvedValue({ data: { success: true, data: { status: 'mock' } } })
  }
}));

describe('TransportService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should exist', () => {
    expect(TransportService).toBeDefined();
  });
});