/**
 * Inventory API Module
 */

import type { BaseAPIClient } from '../client/base-client';
import type { PaginationParams } from '../types';

export interface StockAddParams {
  productId: string;
  warehouseId: string;
  quantity: number;
  lotNumber?: string;
  batchNumber?: string;
  unitCost?: number;
  notes?: string;
}

export interface StockRemoveParams {
  productId: string;
  warehouseId: string;
  quantity: number;
  reason?: string;
  notes?: string;
}

export interface StockMoveParams {
  productId: string;
  fromWarehouseId?: string;
  toWarehouseId?: string;
  fromLocationId?: string;
  toLocationId?: string;
  quantity: number;
  notes?: string;
}

export interface InventoryLocationResult {
  id: string;
  warehouseId: string;
  warehouseName: string;
  productId: string;
  productName: string;
  productSku: string;
  quantityOnHand: number;
  quantityReserved: number;
  quantityAvailable: number;
  status: string;
  locationCode?: string;
  binNumber?: string;
}

export interface InventoryMovementResult {
  id: string;
  movementType: string;
  quantity: number;
  warehouseId: string;
  productId: string;
  createdAt: string;
}

export interface InventoryListParams extends PaginationParams {
  warehouseId?: string;
  productId?: string;
  status?: string;
  search?: string;
}

export class InventoryAPI {
  constructor(private client: BaseAPIClient) {}

  async list(params: InventoryListParams = {}): Promise<{
    locations: InventoryLocationResult[];
    pagination: { page: number; limit: number; total: number; totalPages: number };
  }> {
    return (this.client as any).get('/api/inventory', params);
  }

  async getLocation(id: string): Promise<InventoryLocationResult> {
    return (this.client as any).get(`/api/inventory/locations/${id}`);
  }

  async addStock(params: StockAddParams): Promise<{ success: boolean; movement: InventoryMovementResult }> {
    return (this.client as any).post('/api/inventory/stock/add', params);
  }

  async removeStock(params: StockRemoveParams): Promise<{ success: boolean; movement: InventoryMovementResult }> {
    return (this.client as any).post('/api/inventory/stock/remove', params);
  }

  async moveStock(params: StockMoveParams): Promise<{ success: boolean; movement: InventoryMovementResult }> {
    return (this.client as any).post('/api/inventory/stock/move', params);
  }

  async getMovements(params: PaginationParams & { warehouseId?: string; productId?: string } = {}): Promise<{
    movements: InventoryMovementResult[];
    pagination: { page: number; limit: number; total: number; totalPages: number };
  }> {
    return (this.client as any).get('/api/inventory/movements', params);
  }

  async getLowStock(params: PaginationParams = {}): Promise<{
    lowStockItems: Array<{
      productId: string;
      productName: string;
      sku: string;
      totalAvailable: number;
      warehouseCount: number;
    }>;
  }> {
    return (this.client as any).get('/api/inventory/low-stock', params);
  }

  async getStats(): Promise<{
    totalLocations: number;
    totalQuantity: number;
    totalValue: number;
    lowStockCount: number;
  }> {
    return (this.client as any).get('/api/inventory/stats');
  }
}
