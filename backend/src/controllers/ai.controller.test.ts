import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { AiController } from './ai.controller';
import { AiService } from '../ai/services/ai.service';
import { contextManager } from '../ai/context/context.manager';
import { Request, Response, NextFunction } from 'express';

const mockReq = (body: unknown = {}): Partial<Request> => ({
  body,
  ip: '127.0.0.1',
  method: 'POST',
  originalUrl: '/api/ai/chat',
  requestId: 'req-id-123',
});

const mockRes = (): Partial<Response> => {
  const res: Partial<Response> = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

describe('AiController', () => {
  let next: NextFunction;

  beforeEach(() => {
    next = vi.fn();
    vi.spyOn(AiService, 'generateResponse').mockResolvedValue('AI response message');
    vi.spyOn(contextManager, 'updateContext').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('handleChat successfully generates response, updates context and returns 200', async () => {
    const req = mockReq({
      message: 'Hello AI',
      language: 'Spanish',
      userRole: 'Organizer',
      stadium: 'Stadium A',
      match: 'Match 1',
      accessibility: true,
    });
    const res = mockRes();

    await AiController.handleChat(req as Request, res as Response, next);

    expect(contextManager.updateContext).toHaveBeenCalledWith('127.0.0.1', {
      role: 'organizer',
      preferredLanguage: 'Spanish',
      stadium: 'Stadium A',
      match: 'Match 1',
      accessibilityPreferences: ['Assistance required'],
    });

    expect(AiService.generateResponse).toHaveBeenCalledWith('127.0.0.1', 'Hello AI');
    expect(res.status).toHaveBeenCalledWith(200);
    const jsonCall = (res.json as ReturnType<typeof vi.fn>).mock.calls[0][0];
    expect(jsonCall.success).toBe(true);
    expect(jsonCall.data).toEqual({
      reply: 'AI response message',
      language: 'Spanish',
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('handleChat handles optional fields gracefully when accessibility is false', async () => {
    const req = mockReq({
      message: 'Hello AI',
      accessibility: false,
    });
    const res = mockRes();

    await AiController.handleChat(req as Request, res as Response, next);

    expect(contextManager.updateContext).toHaveBeenCalledWith('127.0.0.1', {
      accessibilityPreferences: [],
    });
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('handleChat forwards errors to next() on service failure', async () => {
    const req = mockReq({ message: 'Hello AI' });
    const res = mockRes();
    const serviceError = new Error('Service Failure');
    vi.spyOn(AiService, 'generateResponse').mockRejectedValueOnce(serviceError);

    await AiController.handleChat(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(serviceError);
    expect(res.status).not.toHaveBeenCalled();
  });
});
