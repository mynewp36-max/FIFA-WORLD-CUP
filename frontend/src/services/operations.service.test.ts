import { describe, it, expect, vi, beforeEach } from 'vitest';
import { OperationsService } from './operations.service';

vi.mock('../utils/apiClient', () => ({
  default: {
    post: vi.fn().mockResolvedValue({ data: { success: true, data: { status: 'mock' } } }),
    get: vi.fn().mockResolvedValue({ data: { success: true, data: { status: 'mock' } } })
  }
}));

describe('OperationsService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should exist', () => {
    expect(OperationsService).toBeDefined();
  });
});