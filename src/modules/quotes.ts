/**
 * Quotes API Module
 */

import type { BaseAPIClient } from '../client/base-client';
import type { Quote, CreateQuoteParams, PaginationParams } from '../types';

export class QuotesAPI {
  constructor(private client: BaseAPIClient) {}

  /**
   * List all quotes
   */
  async list(params: PaginationParams = {}): Promise<{
    quotes: Quote[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }> {
    return (this.client as any).get('/api/quotes', params);
  }

  /**
   * Get a single quote by ID
   */
  async get(id: string): Promise<Quote> {
    return (this.client as any).get(`/api/quotes/${id}`);
  }

  /**
   * Create a new quote
   */
  async create(params: CreateQuoteParams): Promise<Quote> {
    return (this.client as any).post('/api/quotes', params);
  }

  /**
   * Update a quote
   */
  async update(id: string, updates: Partial<CreateQuoteParams>): Promise<Quote> {
    return (this.client as any).patch(`/api/quotes/${id}`, updates);
  }

  /**
   * Delete a quote
   */
  async delete(id: string): Promise<void> {
    return (this.client as any).delete(`/api/quotes/${id}`);
  }

  /**
   * Send a quote to a customer
   */
  async send(id: string, email?: string): Promise<void> {
    return (this.client as any).post(`/api/quotes/${id}/send`, { email });
  }

  /**
   * Convert quote to order
   */
  async convertToOrder(id: string): Promise<{ orderId: string }> {
    return (this.client as any).post(`/api/quotes/${id}/convert`);
  }
}
