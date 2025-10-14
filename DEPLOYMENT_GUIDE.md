# Deployment Guide - Making @sourceparts/sdk Public

This guide walks you through deploying the SDK to GitHub as a public repository and optionally publishing to npm.

## Step 1: Create GitHub Repository

### Option A: Using GitHub CLI (Recommended)

```bash
# Make sure you're in the SDK directory
cd sourceparts-sdk

# Create public repository using gh CLI
gh repo create sourceparts/sourceparts-sdk --public --source=. --description="Official TypeScript SDK for the Source Parts API" --remote=origin

# Push to GitHub
git push -u origin main
```

### Option B: Using GitHub Web Interface

1. **Go to GitHub**: https://github.com/new
2. **Repository Details**:
   - Owner: `sourceparts` (or your organization)
   - Repository name: `sourceparts-sdk`
   - Description: `Official TypeScript SDK for the Source Parts API`
   - Visibility: **Public** ✓
   - Initialize: **Do NOT** initialize with README (we already have one)

3. **Push to GitHub**:
   ```bash
   cd sourceparts-sdk
   git remote add origin https://github.com/sourceparts/sourceparts-sdk.git
   git push -u origin main
   ```

## Step 2: Configure GitHub Repository

### Enable GitHub Actions

1. Go to repository **Settings** → **Actions** → **General**
2. Set **Actions permissions** to "Allow all actions and reusable workflows"
3. GitHub Actions will now run on all pushes and pull requests

### Add Repository Topics

Add these topics to make the repository discoverable:

- `typescript`
- `sdk`
- `api-client`
- `electronics`
- `sourcing`
- `parts`
- `bom`
- `quotes`

### Create Repository Description

**Description**: Official TypeScript SDK for the Source Parts API

**Website**: https://source.parts

### Set Up Branch Protection (Optional but Recommended)

1. Go to **Settings** → **Branches**
2. Add rule for `main` branch:
   - ✓ Require pull request reviews before merging
   - ✓ Require status checks to pass before merging
   - ✓ Require branches to be up to date before merging

## Step 3: Initial Build Test

Verify that GitHub Actions runs successfully:

```bash
# GitHub Actions will automatically run on push
# Check status at: https://github.com/sourceparts/sourceparts-sdk/actions
```

If the build fails, check the Actions tab and fix any issues.

## Step 4: Create Initial Release (Optional)

### Using GitHub CLI

```bash
# Create v0.1.0 release
gh release create v0.1.0 \
  --title "v0.1.0 - Initial Release" \
  --notes "Initial public release of @sourceparts/sdk

**Features:**
- Products API (search, get, categories, manufacturers)
- Quotes API (CRUD operations, send, convert to order)
- BOM API (upload, pricing, management)
- Orders API (tracking, management)
- Full TypeScript support
- Automatic retry logic
- Comprehensive error handling

See [CHANGELOG.md](./CHANGELOG.md) for full details."
```

### Using GitHub Web Interface

1. Go to **Releases** → **Create a new release**
2. Tag version: `v0.1.0`
3. Release title: `v0.1.0 - Initial Release`
4. Copy release notes from above
5. Click **Publish release**

## Step 5: Publish to npm (When Ready)

### Prerequisites

1. Create npm account: https://www.npmjs.com/signup
2. Login to npm:
   ```bash
   npm login
   ```

### Publishing

```bash
cd sourceparts-sdk

# Build the SDK
npm install
npm run build

# Verify build output
ls -la dist/

# Dry run (test what will be published)
npm publish --dry-run

# Publish to npm (public access)
npm publish --access public
```

### Post-Publish Verification

```bash
# Check if package is live
npm view @sourceparts/sdk

# Install and test
mkdir test-sdk
cd test-sdk
npm init -y
npm install @sourceparts/sdk
```

## Step 6: Update Documentation Links

After publishing, update these links in your main project:

1. **Main README** - Add link to SDK repository
2. **Documentation** - Update SDK installation instructions
3. **API Docs** - Link to SDK on npm and GitHub

## Step 7: Announce the Release

### Social Media Posts

**Twitter/X:**
```
🎉 Excited to announce @sourceparts/sdk - our official TypeScript SDK is now open source!

✨ Features:
- Full TypeScript support
- Products, Quotes, BOM, Orders APIs
- Auto retry & error handling

Built in the open. Contributions welcome!

📦 npm: https://www.npmjs.com/package/@sourceparts/sdk
💻 GitHub: https://github.com/sourceparts/sourceparts-sdk

#opensource #typescript #electronics
```

**LinkedIn:**
```
We're thrilled to announce the open source release of the Source Parts SDK!

The @sourceparts/sdk is an official TypeScript SDK that simplifies integration with Source Parts API for electronics sourcing, quoting, BOM management, and order tracking.

Key Features:
✓ Full TypeScript support with type definitions
✓ Comprehensive error handling
✓ Automatic retry logic
✓ Modular API design

We're building in the open and welcome contributions from the community!

npm: https://www.npmjs.com/package/@sourceparts/sdk
GitHub: https://github.com/sourceparts/sourceparts-sdk

#OpenSource #TypeScript #Electronics #B2B #API
```

### Developer Community

- Post on Hacker News
- Share on Reddit (r/programming, r/typescript, r/javascript)
- Dev.to article
- Hashnode blog post

## Step 8: Monitor and Maintain

### Set Up Notifications

- Watch the GitHub repository for issues and PRs
- Enable email notifications for npm package
- Monitor npm downloads: https://npm-stat.com/charts.html?package=@sourceparts/sdk

### Weekly Checklist

- [ ] Review and respond to GitHub issues
- [ ] Review and merge pull requests
- [ ] Update dependencies
- [ ] Monitor CI/CD status
- [ ] Check npm download stats

### Monthly Tasks

- [ ] Review and update documentation
- [ ] Plan new features based on community feedback
- [ ] Cut new release if features accumulated
- [ ] Update CHANGELOG.md

## Versioning Strategy

Follow [Semantic Versioning](https://semver.org/):

- **MAJOR** (1.0.0) - Breaking changes
- **MINOR** (0.1.0) - New features (backward compatible)
- **PATCH** (0.1.1) - Bug fixes

### Release Process

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Commit: `git commit -m "chore: release v0.2.0"`
4. Tag: `git tag v0.2.0`
5. Push: `git push && git push --tags`
6. Create GitHub release
7. Publish to npm: `npm publish`

## Security

### Reporting Security Issues

Add this to README:

> **Security**: If you discover a security vulnerability, please email security@source.parts instead of using the issue tracker.

### npm 2FA

Enable two-factor authentication on npm:

```bash
npm profile enable-2fa auth-and-writes
```

## Support Channels

Set up these support channels:

1. **GitHub Issues** - Bug reports and feature requests
2. **GitHub Discussions** - Q&A and community discussion
3. **Discord/Slack** - Real-time chat (optional)
4. **Email** - support@source.parts

## Success Metrics

Track these metrics:

- GitHub Stars
- npm Downloads per week
- GitHub Issues (open vs closed)
- Pull Requests (open vs merged)
- Community Contributors
- Documentation page views

## Troubleshooting

### Build Fails on CI

Check the Actions tab and review error logs. Common issues:
- Missing dependencies
- TypeScript errors
- Node version mismatch

### npm Publish Fails

Common issues:
- Not logged in: `npm login`
- Version already exists: Bump version
- Access denied: Use `--access public`

---

**Congratulations!** Your SDK is now public and ready for the community! 🎉
