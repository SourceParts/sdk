/**
 * Products API Module
 */

import type { BaseAPIClient } from '../client/base-client';
import type { Product, ProductSearchParams } from '../types';

export class ProductsAPI {
  constructor(private client: BaseAPIClient) {}

  /**
   * Search products
   */
  async search(params: ProductSearchParams = {}): Promise<{
    products: Product[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }> {
    return (this.client as any).get('/api/products/search', params);
  }

  /**
   * Get a single product by SKU
   */
  async get(sku: string): Promise<Product> {
    return (this.client as any).get(`/api/products/${sku}`);
  }

  /**
   * Get product categories
   */
  async getCategories(): Promise<string[]> {
    const response = await (this.client as any).get('/api/products/categories');
    return response.categories || [];
  }

  /**
   * Get product manufacturers
   */
  async getManufacturers(): Promise<string[]> {
    const response = await (this.client as any).get('/api/products/manufacturers');
    return response.manufacturers || [];
  }
}
