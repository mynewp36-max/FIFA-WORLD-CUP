import { describe, it, expect } from 'vitest';
import { sendResponse } from './response';
import { Request } from 'express';

describe('sendResponse', () => {
  it('should format a successful response correctly', () => {
    const mockReq = { method: 'GET', originalUrl: '/api/test' } as Request;
    const data = { id: 1, name: 'test' };
    
    const response = sendResponse(mockReq, true, data, 'Success');
    
    expect(response.success).toBe(true);
    expect(response.message).toBe('Success');
    expect(response.data).toEqual(data);
    expect(response.requestId).toBeDefined();
    expect(response.timestamp).toBeDefined();
  });

  it('should format an error response correctly', () => {
    const mockReq = { method: 'POST', originalUrl: '/api/error' } as Request;
    
    const response = sendResponse(mockReq, false, null, 'Error occurred');
    
    expect(response.success).toBe(false);
    expect(response.message).toBe('Error occurred');
    expect(response.data).toBeNull();
    expect(response.requestId).toBeDefined();
  });
});
