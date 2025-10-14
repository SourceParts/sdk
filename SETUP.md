# @sourceparts/sdk Setup Guide

This guide explains how to set up the @sourceparts/sdk as a git submodule in your projects.

## What is a Git Submodule?

A git submodule allows you to keep a git repository as a subdirectory of another git repository. This lets you clone another repository into your project and keep your commits separate.

## Setting Up the SDK as a Submodule

### Step 1: Create a Git Repository for the SDK

If you haven't already, initialize the SDK as its own repository:

```bash
cd sourceparts-sdk
git init
git add .
git commit -m "Initial commit: @sourceparts/sdk"
```

### Step 2: Push to Remote Repository

Create a repository on GitHub (or your preferred git hosting) and push:

```bash
git remote add origin https://github.com/sourceparts/sdk.git
git branch -M main
git push -u origin main
```

### Step 3: Add as Submodule to Your Projects

In your main project, add the SDK as a submodule:

```bash
# Navigate to your project root
cd /path/to/your/project

# Add the SDK as a submodule
git submodule add https://github.com/sourceparts/sdk.git packages/sourceparts-sdk

# Or add to a specific directory
git submodule add https://github.com/sourceparts/sdk.git sdk
```

### Step 4: Initialize and Update Submodules

```bash
# Initialize submodules (first time only)
git submodule init

# Update submodules to latest
git submodule update --remote
```

## Using the SDK in Your Project

### Option 1: As a Local Package

Add to your `package.json`:

```json
{
  "dependencies": {
    "@sourceparts/sdk": "file:./packages/sourceparts-sdk"
  }
}
```

Then install:

```bash
npm install
```

### Option 2: Build and Link Locally

```bash
# In the SDK directory
cd packages/sourceparts-sdk
npm install
npm run build
npm link

# In your project directory
cd ../..
npm link @sourceparts/sdk
```

### Option 3: Publish to NPM

If you want to publish the SDK to NPM:

```bash
cd packages/sourceparts-sdk
npm publish --access public
```

Then in your project:

```bash
npm install @sourceparts/sdk
```

## Updating the Submodule

### Pull Latest Changes

```bash
# Update submodule to latest
git submodule update --remote packages/sourceparts-sdk

# Or manually
cd packages/sourceparts-sdk
git pull origin main
cd ../..
git add packages/sourceparts-sdk
git commit -m "Update SDK submodule"
```

### Making Changes to the SDK

```bash
# Navigate to submodule
cd packages/sourceparts-sdk

# Make your changes
# ... edit files ...

# Commit in the submodule
git add .
git commit -m "feat: add new feature"
git push origin main

# Update the parent project to reference the new commit
cd ../..
git add packages/sourceparts-sdk
git commit -m "Update SDK to latest version"
```

## Cloning a Project with Submodules

When cloning a project that uses submodules:

```bash
# Option 1: Clone with submodules
git clone --recurse-submodules https://github.com/your/project.git

# Option 2: Clone then initialize submodules
git clone https://github.com/your/project.git
cd project
git submodule init
git submodule update
```

## Common Submodule Commands

```bash
# View submodule status
git submodule status

# Update all submodules
git submodule update --remote --merge

# Remove a submodule
git submodule deinit packages/sourceparts-sdk
git rm packages/sourceparts-sdk
rm -rf .git/modules/packages/sourceparts-sdk

# Change submodule URL
git submodule set-url packages/sourceparts-sdk https://new-url.git
```

## Development Workflow

### Monorepo Setup

If you're using this in a monorepo with pnpm workspaces:

```yaml
# pnpm-workspace.yaml
packages:
  - 'packages/*'
  - 'sourceparts-sdk'
```

Then the SDK will be automatically available to all packages in your workspace.

### TypeScript Configuration

Make sure your main project's `tsconfig.json` includes the SDK:

```json
{
  "compilerOptions": {
    "paths": {
      "@sourceparts/sdk": ["./packages/sourceparts-sdk/src"]
    }
  },
  "include": [
    "src/**/*",
    "packages/sourceparts-sdk/src/**/*"
  ]
}
```

## Troubleshooting

### Submodule Not Updating

```bash
# Force update
git submodule update --init --recursive --force
```

### Detached HEAD in Submodule

```bash
cd packages/sourceparts-sdk
git checkout main
git pull origin main
cd ../..
git add packages/sourceparts-sdk
git commit -m "Update SDK submodule pointer"
```

### Build Errors

```bash
# Rebuild the SDK
cd packages/sourceparts-sdk
rm -rf node_modules dist
npm install
npm run build
cd ../..
npm install
```

## CI/CD Integration

### GitHub Actions

```yaml
name: Build

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          submodules: recursive

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Build SDK
        run: |
          cd packages/sourceparts-sdk
          npm install
          npm run build

      - name: Build project
        run: npm run build
```

## Best Practices

1. **Pin to Specific Commits**: Don't rely on floating references like `main` in production
2. **Document Dependencies**: Keep track of which version your project uses
3. **Test Updates**: Always test SDK updates in a development environment first
4. **Separate Concerns**: Keep SDK changes separate from application changes
5. **Version Tagging**: Use semantic versioning tags in the SDK repository

## Support

For issues with the SDK setup, please refer to:

- [Git Submodules Documentation](https://git-scm.com/book/en/v2/Git-Tools-Submodules)
- [Source Parts Documentation](https://source.parts/docs)
- [GitHub Issues](https://github.com/sourceparts/sdk/issues)
