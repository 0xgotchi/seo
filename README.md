# Amphibian SEO Metadata Toolkit

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://img.shields.io/npm/v/amphibian-seo.svg)](https://www.npmjs.com/package/amphibian-seo)

A modern, SSR-first SEO metadata toolkit for Next.js App Router. Fully compatible with Next.js’s `generateMetadata` API, it provides complete SEO management with full TypeScript support for all metadata types.

---

## ✨ Key Features

* 🚀 Built for Next.js App Router
* 📝 TypeScript-first with comprehensive type definitions
* 🔍 Supports all major SEO tags, OpenGraph, and Twitter Cards
* 🤖 Fine-grained control over robots and crawlers (including GoogleBot)
* 🖼️ Rich social media metadata support
* 📱 Mobile app optimizations (icons, theme colors, viewport, etc.)
* 🛡️ Configurable security meta tags
* 🏷️ Easy Schema.org JSON-LD integration
* 🔗 Canonical URLs and alternates management
* ⚡ Asset preload for performance improvements
* 🧩 Flexible dynamic title templates like `%title%`, `%siteName%`, `%slug%`

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

### Layout-level Metadata (with `generateMetadata`)

```tsx
// app/layout.tsx
import { Metadata } from 'amphibian-seo';

export function generateMetadata() {
  return Metadata({
    title: {
      default: 'My Site',
      template: '%title% | My Site',
    },
    description: 'This is my awesome Next.js site',
    canonicalUrl: 'https://example.com',
    // other SEO configurations
  });
}
```

### Page-level Metadata

```tsx
// app/page.tsx
export const metadata = {
  title: 'Home Page',
  description: 'Welcome to our homepage',
  // page-specific SEO configs
};
```

---

## 📚 API Overview

### Main Function

#### `Metadata(input: MetadataInput): NextMetadata`

Generates Next.js-compatible metadata from your input.

---

## 🛠️ MetadataInput Interface

```ts
type MetadataInput = {
  title: string | { default: string; template: string };
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  openGraph?: {
    title?: string;
    description?: string;
    url?: string;
    type?: string;
    images?: OpenGraphImage[];
    siteName?: string;
    locale?: string;
  };
  twitter?: Twitter & { images?: string[] };
  robots?: RobotsDirectives;
  alternates?: Alternates;
  verification?: Verification;
  additionalMetaTags?: AdditionalMetaTag[];
  preloadAssets?: Array<{ href: string; as: string; crossOrigin?: string }>;
  schemaOrgJSONLD?: SchemaJSONLD | SchemaJSONLD[];
  pagination?: { next?: string; prev?: string };
  mobileApp?: {
    appleTouchIcon?: string;
    themeColor?: string;
    msapplicationTileColor?: string;
  };
  securityMetaTags?: Array<{ httpEquiv: string; content: string }>;
  authors?: Author[];
  publisher?: string;
  metadataBase?: URL | string;
  themeColor?: string | Array<{ media: string; color: string }>;
  viewport?: string;
  formatDetection?: { telephone?: boolean };
};
```

---

## 🔧 Configuration Examples

### Basic Metadata

```ts
{
  title: 'My Page Title',
  description: 'A detailed description of my page',
  keywords: ['nextjs', 'seo', 'metadata'],
  canonicalUrl: 'https://example.com/my-page'
}
```

### OpenGraph

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
        alt: 'OpenGraph Image'
      }
    ],
    siteName: 'My Website',
    locale: 'en_US',
  }
}
```

### Twitter Cards

```ts
{
  twitter: {
    card: 'summary_large_image',
    site: '@myhandle',
    creator: '@creator',
    title: 'Twitter Card Title',
    description: 'Twitter Card Description',
    images: ['https://example.com/twitter-image.jpg']
  }
}
```

### Robots Control

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
      'max-snippet': 100,
    }
  }
}
```

### Preload Assets

```ts
{
  preloadAssets: [
    { href: '/fonts/my-font.woff2', as: 'font', crossOrigin: 'anonymous' },
    { href: '/videos/intro.mp4', as: 'video' }
  ]
}
```

### JSON-LD Structured Data

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

### Mobile App Configuration

```ts
{
  mobileApp: {
    appleTouchIcon: '/apple-touch-icon.png',
    themeColor: '#ffffff',
    msapplicationTileColor: '#2b5797'
  }
}
```

### Security Meta Tags

```ts
{
  securityMetaTags: [
    { httpEquiv: 'Content-Security-Policy', content: "default-src 'self'" },
    { httpEquiv: 'X-Content-Type-Options', content: 'nosniff' }
  ]
}
```

---

## ⚙️ Default Metadata Values

The package provides sensible defaults:

```ts
export const DEFAULT_METADATA = {
  title: {
    default: 'My Website',
    template: '%title% | My Website',
  },
  description: 'This is the best place to find awesome content and resources.',
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
    images: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb?...'],
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

You can import types like this:

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
  Author,
} from 'amphibian-seo';
```

---

## 🧑‍🏫 Best Practices

1. Use layout-level metadata as defaults and override at page level
2. Prefer semantic metadata (`title`, `description`, etc.)
3. Always define canonical URLs to avoid duplicates
4. Use dynamic title templates for consistency (`%title%`, `%siteName%`)
5. Add preload hints for critical resources to boost performance
6. Include structured data (JSON-LD) to improve search visibility

---

## ✅ Compatibility

* Next.js 13+ (App Router)
* React 18+
* TypeScript 5+

---

## 📄 License

MIT © [horror\_amphibian](https://github.com/HorrorAmphibian)