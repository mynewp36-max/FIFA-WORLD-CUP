import { Request, Response, NextFunction } from 'express';
import { vi, describe, it, expect, beforeEach, Mock } from 'vitest';
import { EmergencyController } from './emergency.controller';
import { sendResponse } from '../../utils/response';
import { EmergencyService } from '../services/emergency.service';

// Mock dependencies
vi.mock('../../utils/response', () => ({
  sendResponse: vi.fn()
}));
vi.mock('../../ai/utils/logger', () => ({
  aiLogger: { info: vi.fn(), error: vi.fn(), debug: vi.fn(), warn: vi.fn() }
}));


vi.mock('../services/emergency.service', () => ({
  EmergencyService: {
    assist: vi.fn().mockResolvedValue({ status: 'success' })
  }
}));

vi.mock('../../ai/services/ai.service', () => ({
  AiService: {
    generateStructuredResponse: vi.fn().mockResolvedValue({ status: 'success' })
  }
}));

describe('EmergencyController', () => {
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
    await EmergencyController.assist(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });

  it('should call next with error if service fails', async () => {
    const error = new Error('Test error');
    
       (EmergencyService.assist as Mock).mockRejectedValueOnce(error);
    
    
    await EmergencyController.assist(req as Request, res as Response, next);
    expect(next).toHaveBeenCalledWith(error);
  });
});