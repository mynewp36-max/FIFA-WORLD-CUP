import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { TransportController } from './transport.controller';
import { TransportService } from '../services/transport.service';
import { Request, Response, NextFunction } from 'express';

const mockReq = (body: unknown = {}): Partial<Request> => ({
  body,
  ip: '127.0.0.1',
  method: 'POST',
  originalUrl: '/api/transport/recommend',
  requestId: 'req-transport-123',
});

const mockRes = (): Partial<Response> => {
  const res: Partial<Response> = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

describe('TransportController', () => {
  let next: NextFunction;

  beforeEach(() => {
    next = vi.fn();
    vi.spyOn(TransportService, 'recommend').mockResolvedValue({
      summary: 'Success transport strategy',
      recommendedTransport: 'Walk',
      alternativeOptions: ['Metro'],
      departureStrategy: 'Strategy',
      estimatedTravelTime: '10 min',
      crowdImpact: 'Low',
      priority: 'Low',
      travelTips: [],
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('recommend returns 200 with transport suggestions when inputs are valid', async () => {
    const req = mockReq({
      stadium: 'MetLife Stadium',
      currentLocation: 'Section A',
      destination: 'Hotel',
      groupSize: 2,
    });
    const res = mockRes();

    await TransportController.recommend(req as Request, res as Response, next);

    expect(TransportService.recommend).toHaveBeenCalledWith(
      {
        stadium: 'MetLife Stadium',
        currentLocation: 'Section A',
        destination: 'Hotel',
        groupSize: 2,
        wheelchair: false,
        avoidCrowd: false,
        language: 'English',
        userRole: 'Fan',
      },
      '127.0.0.1'
    );
    expect(res.status).toHaveBeenCalledWith(200);
    const jsonCall = (res.json as ReturnType<typeof vi.fn>).mock.calls[0][0];
    expect(jsonCall.success).toBe(true);
    expect(jsonCall.data.recommendedTransport).toBe('Walk');
    expect(next).not.toHaveBeenCalled();
  });

  it('recommend returns 400 when stadium, currentLocation or destination is missing', async () => {
    const req = mockReq({
      stadium: 'MetLife Stadium',
      // currentLocation missing
      destination: 'Hotel',
    });
    const res = mockRes();

    await TransportController.recommend(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    const jsonCall = (res.json as ReturnType<typeof vi.fn>).mock.calls[0][0];
    expect(jsonCall.success).toBe(false);
    expect(jsonCall.message).toContain('required');
    expect(TransportService.recommend).not.toHaveBeenCalled();
  });

  it('recommend returns 400 when groupSize is invalid (less than 1)', async () => {
    const req = mockReq({
      stadium: 'MetLife Stadium',
      currentLocation: 'Gate 1',
      destination: 'Station',
      groupSize: 0,
    });
    const res = mockRes();

    await TransportController.recommend(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    const jsonCall = (res.json as ReturnType<typeof vi.fn>).mock.calls[0][0];
    expect(jsonCall.success).toBe(false);
    expect(jsonCall.message).toContain('positive number');
  });

  it('recommend forwards errors to next() on service error', async () => {
    const req = mockReq({
      stadium: 'MetLife Stadium',
      currentLocation: 'Gate 1',
      destination: 'Station',
    });
    const res = mockRes();
    const serviceError = new Error('Service down');
    vi.spyOn(TransportService, 'recommend').mockRejectedValueOnce(serviceError);

    await TransportController.recommend(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(serviceError);
  });
});
