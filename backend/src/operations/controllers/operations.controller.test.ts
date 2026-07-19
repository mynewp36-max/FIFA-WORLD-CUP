import { Request, Response, NextFunction } from 'express';
import { vi, describe, it, expect, beforeEach, Mock } from 'vitest';
import { OperationsController } from './operations.controller';
import { sendResponse } from '../../utils/response';
import { OperationsService } from '../services/operations.service';

// Mock dependencies
vi.mock('../../utils/response', () => ({
  sendResponse: vi.fn()
}));
vi.mock('../../ai/utils/logger', () => ({
  aiLogger: { info: vi.fn(), error: vi.fn(), debug: vi.fn(), warn: vi.fn() }
}));


vi.mock('../services/operations.service', () => ({
  OperationsService: {
    generateSummary: vi.fn().mockResolvedValue({ status: 'success' })
  }
}));

vi.mock('../../ai/services/ai.service', () => ({
  AiService: {
    generateStructuredResponse: vi.fn().mockResolvedValue({ status: 'success' })
  }
}));

describe('OperationsController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = { 
      body: { 
        stadium: 'Test Stadium', 
        destination: 'Test Dest', 
        accessibilityNeeds: ['Wheelchair'],
        currentLocation: 'Test Loc',
        activeSector: 'Test Sector',
        incidentType: 'Medical Assistance',
        location: 'Test Location',
        crowdStatus: 'Test Status',
        transportStatus: 'Test Transport'
      }, 
      ip: '127.0.0.1' 
    };
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };
    next = vi.fn();
    vi.clearAllMocks();
  });

  it('should handle request successfully', async () => {
    await OperationsController.generateSummary(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });

  it('should call next with error if service fails', async () => {
    const error = new Error('Test error');
    
       (OperationsService.generateSummary as Mock).mockRejectedValueOnce(error);
    
    
    await OperationsController.generateSummary(req as Request, res as Response, next);
    expect(next).toHaveBeenCalledWith(error);
  });
});