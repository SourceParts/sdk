/**
 * Storage Locations API Module
 */

import type { BaseAPIClient } from '../client/base-client';
import type { PaginationParams } from '../types';

export interface StorageLocationResult {
  id: string;
  warehouseId: string;
  warehouseName: string;
  locationCode: string;
  binNumber?: string;
  zone?: string;
  aisle?: string;
  rack?: string;
  shelf?: string;
  bin?: string;
  isActive: boolean;
  customFields?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface StorageLocationListParams extends PaginationParams {
  warehouseId?: string;
  search?: string;
  isActive?: boolean;
}

export interface PartStorageResult {
  locations: Array<{
    warehouseId: string;
    warehouseName: string;
    locationCode: string;
    quantityOnHand: number;
    quantityReserved: number;
    quantityAvailable: number;
    status: string;
  }>;
  totalQuantity: number;
  totalAvailable: number;
}

export class StorageAPI {
  constructor(private client: BaseAPIClient) {}

  async list(params: StorageLocationListParams = {}): Promise<{
    locations: StorageLocationResult[];
    pagination: { page: number; limit: number; total: number; totalPages: number };
  }> {
    return (this.client as any).get('/api/inventory/locations', params);
  }

  async get(id: string): Promise<StorageLocationResult> {
    return (this.client as any).get(`/api/inventory/locations/${id}`);
  }

  async getPartStorage(partId: string): Promise<PartStorageResult> {
    return (this.client as any).get(`/api/parts/${partId}/storage`);
  }
}
