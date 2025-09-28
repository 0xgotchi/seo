<div align="center">
  <h1>amphibian-seo</h1>
  <p><b>SSR-first SEO metadata toolkit for Next.js App Router, with advanced TypeScript types, plugin system, and full static/SSR compatibility.</b></p>
  <p>
    <a href="https://www.npmjs.com/package/amphibian-seo"><img src="https://img.shields.io/npm/v/amphibian-seo.svg?style=flat-square" alt="NPM Version"></a>
    <a href="https://github.com/HorrorAmphibian/amphibian-seo"><img src="https://img.shields.io/github/stars/HorrorAmphibian/amphibian-seo?style=flat-square" alt="GitHub Stars"></a>
    <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="MIT License"></a>
    <a href="https://github.com/biomejs/biome"><img src="https://img.shields.io/badge/code%20style-biome-5FD3F3?style=flat-square" alt="Biome"></a>
    <a href="https://github.com/HorrorAmphibian/amphibian-seo/graphs/contributors"><img src="https://img.shields.io/github/contributors/HorrorAmphibian/amphibian-seo?style=flat-square" alt="Contributors"></a>
  </p>
</div>


## Table of Contents
  - [Why amphibian-seo?](#why-amphibian-seo)
  - [Architecture Overview](#architecture-overview)
  - [Advanced Examples](#advanced-examples)
  - [Performance & SEO Tips](#performance--seo-tips)
  - [Contributing](#contributing)
  - [Community & Support](#community--support)


## Features
- SSR-first: Designed for Next.js App Router and static rendering
- Full TypeScript support with advanced types and intellisense

  ---

  ## Why amphibian-seo?

  - **SSR-first**: Built for Next.js App Router and static export, not adapted from CSR libraries.
  - **Type Safety**: All options, plugins, and outputs are fully typed. No `any` or unsafe casts.
  - **Extensible**: Plugin system lets you add, override, or compose SEO logic for any use case.
  - **Internationalization**: Supports `hreflang`, alternate URLs, and multi-language metadata.
  - **Performance**: Minimal runtime, tree-shakable, and zero client-side bundle impact.
  - **Security**: Built-in support for CSP, X-Frame-Options, and other security headers.
  - **Modern**: Designed for Next.js 14+, ESM, and the latest web standards.

  ### Comparison

  | Feature                | amphibian-seo | next-seo | react-helmet | Custom |  
  |------------------------|:-------------:|:--------:|:------------:|:------:|
  | SSR-first              |      ✅       |    ⚠️    |      ❌      |   ⚠️   |
  | TypeScript types       |      ✅       |    ⚠️    |      ❌      |   ⚠️   |
  | Plugin system          |      ✅       |    ❌    |      ❌      |   ⚠️   |
  | Modular                |      ✅       |    ⚠️    |      ⚠️      |   ⚠️   |
  | Next.js App Router     |      ✅       |    ⚠️    |      ❌      |   ⚠️   |
  | Static export          |      ✅       |    ⚠️    |      ⚠️      |   ⚠️   |
  | Security headers       |      ✅       |    ❌    |      ❌      |   ⚠️   |
  | i18n/hreflang          |      ✅       |    ⚠️    |      ❌      |   ⚠️   |
  | JSON-LD/schema.org     |      ✅       |    ✅    |      ⚠️      |   ⚠️   |

  ---

  ## Architecture Overview

  The toolkit is organized in a modular way:

  - **Core**: `generateMetadata`, type definitions, and default logic
  - **Features**: SEO, OpenGraph, Twitter, robots, JSON-LD, Schema.org, PWA, security, etc.
  - **Plugins**: Register and compose custom logic
  - **Utils**: Helpers for merging, validation, and normalization
  - **Tests**: All features covered by Jest

  Each feature is isolated and can be extended or replaced via plugins.

  ---

  ## Advanced Examples

  ### Dynamic SSR Metadata

  ```ts
  import { generateMetadata } from "amphibian-seo";

  export async function generateMetadataForPage(params) {
    const data = await fetchPageData(params.id);
    return generateMetadata({
      title: data.title,
      description: data.summary,
      openGraph: {
        title: data.title,
        url: `https://mysite.com/page/${params.id}`,
        images: [{ url: data.ogImage }],
      },
      jsonLd: [{ "@type": "Article", headline: data.title }],
    });
  }
  ```

  ### Internationalization (hreflang)

  ```ts
  const meta = generateMetadata({
    title: "Página Inicial",
    description: "Bem-vindo ao site",
    additionalLinkTags: [
      { rel: "alternate", href: "https://mysite.com/en", hreflang: "en" },
      { rel: "alternate", href: "https://mysite.com/pt", hreflang: "pt" },
    ],
  });
  ```

  ### Real Plugin Example

  ```ts
  import { registerPlugin } from "amphibian-seo";

  registerPlugin((options) => {
    if (options.title) {
      return { title: options.title + " | MySite" };
    }
    return {};
  });
  ```

  ---

  ## Performance & SEO Tips
  - Use unique, descriptive titles and meta descriptions for every page.
  - Always set canonical URLs to avoid duplicate content.
  - Use JSON-LD for articles, products, and organizations for rich results.
  - Prefer static generation for public pages when possible.
  - Validate with [Lighthouse](https://web.dev/measure/) and [Google Rich Results Test](https://search.google.com/test/rich-results).
  - Use the plugin system to enforce branding or compliance rules.
  - Keep robots and security headers up to date.

  ---

  ## Contributing

  Contributions are welcome! To contribute:

  1. Fork the repo and create a new branch.
  2. Run `npm install` and `npm run lint` to check code style (Biome).
  3. Add or update tests in `tests/` and run `npm test`.
  4. Open a pull request with a clear description.

  ### Guidelines
  - Use TypeScript and keep all code type-safe.
  - Follow the modular structure (one feature per file/module).
  - Write and update tests for all changes.
  - Use English for all code, comments, and docs.

  ---

  ## Community & Support

  - GitHub Issues: [Report bugs or request features](https://github.com/HorrorAmphibian/amphibian-seo/issues)
  - Discussions: [Join the community](https://github.com/HorrorAmphibian/amphibian-seo/discussions)
  - Twitter: [@HorrorAmphibian](https://twitter.com/HorrorAmphibian)

  ---
- Supports OpenGraph, Twitter Cards, robots, JSON-LD, Schema.org, Apple Web App, preload, meta/link tags, and more
- Granular robots/crawlers control
- Mobile and PWA optimizations
- Plugin system for custom SEO logic
- Easy fallback and defaulting for required fields
- Simple integration with generateMetadata and static export
- Extensible and modular architecture

---

## Installation

```bash
npm install amphibian-seo
# or
yarn add amphibian-seo
```

---

## Quick Start

```ts
import { generateMetadata } from "amphibian-seo";

const metadata = generateMetadata({
  title: "My Page",
  description: "Page description",
  openGraph: {
    title: "My Page",
    url: "https://mysite.com",
    images: [{ url: "https://mysite.com/og-image.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@mysite",
  },
  robots: "index,follow",
  additionalMetaTags: [
    { name: "viewport", content: "width=device-width, initial-scale=1" },
  ],
  // ...see full SEOOptions below
});
```

---

## SEOOptions Reference

The main API is the `SEOOptions` interface, which supports all major SEO, social, and web app fields. Below is a summary of the most important options:

```ts
interface SEOOptions {
  title?: string;
  description?: string;
  keywords?: string[];
  openGraph?: Record<string, unknown>;
  twitter?: Record<string, unknown>;
  robots?: string | Record<string, unknown>;
  jsonLd?: Array<Record<string, unknown>>;
  schemaOrgJSONLD?: Record<string, unknown> | Array<Record<string, unknown>>;
  canonical?: string;
  additionalMetaTags?: Array<{ name?: string; property?: string; content: string }>;
  additionalLinkTags?: Array<{ rel: string; href: string; type?: string; sizes?: string }>;
  customFavicons?: Array<{ href: string; rel?: string; type?: string; sizes?: string }>;
  icons?: Array<{ rel: string; href: string; sizes?: string; type?: string }>;
  authors?: Array<{ name: string; url?: string }>;
  publisher?: string;
  copyright?: string;
  security?: {
    contentSecurityPolicy?: string;
    xFrameOptions?: string;
    xContentTypeOptions?: string;
    referrerPolicy?: string;
    metaTags?: Array<{ httpEquiv: string; content: string }>;
  };
  // ...many more! See source for full type
}
```

See [`src/index.ts`](src/index.ts) for the full type with all advanced options (PWA, AMP, analytics, web3, local SEO, accessibility, etc).

---

## Advanced Usage

### Fallbacks and Defaults

If you omit required fields like `title` or `description`, the toolkit will automatically apply safe defaults:

```ts
const meta = generateMetadata({});
console.log(meta.title); // "Default Title"
console.log(meta.description); // "Default Description"
```

### Custom Meta/Link Tags

```ts
const meta = generateMetadata({
  additionalMetaTags: [
    { name: "theme-color", content: "#fff" },
    { property: "og:type", content: "website" },
  ],
  additionalLinkTags: [
    { rel: "canonical", href: "https://mysite.com" },
    { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
  ],
});
```

### JSON-LD and Schema.org

```ts
const meta = generateMetadata({
  jsonLd: [
    { "@type": "WebSite", url: "https://mysite.com" },
  ],
  schemaOrgJSONLD: { "@type": "Organization", name: "My Company" },
});
```

### Favicons and Icons

```ts
const meta = generateMetadata({
  customFavicons: [
    { href: "/favicon.ico", rel: "icon", type: "image/x-icon" },
    { href: "/icon.png", rel: "icon", type: "image/png" },
  ],
  icons: [
    { rel: "apple-touch-icon", href: "/apple.png", sizes: "180x180" },
  ],
});
```

---

## Next.js Integration

### App Router (Recommended)

```ts
// app/layout.tsx or app/page.tsx
import { generateMetadata } from "amphibian-seo";
import type { Metadata } from "next";

export const metadata: Metadata = generateMetadata({
  title: "My Page",
  description: "Page description",
  // ...other SEOOptions
});
```

### Static Export

You can use the toolkit to generate static meta tags for export or SSG:

```ts
import { generateMetadata } from "amphibian-seo";
const meta = generateMetadata({ ... });
// Render meta tags in your static HTML
```

---

## Plugin System

You can extend or override SEO logic using plugins:

```ts
import { registerPlugin, applyPlugins } from "amphibian-seo";
import type { SEOOptions } from "amphibian-seo";

const myPlugin = (options: SEOOptions) => ({
  title: options.title ? options.title + " | MyBrand" : "MyBrand",
});

registerPlugin(myPlugin);

const meta = applyPlugins({ title: "Home" });
// meta.title === "Home | MyBrand"
```

---

## Testing

- All core features are covered by Jest tests in the `tests/` folder.
- To run tests:

```bash
npm test
# or
yarn test
```

---

## Production Tips
- Always provide a unique `title` and `description` for each page.
- Use `canonical` and `hreflang` for international/multilingual sites.
- Use `jsonLd` and `schemaOrgJSONLD` for rich results and better indexing.
- Use the plugin system for custom branding or dynamic SEO logic.
- Validate your output with tools like [Google Rich Results Test](https://search.google.com/test/rich-results).

---

## FAQ

**Q: Is this compatible with Next.js 14+ and the App Router?**
> Yes! Designed for App Router and works with all modern Next.js versions.

**Q: Can I use this with static export or SSG?**
> Yes, you can generate static meta tags and JSON-LD for any framework or static site.

**Q: Does it support TypeScript?**
> 100%. All types are exported and fully documented.

**Q: How do I add custom meta tags?**
> Use `additionalMetaTags` and `additionalLinkTags` fields in your config.

**Q: Can I extend the toolkit?**
> Yes, use the plugin system to add or override any logic.

---

## License

MIT
