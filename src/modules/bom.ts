/**
 * BOM (Bill of Materials) API Module
 */

import type { BaseAPIClient } from '../client/base-client';
import type { BOM, BOMItem, PaginationParams } from '../types';

export class BOMAPI {
  constructor(private client: BaseAPIClient) {}

  /**
   * List all BOMs
   */
  async list(params: PaginationParams = {}): Promise<{
    boms: BOM[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }> {
    return (this.client as any).get('/api/bom', params);
  }

  /**
   * Get a single BOM by ID
   */
  async get(id: string): Promise<BOM> {
    return (this.client as any).get(`/api/bom/${id}`);
  }

  /**
   * Create a new BOM
   */
  async create(params: {
    name: string;
    items: Omit<BOMItem, 'id'>[];
    notes?: string;
  }): Promise<BOM> {
    return (this.client as any).post('/api/bom', params);
  }

  /**
   * Update a BOM
   */
  async update(id: string, updates: Partial<BOM>): Promise<BOM> {
    return (this.client as any).patch(`/api/bom/${id}`, updates);
  }

  /**
   * Delete a BOM
   */
  async delete(id: string): Promise<void> {
    return (this.client as any).delete(`/api/bom/${id}`);
  }

  /**
   * Upload BOM from file (CSV/Excel)
   */
  async upload(file: File | Blob): Promise<BOM> {
    const formData = new FormData();
    formData.append('file', file);

    // Note: This will need special handling for multipart/form-data
    return (this.client as any).post('/api/bom/upload', formData);
  }

  /**
   * Get pricing for BOM
   */
  async getPricing(id: string): Promise<{
    totalCost: number;
    items: Array<{
      partNumber: string;
      quantity: number;
      unitPrice: number;
      totalPrice: number;
    }>;
  }> {
    return (this.client as any).get(`/api/bom/${id}/pricing`);
  }
}
