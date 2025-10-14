# @sourceparts/sdk

[![npm version](https://img.shields.io/npm/v/@sourceparts/sdk.svg)](https://www.npmjs.com/package/@sourceparts/sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://github.com/sourceparts/sdk/workflows/CI/badge.svg)](https://github.com/sourceparts/sdk/actions)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/)

The official TypeScript SDK for Source Parts. **Streamline your electronics sourcing workflow** with easy-to-use APIs for product search, instant quotes, BOM management, and order tracking - all in just a few lines of code.

> **Building in the Open** 🚀 - We believe in transparency and collaboration. This SDK is developed openly, and we'd love your feedback and contributions to make it even better!

**What You Can Do:**
- 🔍 Search our catalog of millions of electronic components
- 💰 Get instant quotes for your parts
- 📋 Upload and manage your BOMs
- 📦 Track your orders in real-time

## Installation

```bash
pnpm add @sourceparts/sdk
```

or

```bash
npm install @sourceparts/sdk
```

or

```bash
yarn add @sourceparts/sdk
```

## Quick Start

Get up and running in seconds! Here's how easy it is to search for parts:

```typescript
import { SourcePartsSDK } from '@sourceparts/sdk';

// Initialize with your API key
const sdk = new SourcePartsSDK({
  apiKey: 'your-api-key-here',
});

// Find resistors in stock
const { products } = await sdk.products.search({
  query: 'resistor',
  category: 'passive-components',
  inStock: true,
});

// That's it! You now have your results
console.log(`Found ${products.length} resistors in stock!`);
```

## Configuration

### Simple Setup

Most of the time, this is all you need:

```typescript
const sdk = new SourcePartsSDK({
  apiKey: 'your-api-key',
});
```

### Need More Control?

Customize timeouts and retry behavior for your specific needs:

```typescript
const sdk = new SourcePartsSDK({
  apiKey: 'your-api-key',
  timeout: 30000,     // Wait up to 30 seconds for responses
  retry: {
    attempts: 3,      // Retry failed requests up to 3 times
    delay: 1000,      // Wait 1 second between retries
  },
});
```

### Team & Company Portals

Building an internal portal for your engineering team? Authenticate users individually:

```typescript
const sdk = new SourcePartsSDK({
  apiKey: 'your-company-api-key',
  accessToken: 'team-member-token',  // Each team member's Auth0 token
});

// Update when switching users or refreshing tokens
sdk.setAccessToken('team-member-token');
```

This allows you to track which team member placed orders, created quotes, etc.

## What Can You Build?

The SDK gives you everything you need to integrate Source Parts into your workflow:

### 🔍 Product Search

Find exactly what you need from our catalog:

```typescript
const result = await sdk.products.search({
  query: 'resistor',
  category: 'passive-components',
  manufacturer: 'Yageo',
  minPrice: 0.01,
  maxPrice: 1.0,
  inStock: true,
  limit: 50,
  offset: 0,
});

console.log(result.products);
console.log(result.pagination);
```

#### Get Single Product

```typescript
const product = await sdk.products.get('SKU-12345');
console.log(product.name);
console.log(product.price);
console.log(product.specifications);
```

#### Get Categories

```typescript
const categories = await sdk.products.getCategories();
console.log(categories); // ['passive-components', 'active-components', ...]
```

#### Get Manufacturers

```typescript
const manufacturers = await sdk.products.getManufacturers();
console.log(manufacturers); // ['Yageo', 'Vishay', ...]
```

### Quotes

#### List Quotes

```typescript
const result = await sdk.quotes.list({
  page: 1,
  limit: 20,
});

console.log(result.quotes);
console.log(result.pagination);
```

#### Get Single Quote

```typescript
const quote = await sdk.quotes.get('quote-123');
console.log(quote.items);
console.log(quote.total);
```

#### Create Quote

```typescript
const newQuote = await sdk.quotes.create({
  customerId: 'customer-456',
  items: [
    {
      sku: 'SKU-12345',
      quantity: 100,
      description: '0805 Resistor 10kΩ',
    },
    {
      sku: 'SKU-67890',
      quantity: 50,
      description: '0603 Capacitor 100nF',
    },
  ],
  notes: 'Urgent order for prototype',
});

console.log(newQuote.id);
```

#### Update Quote

```typescript
const updated = await sdk.quotes.update('quote-123', {
  items: [
    {
      sku: 'SKU-12345',
      quantity: 150, // Updated quantity
    },
  ],
});
```

#### Delete Quote

```typescript
await sdk.quotes.delete('quote-123');
```

#### Send Quote

```typescript
await sdk.quotes.send('quote-123', 'customer@example.com');
```

#### Convert Quote to Order

```typescript
const result = await sdk.quotes.convertToOrder('quote-123');
console.log(result.orderId);
```

### BOM (Bill of Materials)

#### List BOMs

```typescript
const result = await sdk.bom.list({
  page: 1,
  limit: 20,
});

console.log(result.boms);
```

#### Get Single BOM

```typescript
const bom = await sdk.bom.get('bom-123');
console.log(bom.items);
```

#### Create BOM

```typescript
const newBom = await sdk.bom.create({
  name: 'Prototype v1.0',
  items: [
    {
      partNumber: 'RC0805FR-0710KL',
      quantity: 100,
      description: '10kΩ Resistor',
      manufacturer: 'Yageo',
    },
    {
      partNumber: 'C0603C104K5RACTU',
      quantity: 50,
      description: '100nF Capacitor',
      manufacturer: 'Kemet',
    },
  ],
  notes: 'Initial prototype BOM',
});
```

#### Upload BOM from File

```typescript
// In browser
const fileInput = document.querySelector('input[type="file"]');
const file = fileInput.files[0];
const bom = await sdk.bom.upload(file);

// In Node.js
import fs from 'fs';
const fileBuffer = fs.readFileSync('bom.csv');
const blob = new Blob([fileBuffer]);
const bom = await sdk.bom.upload(blob);
```

#### Get BOM Pricing

```typescript
const pricing = await sdk.bom.getPricing('bom-123');
console.log(pricing.totalCost);
console.log(pricing.items);
```

#### Update BOM

```typescript
const updated = await sdk.bom.update('bom-123', {
  name: 'Prototype v1.1',
});
```

#### Delete BOM

```typescript
await sdk.bom.delete('bom-123');
```

### Orders

#### List Orders

```typescript
const result = await sdk.orders.list({
  status: 'pending',
  page: 1,
  limit: 20,
});

console.log(result.orders);
```

#### Get Single Order

```typescript
const order = await sdk.orders.get('order-123');
console.log(order.status);
console.log(order.items);
console.log(order.total);
```

#### Get Order Tracking

```typescript
const tracking = await sdk.orders.getTracking('order-123');
console.log(tracking.trackingNumber);
console.log(tracking.carrier);
console.log(tracking.status);
console.log(tracking.estimatedDelivery);
```

#### Cancel Order

```typescript
await sdk.orders.cancel('order-123');
```

## Error Handling

The SDK throws errors that include detailed information:

```typescript
try {
  const product = await sdk.products.get('invalid-sku');
} catch (error) {
  console.error(error.message); // Human-readable error message
  console.error(error.status); // HTTP status code
  console.error(error.code); // Error code from API
  console.error(error.details); // Additional error details
}
```

## TypeScript Support

The SDK is written in TypeScript and includes full type definitions:

```typescript
import { SourcePartsSDK, Product, Quote, BOM } from '@sourceparts/sdk';

const sdk = new SourcePartsSDK({ apiKey: 'key' });

// All responses are fully typed
const products: Product[] = (await sdk.products.search({})).products;
const quote: Quote = await sdk.quotes.get('quote-123');
const bom: BOM = await sdk.bom.get('bom-123');
```

## Advanced Usage

### Custom Headers

```typescript
// Access the base request method for custom requests
const response = await sdk.request('POST', '/api/custom-endpoint', {
  body: { custom: 'data' },
  headers: { 'X-Custom-Header': 'value' },
});
```

### Retry Configuration

```typescript
const sdk = new SourcePartsSDK({
  apiKey: 'your-api-key',
  retry: {
    attempts: 5, // Retry up to 5 times
    delay: 2000, // Wait 2 seconds between retries (with exponential backoff)
  },
});
```

### Timeout Configuration

```typescript
const sdk = new SourcePartsSDK({
  apiKey: 'your-api-key',
  timeout: 60000, // 60 second timeout
});
```

## Examples

### Complete Product Search Example

```typescript
import { SourcePartsSDK } from '@sourceparts/sdk';

const sdk = new SourcePartsSDK({
  apiKey: process.env.SOURCEPARTS_API_KEY,
});

async function searchResistors() {
  try {
    const result = await sdk.products.search({
      query: 'resistor',
      category: 'passive-components',
      manufacturer: 'Yageo',
      inStock: true,
      minPrice: 0.01,
      maxPrice: 0.5,
      limit: 100,
    });

    console.log(`Found ${result.pagination.total} resistors`);

    for (const product of result.products) {
      console.log(`${product.sku}: ${product.name} - $${product.price}`);
    }
  } catch (error) {
    console.error('Search failed:', error.message);
  }
}

searchResistors();
```

### Complete Quote Management Example

```typescript
import { SourcePartsSDK } from '@sourceparts/sdk';

const sdk = new SourcePartsSDK({
  apiKey: process.env.SOURCEPARTS_API_KEY,
  accessToken: process.env.USER_ACCESS_TOKEN,
});

async function createAndSendQuote() {
  try {
    // Create quote
    const quote = await sdk.quotes.create({
      items: [
        { sku: 'SKU-12345', quantity: 100 },
        { sku: 'SKU-67890', quantity: 50 },
      ],
      notes: 'Prototype order',
    });

    console.log(`Quote created: ${quote.id}`);

    // Send to customer
    await sdk.quotes.send(quote.id, 'customer@example.com');
    console.log('Quote sent to customer');

    // Convert to order when approved
    const result = await sdk.quotes.convertToOrder(quote.id);
    console.log(`Order created: ${result.orderId}`);
  } catch (error) {
    console.error('Quote workflow failed:', error.message);
  }
}

createAndSendQuote();
```

## Requirements

- Node.js 16+ or modern browser with Fetch API support
- TypeScript 5.0+ (for TypeScript projects)

## License

MIT

## Support

- Documentation: https://source.parts/docs
- API Reference: https://source.parts/api-docs
- Issues: https://github.com/sourceparts/sdk/issues
- Email: support@source.parts

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.
