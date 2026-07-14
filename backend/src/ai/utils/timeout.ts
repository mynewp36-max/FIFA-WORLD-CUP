import { TimeoutError } from '../../utils/errors';
import { aiLogger } from './logger';

/**
 * Reusable utility to enforce a strict maximum execution time on any asynchronous operation.
 * If the operation exceeds the timeoutMs, it forcefully throws a TimeoutError, terminating
 * the wait and returning a graceful failure to the client.
 */
export const withTimeout = async <T>(
  operation: () => Promise<T>,
  timeoutMs: number,
  context: string = 'Operation'
): Promise<T> => {
  let timer: NodeJS.Timeout;
  
  const timeoutPromise = new Promise<never>((_, reject) => {
    timer = setTimeout(() => {
      aiLogger.warn(`[Timeout Enforced] ${context} exceeded the maximum allowed time of ${timeoutMs}ms.`);
      reject(new TimeoutError(`The AI response took too long to generate (Max ${timeoutMs / 1000}s). Please try asking again.`));
    }, timeoutMs);
  });

  try {
    // Race the actual operation against the ticking timeout clock
    return await Promise.race([operation(), timeoutPromise]);
  } finally {
    // Always clean up the timeout if the operation succeeds quickly enough
    clearTimeout(timer!);
  }
};
