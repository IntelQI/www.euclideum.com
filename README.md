# Euclideum Solutions Private Limited

> Shaping the Future Through Innovation

## About Euclideum

Euclideum Solutions Private Limited is a global technology and innovation powerhouse shaping the future across industries — delivering cutting-edge software, cloud infrastructure, and enterprise solutions, while nurturing the complete learning lifecycle through advanced educational tools, IQ development platforms, and products designed to empower the next generation of genius minds.

## 🌐 Website

**[www.euclideum.com](https://www.euclideum.com)**

## 🚀 Our Solutions

### Technology & Infrastructure

- **Software Development**: Custom enterprise software solutions
- **Cloud Infrastructure**: Scalable cloud services and infrastructure
- **Enterprise Solutions**: End-to-end business technology solutions

### Education & Learning

- **Educational Platforms**: Advanced learning management systems
- **IQ Development Tools**: Cognitive enhancement platforms
- **Next-Gen Learning**: Products designed to nurture genius minds

## 🛠️ Technology Stack

This repository is built with:

- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18
- **Styling**: Tailwind CSS + Shadcn UI
- **Content**: MDX for blog and documentation
- **Type Safety**: TypeScript
- **Monorepo**: Turborepo with pnpm workspaces

## 📦 Project Structure

```
euclideum/
├── apps/
│   └── web/              # Main website application
├── packages/
│   ├── eslint-config/    # Shared ESLint configuration
│   └── typescript-config/ # Shared TypeScript configuration
└── [config files]
```

## 🏃 Getting Started

### Prerequisites

- Node.js >= 20
- pnpm >= 9.6.0

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

### Development URLs

- Website: `http://localhost:3000`
- Docs: `http://localhost:3000/docs`
- Blog: `http://localhost:3000/blog`

## 📝 Content Management

### Blog Posts

Create blog posts in `apps/content/blog/en/` directory:

```markdown
---
title: Your Post Title
excerpt: Brief description
tags: [tag1, tag2]
author_id: author-name
date: 2025-01-01
---

Your content here...
```

### Documentation

Create documentation in `apps/content/docs/en/` directory following the same MDX format.

## 🎨 Customization

### Site Configuration

Edit `apps/web/src/config/site.ts` to update:

- Company information
- Social media links
- SEO metadata
- Contact details

### Theme

Modify `apps/web/tailwind.config.ts` for theme customization.

## 📄 License

Copyright © 2025 Euclideum Solutions Private Limited. All rights reserved.

This is proprietary software. Unauthorized copying, modification, distribution, or use of this software, via any medium, is strictly prohibited.

---

**Built with ❤️ by Euclideum Solutions Private Limited**
