import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { TransportService } from './transport.service';
import { AiService } from '../../ai/services/ai.service';
import { TransportRequest, TransportResponse } from '../types';

describe('TransportService', () => {
  beforeEach(() => {
    vi.spyOn(AiService, 'generateStructuredResponse').mockResolvedValue({
      summary: 'Mocked summary route',
      recommendedTransport: 'Bus',
      alternativeOptions: ['Metro'],
      departureStrategy: 'Leave now',
      estimatedTravelTime: '15 min',
      crowdImpact: 'Low',
      priority: 'Low',
      travelTips: ['Tip 1'],
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const validRequest: TransportRequest = {
    stadium: 'MetLife',
    currentLocation: 'Lot G',
    destination: 'Times Square',
    language: 'English',
    userRole: 'Fan',
    wheelchair: false,
    avoidCrowd: false,
    groupSize: 2,
  };

  it('recommend returns parsed transport recommendations successfully', async () => {
    const result = await TransportService.recommend(validRequest, 'user-1');
    expect(result.recommendedTransport).toBe('Bus');
    expect(result.alternativeOptions).toEqual(['Metro']);
    expect(AiService.generateStructuredResponse).toHaveBeenCalledTimes(1);
  });

  it('recommend throws an error when AI returns null or empty response', async () => {
    vi.spyOn(AiService, 'generateStructuredResponse').mockResolvedValueOnce(null);

    await expect(TransportService.recommend(validRequest, 'user-2')).rejects.toThrow(
      'AI returned empty transport response.'
    );
  });

  it('recommend propagates errors thrown by AiService', async () => {
    vi.spyOn(AiService, 'generateStructuredResponse').mockRejectedValueOnce(new Error('AI failed'));

    await expect(TransportService.recommend(validRequest, 'user-3')).rejects.toThrow('AI failed');
  });
});
