/**
 * Lots API Module
 */

import type { BaseAPIClient } from '../client/base-client';
import type { PaginationParams } from '../types';

export interface LotResult {
  id: string;
  lotNumber: string;
  name?: string;
  description?: string;
  productId: string;
  productName?: string;
  warehouseId: string;
  quantity: number;
  remainingQuantity: number;
  status: string;
  qualityStatus: string;
  manufactureDate?: string;
  expiryDate?: string;
  unitCost?: number;
  tags?: string[];
  customFields?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface CreateLotParams {
  lotNumber?: string;
  name?: string;
  description?: string;
  productId: string;
  warehouseId: string;
  quantity: number;
  qualityStatus?: string;
  manufactureDate?: string;
  expiryDate?: string;
  unitCost?: number;
  tags?: string[];
  customFields?: Record<string, any>;
  notes?: string;
}

export interface UpdateLotParams {
  name?: string;
  description?: string;
  status?: string;
  qualityStatus?: string;
  expiryDate?: string;
  tags?: string[];
  customFields?: Record<string, any>;
  notes?: string;
}

export interface LotListParams extends PaginationParams {
  productId?: string;
  warehouseId?: string;
  status?: string;
  qualityStatus?: string;
  expiringWithinDays?: number;
  search?: string;
}

export class LotsAPI {
  constructor(private client: BaseAPIClient) {}

  async list(params: LotListParams = {}): Promise<{
    lots: LotResult[];
    pagination: { page: number; limit: number; total: number; totalPages: number };
  }> {
    return (this.client as any).get('/api/lots', params);
  }

  async get(id: string): Promise<LotResult> {
    return (this.client as any).get(`/api/lots/${id}`);
  }

  async create(params: CreateLotParams): Promise<LotResult> {
    return (this.client as any).post('/api/lots', params);
  }

  async update(id: string, params: UpdateLotParams): Promise<LotResult> {
    return (this.client as any).put(`/api/lots/${id}`, params);
  }

  async delete(id: string): Promise<{ success: boolean }> {
    return (this.client as any).delete(`/api/lots/${id}`);
  }

  async getByPart(partId: string, params: PaginationParams = {}): Promise<{
    lots: LotResult[];
    pagination: { page: number; limit: number; total: number; totalPages: number };
  }> {
    return (this.client as any).get(`/api/parts/${partId}/lots`, params);
  }
}
