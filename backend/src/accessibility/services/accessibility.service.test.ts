import { vi, describe, it, expect, beforeEach, Mock } from 'vitest';
import { AccessibilityService } from './accessibility.service';
import { AiService } from '../../ai/services/ai.service';

vi.mock('../../ai/services/ai.service', () => ({
  AiService: {
    generateStructuredResponse: vi.fn().mockResolvedValue({ result: 'test' })
  }
}));
vi.mock('../../ai/utils/logger', () => ({
  aiLogger: { info: vi.fn(), error: vi.fn(), debug: vi.fn(), warn: vi.fn() }
}));

describe('AccessibilityService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call AiService and return result', async () => {
    const reqData = { 
      stadium: 'Test Stadium', 
      destination: 'Test Dest', 
      accessibilityNeeds: ['Wheelchair'],
      currentLocation: 'Test Loc',
      activeSector: 'Test Sector',
      incidentType: 'Medical Assistance',
      location: 'Test Location',
      crowdStatus: 'Test Status',
      transportStatus: 'Test Transport'
    };
    const res = await AccessibilityService.assist(reqData as any, 'user-1');
    expect(res).toBeDefined();
    expect(AiService.generateStructuredResponse).toHaveBeenCalled();
  });

  it('should propagate errors from AiService', async () => {
    const error = new Error('AI Error');
    (AiService.generateStructuredResponse as Mock).mockRejectedValueOnce(error);
    const reqData = { stadium: 'Test', destination: 'Test', accessibilityNeeds: ['Wheelchair'] };
    await expect(AccessibilityService.assist(reqData as any, 'user-1')).rejects.toThrow('AI Error');
  });
});