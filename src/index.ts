/**
 * @sourceparts/sdk - Official TypeScript SDK for Source Parts API
 *
 * @example
 * ```typescript
 * import { SourcePartsSDK } from '@sourceparts/sdk';
 *
 * // Initialize SDK
 * const sdk = new SourcePartsSDK({
 *   apiKey: 'your-api-key',
 *   baseUrl: 'https://source.parts' // optional
 * });
 *
 * // Search for products
 * const products = await sdk.products.search({
 *   query: 'resistor',
 *   category: 'passive-components'
 * });
 *
 * // Get a quote
 * const quote = await sdk.quotes.get('quote-id');
 *
 * // Upload a BOM
 * const bom = await sdk.bom.upload(file);
 * ```
 */

// Export main SDK class
export { SourcePartsSDK } from './client/sdk-client';

// Export types
export type {
  SDKConfig,
  APIResponse,
  APIError,
  PaginationParams,
  SearchParams,
  Product,
  ProductSearchParams,
  Quote,
  QuoteItem,
  CreateQuoteParams,
  BOM,
  BOMItem,
  Order,
  OrderItem,
  Address,
  User,
} from './types';

// Export API modules for advanced usage
export { ProductsAPI } from './modules/products';
export { QuotesAPI } from './modules/quotes';
export { BOMAPI } from './modules/bom';
export { OrdersAPI } from './modules/orders';

// Default export
import { SourcePartsSDK } from './client/sdk-client';
export default SourcePartsSDK;
