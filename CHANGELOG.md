# Changelog

All notable changes to the @sourceparts/sdk will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-10-15

### Added
- Initial release of @sourceparts/sdk
- Products API module with search, get, categories, and manufacturers methods
- Quotes API module with full CRUD operations
- BOM API module with upload, pricing, and management features
- Orders API module with tracking and management
- Base API client with retry logic and error handling
- TypeScript support with full type definitions
- Comprehensive documentation and examples
- Authentication support (API key and Auth0 access tokens)
- Configurable timeout and retry settings

### Features
- Search products with advanced filtering
- Create and manage quotes
- Upload and manage BOMs (CSV/Excel support)
- Track orders and shipments
- Automatic request retries with exponential backoff
- Full TypeScript type safety
- Error handling with detailed error information

## [Unreleased]

### Planned Customer Features
- React hooks for easier integration (`useProducts`, `useQuotes`, `useBOM`)
- Request caching for better performance
- Request deduplication
- Optimistic updates support
- Real-time order status updates
- Enhanced error messages and recovery
- More product search filters
- Bulk quote operations
- BOM validation and suggestions
- Example projects and templates
