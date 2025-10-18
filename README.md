# @0xgotchi/seo

Table of contents
- Overview
- Features — All supported fields (exhaustive)
- Installation (bun only)
- Quick start (App Router)
- API summary
- Examples (App Router: layout.tsx)
  - Simple example (static metadata)
  - Medium example (full features demo, parent merge, dynamic params)
- Validation
- Recommendations
- Contributing and license

---

## Overview

@0xgotchi/seo converts a single SEO configuration object (SEOConfig) into metadata objects compatible with the Next.js App Router Metadata API (NextJSMetadata). It provides utilities to:

- generate static metadata for App Router (`generateStaticNextMetadata`)
- generate metadata that can merge with a parent metadata (`generateNextMetadata`)
- generate metadata with param placeholders replaced (`generateDynamicNextMetadata`)
- convert an SEOConfig into a metadata object (`metadata`)
- validate an SEOConfig and return errors/warnings (`validateSEOConfig`)
- normalize favicons and map them into Next.js icons shape
- propagate many advanced fields (serviceWorker, webAssembly, streaming, rspack, bundleAnalysis, etc.)

This README contains two ready-to-copy `layout.tsx` examples. The medium example exposes an `ALL_FEATURES` object and renders it so the page shows absolutely every feature the library supports.

---

## Features — All supported fields (exhaustive)

When provided in the input `SEOConfig`, the library will propagate the following fields into the resulting `NextJSMetadata`. The resulting metadata filters out `undefined` values; only provided fields will be present.

Top-level fields and groups supported:
- `title`, `defaultTitle`, `titleTemplate`
- `description`
- `keywords`
- `siteUrl`
- `metadataBase`
- `viewport`
- `formatDetection`
- `referrer`
- `colorScheme`
- `themeColor`
- `manifest` / `pwa.manifest`
- `twitter` (card, title, description, creator, site, images, player, player_width, player_height)
- `openGraph` (OpenGraphData): title, description, url, siteName, type, images, videos, audios, documents, event, product, article, profile, musicPlaylist, book, latitude, longitude, locale, locale_alternate, fb_pages, fb_app_id, news_keywords, publication_date, determiner, accessibilityLabel, accessibilityHint, copyright, license, rating, age_group, estimated_reading_time
- `alternates`: canonical, languages, favicons, feeds, appLinks, media, formats (the library tolerates `alternates.favicon` or a top-level `favicon` for backwards compatibility)
- `hreflang` (array of `{ lang, href }`)
- `breadcrumbs`
- `structuredData`
- `schemaRecipe`, `schemaFAQ`, `schemaProduct`, `schemaEvent`, `schemaReview`
- `customMeta` (array of `{ name?, property?, content }`)
- `socialProfiles`
- `preloadAssets`
- `verification`
- `authors`
- `publisher`
- `category`, `classification`, `creator`
- `runtime` (`edge` | `nodejs`)
- `streaming` (`enabled`, `priority`)
- `experimental` (`ppr`, `serverActions`, `turbopack`)
- `loading` (`skeleton`, `suspense`)
- `error` (`boundary`, `fallback`)
- `bundleAnalysis` (`enabled`, `chunks`)
- `rspack` (`optimization`)
- `webAssembly` (`enabled`, `modules`)
- `serviceWorker` (`enabled`, `cacheStrategy`)
- `other` (arbitrary record)
- Any extra unknown top-level keys are preserved in the output

Notes:
- `generateNextMetadata` and `generateStaticNextMetadata` apply sensible fallbacks for title, description, viewport and colorScheme.
- Favicons are normalized: the code checks `alternates.favicons`, then `alternates.favicon`, then a top-level `favicon` object.
- If a `parent` `AsyncMetadata` is provided to `generateNextMetadata`, the library merges `parent.openGraph.images` with the child's `openGraph.images`.

---

## Installation
Install with bun:

```bash
bun add @0xgotchi/seo
```

---

## Quick start (App Router)

Use one of these patterns in the Next.js App Router:

1) Static metadata exported from a layout/page
- Use `generateStaticNextMetadata` and export the result as:
  ```ts
  export const metadata = generateStaticNextMetadata(mySEOConfig)
  ```

2) Dynamic metadata that merges with parent metadata
- Implement `export async function generateMetadata(parent)` in your layout/page and call:
  ```ts
  const metadata = await generateNextMetadata(mySEOConfig, parent)
  ```

3) Dynamic metadata with parameter substitution
- Use `generateDynamicNextMetadata(params, options)` to replace placeholders like `{slug}` in `title` or `description`.

Which to use:
- Use `generateStaticNextMetadata` for static/SSG content.
- Use `generateNextMetadata` inside a `generateMetadata(parent)` implementation to merge metadata with a parent layout.
- Use `generateDynamicNextMetadata` to inject path params into templates.

---

## API summary

Exports:
- `generateNextMetadata(options: SEOConfig, parent?: AsyncMetadata): Promise<NextJSMetadata>`
- `generateStaticNextMetadata(options: SEOConfig): NextJSMetadata`
- `generateDynamicNextMetadata(params: { [k: string]: string | string[] }, options: SEOConfig): Promise<NextJSMetadata>`
- `metadata(options: SEOConfig): NextJSMetadata`
- `generateLayoutNextMetadata` (alias to `metadata`)
- `validateSEOConfig(options: SEOConfig): Array<{ type: "error"|"warning", field: string, message: string }>`

Types:
- `SEOConfig` — input config shape
- `NextJSMetadata` — Next.js Metadata API compatible shape
- `AsyncMetadata` — Promise resolving to partial metadata (used as `parent`)

See `index.d.ts` in the package for exact TypeScript declarations.

---

## Examples (App Router: layout.tsx)

Below are two complete examples formatted as `layout.tsx` files. They follow the minimal RootLayout structure produced by `npx create-next-app` but include the `@0xgotchi/seo` usage. Copy the file contents into `app/layout.tsx` or separate layout files as indicated by the file path hint.

### Simple example (static metadata)

File path hint: `app/simple-layout.tsx`

```tsx
import React from "react";
import { generateStaticNextMetadata, validateSEOConfig, type SEOConfig, type NextJSMetadata } from "@0xgotchi/seo";

const simpleSEOConfig: SEOConfig = {
  title: "Simple Page",
  description: "A very simple page description for SEO",
  alternates: {
    canonical: "https://example.com/simple",
    favicons: [{ rel: "icon", href: "/favicon-simple.png", sizes: "32x32", type: "image/png" }],
  },
  openGraph: {
    title: "Simple OG Title",
    description: "OpenGraph description for simple page",
    images: [{ url: "https://example.com/simple-og.png", width: 1200, height: 630 }],
  },
};

export const metadata: NextJSMetadata = generateStaticNextMetadata(simpleSEOConfig);

export default function RootLayout({ children }: { children: React.ReactNode }) {
  if (process.env.NODE_ENV !== "production") {
    const issues = validateSEOConfig(simpleSEOConfig);
    if (issues.length > 0) {
      // eslint-disable-next-line no-console
      console.warn("SEO validation issues (simple):", issues);
    }
  }

  return (
    <html lang="en">
      <head />
      <body>
        <div style={{ padding: 24 }}>
          <header>
            <h1>Simple Layout</h1>
            <p>Static metadata exported using generateStaticNextMetadata.</p>
          </header>

          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
```

---

### Medium example (full features demo, parent merge, dynamic params)

File path hint: `app/medium-layout.tsx`

This example demonstrates:
- `ALL_FEATURES` — a comprehensive SEOConfig object showing essentially all supported fields
- `generateMetadata(parent?)` — merges with `parent` metadata via `generateNextMetadata`
- `generateDynamicNextMetadata` — shows how to replace `{slug}` and other placeholders with params
- The layout renders the `ALL_FEATURES` JSON so the page displays absolutely every resource offered

```tsx
import React from "react";
import {
  generateNextMetadata,
  generateDynamicNextMetadata,
  validateSEOConfig,
  type SEOConfig,
  type NextJSMetadata,
  type AsyncMetadata,
} from "@0xgotchi/seo";

/**
 * ALL_FEATURES: comprehensive example configuration demonstrating virtually every supported field.
 * Replace sample URLs / values with your real values when using in production.
 */
const ALL_FEATURES: SEOConfig = {
  title: "Full Features Demo",
  defaultTitle: "Default Site Title",
  titleTemplate: "%s | Example Site",
  description: "A comprehensive SEO configuration demonstrating all supported fields.",
  keywords: ["seo", "metadata", "nextjs", "example"],
  siteUrl: "https://example.com",
  metadataBase: "https://example.com",
  viewport: "width=device-width, initial-scale=1",
  formatDetection: { telephone: false },
  referrer: "strict-origin-when-cross-origin",
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  manifest: "/site.webmanifest",
  pwa: {
    manifest: "/site.webmanifest",
    themeColor: "#ffffff",
    appleStatusBarStyle: "black-translucent",
    appleMobileWebAppCapable: true,
  },
  twitter: {
    card: "summary_large_image",
    title: "Twitter Title",
    description: "Twitter description",
    creator: "@example",
    site: "@example",
    images: ["https://example.com/twitter-image.jpg"],
    player: "https://example.com/player",
    player_width: 1280,
    player_height: 720,
  },
  openGraph: {
    title: "OG Title",
    description: "OG Description",
    url: "https://example.com/page",
    siteName: "Example Site",
    type: "website",
    images: [
      { url: "https://example.com/og1.png", width: 1200, height: 630, alt: "OG 1" },
      { url: "https://example.com/og2.png", width: 800, height: 600, alt: "OG 2" },
    ],
    videos: [{ url: "https://example.com/video.mp4", width: 1280, height: 720, type: "video/mp4", alt: "Video demo" }],
    audios: [{ url: "https://example.com/audio.mp3", type: "audio/mpeg", alt: "Audio demo" }],
    documents: [{ url: "https://example.com/spec.pdf", type: "application/pdf", title: "Spec PDF" }],
    event: { name: "Demo Launch", start_time: "2026-01-01T10:00:00Z", end_time: "2026-01-01T12:00:00Z", location: "Online", url: "https://example.com/event" },
    product: { name: "Example Product", price: "19.99", currency: "USD", brand: "Example", availability: "in stock", url: "https://example.com/product" },
    latitude: 37.7749,
    longitude: -122.4194,
    article: { author: "Jane Doe", published_time: "2025-10-01T12:00:00Z", modified_time: "2025-10-02T12:00:00Z", section: "News", tag: ["release", "example"] },
    profile: { first_name: "Jane", last_name: "Doe", username: "janedoe", gender: "female" },
    musicPlaylist: { creator: "DJ Example", song: [{ url: "https://example.com/song.mp3", title: "Hit Single" }] },
    book: { author: "Author Example", isbn: "978-3-16-148410-0", release_date: "2025-09-01" },
    locale: "en-US",
    locale_alternate: ["pt-BR"],
    fb_pages: ["1234567890"],
    fb_app_id: "9876543210",
    news_keywords: ["news", "updates"],
    publication_date: "2025-10-01T00:00:00Z",
    determiner: "the",
    accessibilityLabel: "Main page",
    accessibilityHint: "Opens main content",
    copyright: "© 2025 Example",
    license: "MIT",
    rating: "5/5",
    age_group: "all",
    estimated_reading_time: "5 min",
  },
  alternates: {
    canonical: "https://example.com/full",
    languages: { "en-US": "https://example.com/en", "pt-BR": "https://example.com/pt" },
    favicons: [
      { rel: "icon", href: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    feeds: [{ type: "application/rss+xml", href: "/rss.xml" }],
    appLinks: [{ platform: "android", url: "android-app://com.example" }],
    media: [{ media: "only screen and (max-width: 600px)", href: "/mobile" }],
    formats: [{ type: "application/pdf", href: "/document.pdf" }],
  },
  hreflang: [{ lang: "en-US", href: "https://example.com/en" }],
  breadcrumbs: [{ name: "Home", url: "/" }, { name: "Docs", url: "/docs" }],
  structuredData: [{ "@type": "WebSite", name: "Example", url: "https://example.com" }],
  schemaRecipe: { "@type": "Recipe", name: "Sample Recipe" },
  schemaFAQ: { "@type": "FAQPage" },
  schemaProduct: { "@type": "Product", name: "Example Product" },
  schemaEvent: { "@type": "Event", name: "Launch Event" },
  schemaReview: { "@type": "Review", reviewBody: "Excellent!" },
  customMeta: [{ name: "color-scheme", content: "light dark" }],
  socialProfiles: [{ network: "twitter", url: "https://twitter.com/example" }],
  preloadAssets: [{ href: "/fonts/example.woff2", as: "font", type: "font/woff2", crossorigin: "anonymous" }],
  verification: { google: "google-verification-code" },
  authors: [{ name: "Jane Doe", url: "https://example.com/authors/jane" }],
  publisher: "Example Publisher",
  category: "Documentation",
  classification: "Guides",
  creator: "Example Team",
  runtime: "edge",
  streaming: { enabled: true, priority: "high" },
  experimental: { ppr: false, serverActions: true, turbopack: false },
  loading: { skeleton: true, suspense: false },
  error: { boundary: true, fallback: "/error" },
  bundleAnalysis: { enabled: false, chunks: ["main", "vendor"] },
  rspack: { optimization: { minimize: false } },
  webAssembly: { enabled: false, modules: [] },
  serviceWorker: { enabled: false, cacheStrategy: "networkFirst" },
  other: { customKey: "customValue" },
};

export async function generateMetadata(parent?: AsyncMetadata) {
  const base: SEOConfig = {
    title: "Medium Example Page",
    description: "This page demonstrates combining parent metadata and showing everything.",
    alternates: { canonical: "https://example.com/medium" },
    openGraph: { images: [{ url: "https://example.com/medium-og.png", width: 1200, height: 630 }] },
  };

  const combined: SEOConfig = {
    ...ALL_FEATURES,
    ...base,
    alternates: { ...(ALL_FEATURES.alternates || {}), ...(base.alternates || {}) },
    openGraph: { ...(ALL_FEATURES.openGraph || {}), ...(base.openGraph || {}) },
  };

  return await generateNextMetadata(combined, parent);
}

/**
 * Example: replace placeholders with path params
 *
 * Params example: { slug: "post-1", author: "alice" }
 */
export async function generateMetadataWithParams(params: { [k: string]: string | string[] }) {
  const conf: SEOConfig = {
    title: "Article: {slug}",
    description: "Post by {author}",
    alternates: { canonical: "https://example.com/articles/{slug}" },
  };

  return await generateDynamicNextMetadata(params, conf);
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  if (process.env.NODE_ENV !== "production") {
    const issues = validateSEOConfig(ALL_FEATURES);
    if (issues.length > 0) {
      // eslint-disable-next-line no-console
      console.warn("SEO validation issues (full features demo):", issues);
    }
  }

  return (
    <html lang="en">
      <head />
      <body>
        <div style={{ padding: 24 }}>
          <header>
            <h1>Medium Layout — Full Features Demo</h1>
            <p>This layout renders the ALL_FEATURES object, showing every supported field.</p>
          </header>

          <section style={{ marginTop: 20 }}>
            <h2>All supported features (example values)</h2>
            <pre style={{ background: "#f5f5f5", padding: 12, whiteSpace: "pre-wrap" }}>
              {JSON.stringify(ALL_FEATURES, null, 2)}
            </pre>
          </section>

          <main style={{ marginTop: 20 }}>{children}</main>
        </div>
      </body>
    </html>
  );
}
```

---

## Validation

Use `validateSEOConfig` during development or CI to surface missing or recommended fields:

```ts
import { validateSEOConfig } from "@0xgotchi/seo";

const issues = validateSEOConfig({ title: "Hi" }); // will report missing description, and warnings for other recommended fields
console.log(issues);
```

The validator returns an array of objects, each with:
- `type`: `"error"` | `"warning"`
- `field`: string path to the offending field (e.g., `openGraph.images`)
- `message`: human-friendly explanation

---

## Recommendations

- Provide at minimum `title`, `description`, `alternates.canonical`, and at least one `openGraph.images` for best social sharing and search engine previews.
- Use `generateStaticNextMetadata` for static pages and SSG.
- Use `generateNextMetadata` inside `generateMetadata(parent)` to merge with parent layout metadata (e.g., to extend parent OpenGraph images).
- Use `generateDynamicNextMetadata` to inject route params into title/description templates.

---

## Contributing and license

Contributions welcome. Open issues and PRs. Add tests for edge cases (OpenGraph image URL types, parent merging, favicon normalization). Include a `LICENSE` file (for example MIT) in the repository root.

---

End of README
