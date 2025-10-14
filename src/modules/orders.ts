/**
 * Orders API Module
 */

import type { BaseAPIClient } from '../client/base-client';
import type { Order, PaginationParams } from '../types';

export class OrdersAPI {
  constructor(private client: BaseAPIClient) {}

  /**
   * List all orders
   */
  async list(params: PaginationParams & { status?: string } = {}): Promise<{
    orders: Order[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }> {
    return (this.client as any).get('/api/orders', params);
  }

  /**
   * Get a single order by ID
   */
  async get(id: string): Promise<Order> {
    return (this.client as any).get(`/api/orders/${id}`);
  }

  /**
   * Get order tracking information
   */
  async getTracking(id: string): Promise<{
    trackingNumber?: string;
    carrier?: string;
    status: string;
    estimatedDelivery?: string;
  }> {
    return (this.client as any).get(`/api/orders/${id}/tracking`);
  }

  /**
   * Cancel an order
   */
  async cancel(id: string): Promise<void> {
    return (this.client as any).post(`/api/orders/${id}/cancel`);
  }
}
