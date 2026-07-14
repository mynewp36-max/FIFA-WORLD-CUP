import { Request } from 'express';
import crypto from 'crypto';

export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T | null;
  message: string;
  requestId: string;
  timestamp: string;
}

const generateRequestId = () => crypto.randomUUID();

export const sendResponse = <T>(
  req: Request,
  success: boolean,
  data: T | null = null,
  message: string = ''
): ApiResponse<T> => {
  // Use existing requestId if attached to request (e.g., from a logger middleware), otherwise generate one
  const requestId = req.requestId || generateRequestId();

  return {
    success,
    data,
    message,
    requestId,
    timestamp: new Date().toISOString(),
  };
};
