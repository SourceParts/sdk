/**
 * Base API Client
 * Handles HTTP requests with automatic retry, error handling, and authentication
 */

import type { SDKConfig, APIResponse, APIError } from '../types';

export class BaseAPIClient {
  private baseUrl: string;
  private apiKey?: string;
  private accessToken?: string;
  private timeout: number;
  private retryAttempts: number;
  private retryDelay: number;

  constructor(config: SDKConfig = {}) {
    this.baseUrl = config.baseUrl || 'https://source.parts';
    this.apiKey = config.apiKey;
    this.accessToken = config.accessToken;
    this.timeout = config.timeout || 30000;
    this.retryAttempts = config.retry?.attempts || 3;
    this.retryDelay = config.retry?.delay || 1000;
  }

  /**
   * Set access token for authenticated requests
   */
  setAccessToken(token: string): void {
    this.accessToken = token;
  }

  /**
   * Get headers for API requests
   */
  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.apiKey) {
      headers['X-API-Key'] = this.apiKey;
    }

    if (this.accessToken) {
      headers['Authorization'] = `Bearer ${this.accessToken}`;
    }

    return headers;
  }

  /**
   * Make HTTP request with retry logic
   */
  protected async request<T>(
    method: string,
    path: string,
    options: {
      body?: any;
      params?: Record<string, string | number | boolean | undefined>;
      headers?: Record<string, string>;
    } = {}
  ): Promise<APIResponse<T>> {
    const url = new URL(path, this.baseUrl);

    // Add query parameters
    if (options.params) {
      Object.entries(options.params).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    const requestInit: RequestInit = {
      method,
      headers: {
        ...this.getHeaders(),
        ...options.headers,
      },
    };

    if (options.body && method !== 'GET') {
      requestInit.body = JSON.stringify(options.body);
    }

    // Implement retry logic
    let lastError: Error | null = null;
    for (let attempt = 0; attempt < this.retryAttempts; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        const response = await fetch(url.toString(), {
          ...requestInit,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        const data = await response.json();

        if (!response.ok) {
          throw this.createAPIError(response, data);
        }

        return {
          data,
          status: response.status,
          ok: response.ok,
        };
      } catch (error) {
        lastError = error as Error;

        // Don't retry on client errors (4xx)
        if (error instanceof Error && (error as any).status >= 400 && (error as any).status < 500) {
          throw error;
        }

        // Wait before retrying
        if (attempt < this.retryAttempts - 1) {
          await this.sleep(this.retryDelay * Math.pow(2, attempt));
        }
      }
    }

    throw lastError || new Error('Request failed after retries');
  }

  /**
   * Create API error from response
   */
  private createAPIError(response: Response, data: any): APIError & Error {
    const error: any = new Error(
      data.error || data.message || `API Error: ${response.status}`
    );
    error.status = response.status;
    error.code = data.code;
    error.details = data.details;
    return error;
  }

  /**
   * Sleep utility for retry delays
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Convenience methods
   */
  protected async get<T>(path: string, params?: Record<string, any>): Promise<T> {
    const response = await this.request<T>('GET', path, { params });
    return response.data;
  }

  protected async post<T>(path: string, body?: any): Promise<T> {
    const response = await this.request<T>('POST', path, { body });
    return response.data;
  }

  protected async put<T>(path: string, body?: any): Promise<T> {
    const response = await this.request<T>('PUT', path, { body });
    return response.data;
  }

  protected async patch<T>(path: string, body?: any): Promise<T> {
    const response = await this.request<T>('PATCH', path, { body });
    return response.data;
  }

  protected async delete<T>(path: string): Promise<T> {
    const response = await this.request<T>('DELETE', path);
    return response.data;
  }
}
