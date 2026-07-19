export class ApiError extends Error {
  public status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}

class TimeoutError extends Error {
  constructor(message = 'Request timed out') {
    super(message);
    this.name = 'TimeoutError';
  }
}

interface FetchOptions extends RequestInit {
  timeoutMs?: number;
  retries?: number;
}

export const apiClient = async <T>(url: string, options: FetchOptions = {}): Promise<T> => {
  const { timeoutMs = 15000, retries = 1, ...fetchOptions } = options;

  let attempt = 0;
  
  while (attempt <= retries) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...fetchOptions.headers,
        },
      });

      clearTimeout(id);

      if (!response.ok) {
        let errorMsg = response.statusText;
        try {
          const body = await response.json() as Record<string, unknown>;
          errorMsg = (body.message || body.error || errorMsg) as string;
        } catch {
          // Fallback to statusText
        }
        
        if (response.status >= 500 && attempt < retries) {
          attempt++;
          await new Promise(res => setTimeout(res, 1000 * attempt));
          continue;
        }

        throw new ApiError(response.status, errorMsg);
      }

      return (await response.json()) as T;
    } catch (error: unknown) {
      clearTimeout(id);
      if (error instanceof Error && error.name === 'AbortError') {
        if (attempt < retries) {
          attempt++;
          continue;
        }
        throw new TimeoutError();
      }
      if (attempt < retries) {
        attempt++;
        await new Promise(res => setTimeout(res, 1000 * attempt));
        continue;
      }
      throw error;
    }
  }
  
  throw new Error('Unknown API Error');
};
