# Amphibian SEO Metadata Toolkit

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://img.shields.io/npm/v/amphibian-seo.svg)](https://www.npmjs.com/package/amphibian-seo)

A modern SSR-first SEO metadata toolkit for Next.js App Router. Fully compatible with `generateMetadata` and static rendering. Provides comprehensive SEO management with TypeScript support for all metadata types.

## Features

- 🚀 **App Router Ready**: Designed specifically for Next.js App Router
- 📝 **TypeScript First**: Full type safety for all metadata configurations
- 🔍 **Comprehensive SEO**: Supports all major SEO tags and protocols
- 🤖 **Robots & Crawlers**: Fine-grained control over indexing and crawling
- 🖼️ **Social Media**: Rich OpenGraph and Twitter Card support
- 📱 **Mobile Optimization**: App icons, theme colors, and viewport control
- 🛡️ **Security**: Built-in support for security headers
- 🏷️ **Structured Data**: Easy Schema.org JSON-LD integration
- 🔗 **Canonical & Alternates**: Advanced URL management

## Installation

```bash
npm install amphibian-seo
# or
yarn add amphibian-seo
# or
pnpm add amphibian-seo
```

## Basic Usage

### Layout-level Metadata

```tsx
// app/layout.tsx
import { AmphibianSEOMetadata } from 'amphibian-seo';

export function generateMetadata() {
  return AmphibianSEOMetadata({
    title: {
      default: 'My Site',
      template: '%s | My Site'
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

## API Reference

### Core Function

#### `AmphibianSEOMetadata(input: AmphibianSEOMetadataInput): Metadata`

The main function that generates Next.js-compatible metadata.

### Input Object Structure

```typescript
interface AmphibianSEOMetadataInput {
  // Required fields
  title: string | { default: string; template: string };
  description: string;
  
  // Optional fields
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
  twitter?: Twitter;
  robots?: RobotsDirectives;
  alternates?: Alternates;
  verification?: Verification;
  additionalMetaTags?: AdditionalMetaTag[];
  preloadAssets?: Array<{ href: string; as: string; crossOrigin?: string }>;
  schemaOrgJSONLD?: SchemaJSONLD | SchemaJSONLD[];
  pagination?: {
    next?: string;
    prev?: string;
  };
  mobileApp?: {
    appleTouchIcon?: string;
    themeColor?: string;
    msapplicationTileColor?: string;
  };
  securityMetaTags?: Array<{ httpEquiv: string; content: string }>;
  authors?: Author[];
  publisher?: string;
  metadataBase?: URL | string;
  themeColor?: Array<{ media: string; color: string }>;
  viewport?: string;
  formatDetection?: {
    telephone?: boolean;
  };
}
```

### Detailed Configuration Examples

#### Basic Metadata

```typescript
{
  title: 'My Page Title',
  description: 'This is a detailed description of my page',
  keywords: ['nextjs', 'seo', 'metadata'],
  canonicalUrl: 'https://example.com/my-page'
}
```

#### OpenGraph Configuration

```typescript
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

#### Twitter Cards

```typescript
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

#### Robots & Crawler Control

```typescript
{
  robots: {
    index: true,
    follow: true,
    nocache: false,
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

#### Structured Data (JSON-LD)

```typescript
{
  schemaOrgJSONLD: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "My Website",
    url: "https://example.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://example.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }
}
```

#### Mobile App Configuration

```typescript
{
  mobileApp: {
    appleTouchIcon: '/apple-touch-icon.png',
    themeColor: '#ffffff',
    msapplicationTileColor: '#2b5797'
  }
}
```

#### Security Headers

```typescript
{
  securityMetaTags: [
    { httpEquiv: 'Content-Security-Policy', content: "default-src 'self'" },
    { httpEquiv: 'X-Content-Type-Options', content: 'nosniff' }
  ]
}
```

## Default Values

The package provides sensible defaults that can be overridden:

```typescript
export const DEFAULT_METADATA = {
  title: {
    default: 'My Site',
    template: '%s | My Site',
  },
  openGraph: {
    type: 'website',
    siteName: '',
    images: [],
    title: '',
    description: '',
    url: '',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '',
    description: '',
    image: '',
    imageAlt: '',
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

## TypeScript Support

All types are exported for your convenience:

```typescript
import type {
  AmphibianSEOMetadataInput,
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

## Best Practices

1. **Layout-level vs Page-level**: Define site-wide defaults in your root layout, then override specific values in page metadata
2. **Title Templates**: Use the template system for consistent title formatting
3. **Canonical URLs**: Always specify canonical URLs to prevent duplicate content issues
4. **Image Optimization**: Provide multiple image sizes for OpenGraph and Twitter Cards
5. **Structured Data**: Use JSON-LD to enhance search engine understanding of your content
6. **Security Headers**: Implement CSP and other security headers for production sites

## Compatibility

- Next.js 13+ (App Router required)
- React 18+
- TypeScript 5+

## License

MIT © [horror_amphibian](https://github.com/horror-amphibian)