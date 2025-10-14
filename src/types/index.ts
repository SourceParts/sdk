/**
 * Core SDK Types
 */

export interface SDKConfig {
  /**
   * Base URL for the Source Parts API
   * @example "https://source.parts"
   */
  baseUrl?: string;

  /**
   * API Key for authentication
   */
  apiKey?: string;

  /**
   * Optional access token for user-authenticated requests
   */
  accessToken?: string;

  /**
   * Request timeout in milliseconds
   * @default 30000
   */
  timeout?: number;

  /**
   * Retry configuration
   */
  retry?: {
    attempts?: number;
    delay?: number;
  };
}

export interface APIResponse<T = any> {
  data: T;
  status: number;
  ok: boolean;
}

export interface APIError {
  message: string;
  code?: string;
  status?: number;
  details?: Record<string, any>;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  offset?: number;
}

export interface SearchParams extends PaginationParams {
  query?: string;
  sort?: string;
}

/**
 * Product Types
 */
export interface Product {
  sku: string;
  name: string;
  description?: string;
  manufacturer?: string;
  category?: string;
  price?: number;
  inStock?: boolean;
  imageUrl?: string;
  specifications?: Record<string, any>;
  tags?: string[];
}

export interface ProductSearchParams extends SearchParams {
  category?: string;
  manufacturer?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  tags?: string[];
}

/**
 * Quote Types
 */
export interface Quote {
  id: string;
  customerId: string;
  status: string;
  items: QuoteItem[];
  total?: number;
  createdAt: string;
  updatedAt: string;
}

export interface QuoteItem {
  id: string;
  sku: string;
  quantity: number;
  price?: number;
  description?: string;
}

export interface CreateQuoteParams {
  customerId?: string;
  items: Array<{
    sku: string;
    quantity: number;
    description?: string;
  }>;
  notes?: string;
}

/**
 * BOM (Bill of Materials) Types
 */
export interface BOM {
  id: string;
  name: string;
  customerId: string;
  status: string;
  items: BOMItem[];
  createdAt: string;
  updatedAt: string;
}

export interface BOMItem {
  id: string;
  partNumber: string;
  quantity: number;
  description?: string;
  manufacturer?: string;
  specifications?: Record<string, any>;
}

/**
 * Order Types
 */
export interface Order {
  id: string;
  customerId: string;
  status: string;
  items: OrderItem[];
  total: number;
  shippingAddress?: Address;
  billingAddress?: Address;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  sku: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Address {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

/**
 * User Types
 */
export interface User {
  id: string;
  email: string;
  name?: string;
  companyId?: string;
  roles?: string[];
  createdAt: string;
}
