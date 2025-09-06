# Amphibian SEO Metadata Toolkit

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://img.shields.io/npm/v/amphibian-seo.svg)](https://www.npmjs.com/package/amphibian-seo)

A modern SSR-first SEO metadata toolkit for Next.js App Router. Supports OpenGraph, Twitter Cards, robots, alternates, JSON-LD, preload, meta/link tags, Apple Web App, and advanced TypeScript types. Fully compatible with Next.js’s `generateMetadata` API and static rendering.

---

## ✨ Key Features

* 🚀 SSR-first, built for Next.js App Router
* 📝 TypeScript-first with comprehensive type definitions
* 🔍 Supports all major SEO tags, OpenGraph, and Twitter Cards
* 🤖 Fine-grained control over robots and crawlers (including GoogleBot)
* 🖼️ Rich social media metadata support
* 📱 Mobile app optimizations (icons, theme colors, viewport, etc.)
* 🛡️ Configurable security meta tags
* 🏷️ Easy Schema.org JSON-LD integration
* 🔗 Canonical URLs and alternates management (hreflang, media, types, mobile)
* ⚡ Asset preload for performance improvements
* 🧩 Flexible dynamic title templates like `%title%`, `%siteName%`
* 🧑‍💻 Full support for authors, publisher, verification, and more

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

### Layout-level Metadata (with `generateMetadata` and merge)

```tsx
// app/layout.tsx
import { metadata as amphibianMetadata } from 'amphibian-seo';

export function generateMetadata(_, parent) {
  // parent = child route metadata
  return amphibianMetadata({
    title: {
      default: 'My Site',
      template: '%title% | My Site',
    },
    description: 'This is my awesome Next.js site',
    canonicalUrl: 'https://example.com',
    // other SEO configurations
  }, parent);
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

#### `metadata(input: MetadataInput, parent?: NextMetadata): NextMetadata & { jsonLD?: string }`

Generates Next.js-compatible metadata from your input, merging layout metadata with child route metadata (if provided).

---

## 🛠️ MetadataInput Interface

```ts
type MetadataInput = {
  title?: string | { default: string; template?: string | ((title?: string) => string) };
  defaultTitle?: string;
  titleTemplate?: string | ((title?: string) => string);
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  noindex?: boolean;
  nofollow?: boolean;
  openGraph?: OpenGraph;
  twitter?: Twitter;
  robots?: RobotsDirectives;
  alternates?: Alternates;
  verification?: Verification;
  additionalMetaTags?: AdditionalMetaTag[];
  additionalLinkTags?: AdditionalLinkTag[];
  customFavicons?: Array<{
    href: string;
    rel?: string;
    type?: string;
    sizes?: string;
  }>;
  preloadAssets?: PreloadAsset[];
  schemaOrgJSONLD?: SchemaJSONLD | SchemaJSONLD[];
  pagination?: { next?: string; prev?: string };
  mobileApp?: {
    appleTouchIcon?: string;
    themeColor?: string;
    msapplicationTileColor?: string;
    appleWebAppCapable?: boolean | 'yes' | 'no';
  };
  securityMetaTags?: Array<{ httpEquiv: string; content: string }>;
  authors?: (Author | string)[];
  publisher?: string;
  metadataBase?: URL | string;
  themeColor?: Array<{ media: string; color: string }> | string;
  viewport?: string;
  formatDetection?: {
    telephone?: boolean;
    date?: boolean;
    email?: boolean;
    address?: boolean;
  };
  facebook?: {
    appId?: string;
    pages?: string;
  };
  appleWebApp?: {
    capable?: boolean | 'yes' | 'no';
    title?: string;
    statusBarStyle?: 'default' | 'black' | 'black-translucent';
  };
};
```

---


## 🔧 Configuration Examples
### Custom Favicons

Add custom favicons using the `customFavicons` property. This allows you to specify multiple favicon formats and sizes for your site:

```ts
{
  customFavicons: [
    { href: '/favicon.ico', rel: 'icon', type: 'image/x-icon' },
    { href: '/favicon-32x32.png', rel: 'icon', type: 'image/png', sizes: '32x32' },
    { href: '/apple-touch-icon.png', rel: 'apple-touch-icon', sizes: '180x180' }
  ]
}
```

You can use this property in your layout or page metadata:

```tsx
export function generateMetadata(_, parent) {
  return amphibianMetadata({
    // ...other metadata
    customFavicons: [
      { href: '/favicon.ico', rel: 'icon', type: 'image/x-icon' },
      { href: '/favicon-32x32.png', rel: 'icon', type: 'image/png', sizes: '32x32' },
      { href: '/apple-touch-icon.png', rel: 'apple-touch-icon', sizes: '180x180' }
    ]
  }, parent);
}
```

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
    image: 'https://example.com/twitter-image.jpg'
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

### Alternates (hreflang, media, types, mobile)

```ts
{
  alternates: {
    canonical: 'https://example.com',
    languages: {
      'en-US': 'https://example.com/en',
      'ru-RU': 'https://example.com/ru'
    },
    media: { 'screen': 'https://example.com/screen' },
    types: { 'application/json': 'https://example.com/data.json' },
    mobileAlternate: { href: '/m', media: 'only screen' }
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

### Authors and Publisher

```ts
{
  authors: [
    'Author 1',
    { name: 'Author 2', url: 'https://a.com' }
  ],
  publisher: 'My Publisher'
}
```

### Apple Web App

```ts
{
  appleWebApp: {
    capable: true,
    title: 'App',
    statusBarStyle: 'black-translucent'
  }
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
        url: 'https://example.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Preview of My Website',
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
    image: 'https://example.com/twitter-image.jpg',
    site: '@mywebsite',
    creator: '@creator',
    handle: '@mywebsite',
  },
  robots: {
    index: true,
    follow: true,
  },
  mobileApp: {
    appleTouchIcon: '/apple-touch-icon.png',
    themeColor: '#ffffff',
    msapplicationTileColor: '#2b5797',
    appleWebAppCapable: 'yes',
  },
  customFavicons: [
    { href: '/favicon.ico', rel: 'icon', type: 'image/x-icon' },
    { href: '/favicon-32x32.png', rel: 'icon', type: 'image/png', sizes: '32x32' },
    { href: '/apple-touch-icon.png', rel: 'apple-touch-icon', sizes: '180x180' }
  ],
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
  AdditionalLinkTag,
  PreloadAsset,
  SchemaJSONLD,
  Author,
} from 'amphibian-seo';
```

---

## 🧑‍🏫 Best Practices

1. Use layout-level metadata as defaults and override at page level using automatic merging
2. Prefer semantic metadata (`title`, `description`, etc.)
3. Always define canonical URLs to avoid duplicates
4. Use dynamic title templates for consistency (`%title%`, `%siteName%`)
5. Add preload hints for critical resources to boost performance
6. Include structured data (JSON-LD) to improve search visibility
7. Use alternates for internationalization and device targeting

---

## ✅ Compatibility

* Next.js 13+ (App Router)
* React 18+
* TypeScript 5+

---

## 📄 License

MIT © [horror_amphibian](https://github.com/HorrorAmphibian)