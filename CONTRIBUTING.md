# Contributing to @sourceparts/sdk

Thank you for your interest in contributing to the Source Parts SDK! We welcome contributions from the community.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

## Getting Started

### Prerequisites

- Node.js 16+ or 18+
- Git
- TypeScript knowledge

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR-USERNAME/sdk.git
   cd sdk
   ```
3. Add upstream remote:
   ```bash
   git remote add upstream https://github.com/sourceparts/sdk.git
   ```

### Install Dependencies

```bash
pnpm install
```

### Build the SDK

```bash
pnpm run build
```

## Development Workflow

### Creating a Branch

Always create a new branch for your work:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Adding or updating tests

### Making Changes

1. **Write Clear Code**: Follow the existing code style
2. **Add Types**: Ensure all code is properly typed
3. **Document**: Add JSDoc comments for public APIs
4. **Test**: Add or update tests for your changes (when tests are added)

### Code Style

We use TypeScript and follow these conventions:

- **camelCase** for variables and functions
- **PascalCase** for classes and types
- **UPPER_CASE** for constants
- **Meaningful names** - No abbreviations unless widely known
- **2 spaces** for indentation
- **Single quotes** for strings
- **Semicolons** required

Example:

```typescript
/**
 * Search for products with the given parameters
 * @param params - Search parameters
 * @returns Promise with products and pagination
 */
async search(params: ProductSearchParams): Promise<SearchResult> {
  return this.client.get('/api/products/search', params);
}
```

### Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

Examples:

```
feat: add support API module
fix: handle network errors in retry logic
docs: update README with new examples
refactor: simplify error handling
test: add unit tests for products module
```

### Testing (Coming Soon)

When tests are added, run them before committing:

```bash
pnpm test
pnpm run test:watch  # Watch mode
pnpm run test:coverage  # With coverage
```

## Submitting Changes

### Before Submitting

1. **Build successfully**: `pnpm run build`
2. **Lint your code**: `pnpm run lint` (when added)
3. **Test your changes**: `pnpm test` (when added)
4. **Update documentation**: Update README.md if needed
5. **Update CHANGELOG**: Add entry to CHANGELOG.md

### Pull Request Process

1. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create Pull Request**:
   - Go to GitHub and create a PR from your fork
   - Use a clear title following conventional commits
   - Fill out the PR template (describe your changes)
   - Link any related issues

3. **PR Title Format**:
   ```
   feat: add support tickets API module
   fix: correct retry logic for 429 errors
   docs: improve installation instructions
   ```

4. **PR Description Should Include**:
   - What changed and why
   - How to test the changes
   - Screenshots (if UI related)
   - Breaking changes (if any)

5. **Wait for Review**:
   - Maintainers will review your PR
   - Address any feedback
   - Once approved, it will be merged

## What to Contribute

### Good First Issues

Look for issues tagged with `good first issue` - these are great starting points!

### Ideas for Contributions

**High-Value Customer Features:**
- **Team Management**: APIs for managing team members and permissions
- **Document Requests**: RFQ and technical documentation workflows
- **Inventory Tracking**: Track your own inventory alongside Source Parts data
- **Webhook Support**: Real-time notifications for orders, quotes, shipments
- **React Hooks**: Add hooks like `useProducts`, `useQuotes`, `useBOM`
- **Error Handling**: Better error messages and recovery strategies
- **Performance**: Request caching, deduplication, optimization
- **Developer Experience**: Better debugging, logging, development tools

**Documentation & Examples:**
- More real-world use case examples
- Integration guides (Next.js, React, Node.js)
- Best practices and patterns
- Enhanced TypeScript definitions
- Video tutorials and walkthroughs

**What We're NOT Looking For:**
- Internal admin or backend management features
- Features unrelated to sourcing, quoting, or ordering workflows

### Proposing New Features

1. **Check existing issues** - Someone may have already suggested it
2. **Open a discussion** - Create an issue to discuss the feature
3. **Wait for approval** - Get feedback before implementing
4. **Implement** - Once approved, start working on it

## API Module Template

When adding a new API module, use this template:

```typescript
/**
 * [Module Name] API Module
 */

import type { BaseAPIClient } from '../client/base-client';
import type { PaginationParams } from '../types';

export class [ModuleName]API {
  constructor(private client: BaseAPIClient) {}

  /**
   * List all [resources]
   */
  async list(params: PaginationParams = {}): Promise<{
    items: [Type][];
    pagination: Pagination;
  }> {
    return (this.client as any).get('/api/[endpoint]', params);
  }

  /**
   * Get a single [resource] by ID
   */
  async get(id: string): Promise<[Type]> {
    return (this.client as any).get(`/api/[endpoint]/${id}`);
  }

  // Add more methods as needed
}
```

## Type Definitions

Add types to `src/types/index.ts`:

```typescript
export interface [TypeName] {
  id: string;
  // Add properties
  createdAt: string;
  updatedAt: string;
}

export interface [TypeName]Params {
  // Add parameters
}
```

## Documentation Standards

- **All public APIs** must have JSDoc comments
- **All types** must be exported and documented
- **README** must be updated for new features
- **CHANGELOG** must include all changes

## Questions?

- Open an issue for questions
- Check existing issues and discussions
- Read the documentation

## Recognition

All contributors will be recognized in our [CONTRIBUTORS.md](./CONTRIBUTORS.md) file (coming soon).

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to @sourceparts/sdk! 🎉
