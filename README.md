# Amphibian SEO Metadata Toolkit

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://img.shields.io/npm/v/amphibian-seo.svg)](https://www.npmjs.com/package/amphibian-seo)

A modern SSR-first SEO metadata toolkit for Next.js App Router. Fully compatible with `generateMetadata` and static rendering. Provides comprehensive SEO management with TypeScript support for all metadata types.

---

## ✨ Features

- 🚀 **App Router Ready**: Designed specifically for Next.js App Router
- 📝 **TypeScript First**: Full type safety for all metadata configurations
- 🔍 **Comprehensive SEO**: Supports all major SEO tags and protocols
- 🤖 **Robots & Crawlers**: Fine-grained control over indexing and crawling
- 🖼️ **Social Media**: Rich OpenGraph and Twitter Card support
- 📱 **Mobile Optimization**: App icons, theme colors, viewport, and format detection
- 🛡️ **Security**: Built-in support for security headers
- 🏷️ **Structured Data**: Easy Schema.org JSON-LD integration
- 🔗 **Canonical & Alternates**: Advanced URL management
- ⚡ **Preload Assets**: Improve performance with preload support
- 🧩 **Flexible Title Templates**: Supports dynamic placeholders like `%title%`, `%siteName%`, `%slug%`, etc.

---

## 📦 Installation

```bash
npm install amphibian-seo
# or
yarn add amphibian-seo
# or
pnpm add amphibian-seo
```

---

## 🚀 Basic Usage

### Layout-level Metadata

```tsx
// app/layout.tsx
import { Metadata } from 'amphibian-seo';

export function generateMetadata() {
  return Metadata({
    title: {
      default: 'My Site',
      template: '%title% | My Site'
    },
    description: 'This is my awesome Next.js site',
    canonicalUrl: 'https://example.com',
    // ... other SEO configurations
  });
}
```

### Page-level Metadata

```tsx
// app/page.tsx
export const metadata = {
  title: 'Home Page',
  description: 'Welcome to our homepage',
  // ... page-specific SEO configurations
};
```

---

## 📚 API Reference

### Core Function

#### `Metadata(input: MetadataInput): Metadata`

The main function that generates Next.js-compatible metadata.

---

### MetadataInput Interface

```ts
interface MetadataInput {
  title: string | { default: string; template: string };
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  openGraph?: { ... };
  twitter?: { ... };
  robots?: RobotsDirectives;
  alternates?: Alternates;
  verification?: Verification;
  additionalMetaTags?: AdditionalMetaTag[];
  preloadAssets?: Array<{ href: string; as: string; crossOrigin?: string }>;
  schemaOrgJSONLD?: SchemaJSONLD | SchemaJSONLD[];
  pagination?: { next?: string; prev?: string };
  mobileApp?: { appleTouchIcon?: string; themeColor?: string; msapplicationTileColor?: string };
  securityMetaTags?: Array<{ httpEquiv: string; content: string }>;
  authors?: Author[];
  publisher?: string;
  metadataBase?: URL | string;
  themeColor?: string | Array<{ media: string; color: string }>;
  viewport?: string;
  formatDetection?: { telephone?: boolean };
}
```

---

## 🔧 Configuration Examples

### ✅ Basic Metadata

```ts
{
  title: 'My Page Title',
  description: 'This is a detailed description of my page',
  keywords: ['nextjs', 'seo', 'metadata'],
  canonicalUrl: 'https://example.com/my-page'
}
```

### 🖼️ OpenGraph

```ts
{
  openGraph: {
    title: 'Social Media Title',
    description: 'Social Media Description',
    url: 'https://example.com/social-share',
    type: 'website',
    images: [
      {
        url: 'https://example.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'My OpenGraph Image'
      }
    ],
    siteName: 'My Website',
    locale: 'en_US'
  }
}
```

### 🐦 Twitter Cards

```ts
{
  twitter: {
    card: 'summary_large_image',
    site: '@myhandle',
    creator: '@creator',
    title: 'Twitter Card Title',
    description: 'Twitter Card Description',
    image: 'https://example.com/twitter-image.jpg',
    imageAlt: 'Twitter Image Alt Text'
  }
}
```

### 🤖 Robots Control

```ts
{
  robots: {
    index: true,
    follow: true,
    noimageindex: true,
    nosnippet: true,
    googleBot: {
      index: true,
      follow: false,
      'max-image-preview': 'large',
      'max-snippet': 100
    }
  }
}
```

### 📦 Preload Assets

```ts
{
  preloadAssets: [
    { href: '/fonts/my-font.woff2', as: 'font', crossOrigin: 'anonymous' },
    { href: '/video/intro.mp4', as: 'video' }
  ]
}
```

### 🧱 Structured Data (JSON-LD)

```ts
{
  schemaOrgJSONLD: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "My Website",
    url: "https://example.com"
  }
}
```

### 📱 Mobile App Configuration

```ts
{
  mobileApp: {
    appleTouchIcon: '/apple-touch-icon.png',
    themeColor: '#ffffff',
    msapplicationTileColor: '#2b5797'
  }
}
```

### 🛡️ Security Headers

```ts
{
  securityMetaTags: [
    { httpEquiv: 'Content-Security-Policy', content: "default-src 'self'" },
    { httpEquiv: 'X-Content-Type-Options', content: 'nosniff' }
  ]
}
```

---

## ⚙️ Default Values

The package provides sensible defaults:

```ts
export const DEFAULT_METADATA = {
  title: {
    default: 'My Website',
    template: '%title% | My Website',
  },
  openGraph: {
    type: 'website',
    siteName: 'My Website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?...',
        width: 1200,
        height: 630,
        alt: 'My Website Preview Image',
      },
    ],
    title: 'Welcome to My Website',
    description: 'This is the best place to find awesome content and resources.',
    url: 'https://example.com',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Welcome to My Website',
    description: 'Discover great articles and insights on My Website.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?...',
    imageAlt: 'Twitter preview image of My Website',
  },
  robots: {
    index: true,
    follow: true,
  },
  mobileApp: {
    appleTouchIcon: '/apple-touch-icon.png',
    themeColor: '#000000',
    msapplicationTileColor: '#000000',
  },
};
```

---

## 🧠 TypeScript Support

```ts
import type {
  MetadataInput,
  OpenGraphImage,
  Twitter,
  RobotsDirectives,
  Alternates,
  Verification,
  AdditionalMetaTag,
  SchemaJSONLD,
  Author
} from 'amphibian-seo';
```

---

## 🧑‍🏫 Best Practices

1. Use layout-level config for defaults, and page-level overrides
2. Prefer semantic metadata (`title`, `description`, etc.)
3. Always define canonical URLs to prevent duplicates
4. Use `%title%`, `%siteName%`, etc., for consistent templates
5. Include preload hints for performance-critical resources
6. Add structured data to boost search visibility

---

## ✅ Compatibility

- ✅ Next.js 13+ (App Router)
- ✅ React 18+
- ✅ TypeScript 5+

---

## 📄 License

MIT © [horror_amphibian](https://github.com/HorrorAmphibian)
