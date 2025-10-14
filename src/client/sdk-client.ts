/**
 * Main SDK Client
 * Provides access to all API modules
 */

import { BaseAPIClient } from './base-client';
import { ProductsAPI } from '../modules/products';
import { QuotesAPI } from '../modules/quotes';
import { BOMAPI } from '../modules/bom';
import { OrdersAPI } from '../modules/orders';
import type { SDKConfig } from '../types';

export class SourcePartsSDK extends BaseAPIClient {
  public readonly products: ProductsAPI;
  public readonly quotes: QuotesAPI;
  public readonly bom: BOMAPI;
  public readonly orders: OrdersAPI;

  constructor(config: SDKConfig = {}) {
    super(config);

    // Initialize all API modules
    this.products = new ProductsAPI(this);
    this.quotes = new QuotesAPI(this);
    this.bom = new BOMAPI(this);
    this.orders = new OrdersAPI(this);
  }

  /**
   * Set access token for authenticated requests
   * Updates the token for all subsequent requests
   */
  setAccessToken(token: string): void {
    super.setAccessToken(token);
  }
}
