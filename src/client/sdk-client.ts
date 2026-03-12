/**
 * Main SDK Client
 * Provides access to all API modules
 */

import { BaseAPIClient } from './base-client';
import { ProductsAPI } from '../modules/products';
import { QuotesAPI } from '../modules/quotes';
import { BOMAPI } from '../modules/bom';
import { OrdersAPI } from '../modules/orders';
import { InventoryAPI } from '../modules/inventory';
import { LotsAPI } from '../modules/lots';
import { StorageAPI } from '../modules/storage';
import type { SDKConfig } from '../types';

export class SourcePartsSDK extends BaseAPIClient {
  public readonly products: ProductsAPI;
  public readonly quotes: QuotesAPI;
  public readonly bom: BOMAPI;
  public readonly orders: OrdersAPI;
  public readonly inventory: InventoryAPI;
  public readonly lots: LotsAPI;
  public readonly storage: StorageAPI;

  constructor(config: SDKConfig = {}) {
    super(config);

    // Initialize all API modules
    this.products = new ProductsAPI(this);
    this.quotes = new QuotesAPI(this);
    this.bom = new BOMAPI(this);
    this.orders = new OrdersAPI(this);
    this.inventory = new InventoryAPI(this);
    this.lots = new LotsAPI(this);
    this.storage = new StorageAPI(this);
  }

  /**
   * Set access token for authenticated requests
   * Updates the token for all subsequent requests
   */
  setAccessToken(token: string): void {
    super.setAccessToken(token);
  }
}
