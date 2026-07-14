type LogLevel = 'INFO' | 'DEBUG' | 'WARN' | 'ERROR';

interface LogPayload {
  timestamp: string;
  level: LogLevel;
  message: string;
  requestId?: string;
  executionTime?: number;
  metadata?: unknown;
  error?: string;
  stack?: string;
}

class StructuredLogger {
  private log(level: LogLevel, message: string, meta?: unknown, err?: unknown) {
    const payload: LogPayload = {
      timestamp: new Date().toISOString(),
      level,
      message,
    };

    if (meta) {
      // Extract specific top-level properties if they exist, otherwise keep them in metadata
      // Shallow copy to avoid mutating the original object
      const metaCopy: Record<string, unknown> = typeof meta === 'object' && meta !== null ? { ...(meta as Record<string, unknown>) } : { raw: meta };
      
      if (metaCopy.requestId) {
        payload.requestId = metaCopy.requestId as string;
        delete metaCopy.requestId;
      }
      
      if (metaCopy.executionTime !== undefined) {
        payload.executionTime = metaCopy.executionTime as number;
        delete metaCopy.executionTime;
      }

      if (Object.keys(metaCopy).length > 0) {
        payload.metadata = metaCopy;
      }
    }

    if (err) {
      if (err instanceof Error) {
        payload.error = err.message;
        if (err.stack) {
          payload.stack = err.stack;
        }
      } else {
        payload.error = String(err);
      }
    }

    // Output strict JSON
    const logString = JSON.stringify(payload);
    
    if (level === 'ERROR') {
      console.error(logString);
    } else if (level === 'WARN') {
      console.warn(logString);
    } else {
      console.log(logString);
    }
  }

  public info(message: string, meta?: unknown): void {
    this.log('INFO', message, meta);
  }

  public debug(message: string, meta?: unknown): void {
    if (process.env.NODE_ENV !== 'production') {
      this.log('DEBUG', message, meta);
    }
  }

  public warn(message: string, meta?: unknown): void {
    this.log('WARN', message, meta);
  }

  public error(message: string, errorOrMeta?: unknown): void {
    // Keep API backward compatible: aiLogger.error('msg', err) or aiLogger.error('msg', meta)
    if (errorOrMeta instanceof Error) {
      this.log('ERROR', message, undefined, errorOrMeta);
    } else {
      this.log('ERROR', message, errorOrMeta);
    }
  }
}

export const aiLogger = new StructuredLogger();
