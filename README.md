# 0xgotchi/seo

Modern SSR-first SEO metadata toolkit for Next.js App Router.
Fully compatible with Next.js `generateMetadata`, static rendering, and TypeScript.

This README explains how to install and use the package in your Next.js App Router (app directory) — for both static (exported `metadata`) and dynamic metadata via `generateMetadata`. All examples use TypeScript and assume you are using the Next.js App Router (layout.tsx / page.tsx).

> NOTE: This README shows the recommended integration patterns and example APIs. Replace package import paths with your installed package name if different (e.g. `@0xgotchi/seo`).

## Table of contents

- Installation
- Quick start (static metadata in layout.tsx)
- Dynamic metadata with generateMetadata
- Full-featured example: blog post layout
- API (options & types)
- Open Graph, Twitter Cards, JSON-LD
- SSR / static rendering notes and best practices
- Testing & debugging
- Contributing

---

## Installation

Using npm:
```bash
npm install @0xgotchi/seo
```

Using yarn:
```bash
yarn add @0xgotchi/seo
```

Using pnpm:
```bash
pnpm add @0xgotchi/seo
```

(If your package uses a different name on npm, install that package name instead.)

---

## Quick start — static metadata in layout.tsx

If your site uses mostly static metadata (compile-time), you can export a `metadata` object from a server component (for example `app/layout.tsx`) and Next.js will use it.

This package provides a small helper `buildSeo` that returns a Next-compatible `Metadata` object. You can also export metadata directly if you prefer.

Example `app/layout.tsx` (TypeScript server component):

```tsx
// app/layout.tsx
import type { ReactNode } from "react";
import { buildSeo } from "@0xgotchi/seo"; // helper that returns Next Metadata

export const metadata = buildSeo({
  title: "My Site — Home",
  description: "Welcome to my site. Fast, accessible and SEO-friendly.",
  canonical: "https://example.com",
  openGraph: {
    title: "My Site",
    description: "Welcome to my site",
    url: "https://example.com",
    images: [{ url: "https://example.com/og-image.png", alt: "My Site" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@mytwitter",
  },
  robots: {
    index: true,
    follow: true,
  },
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

What this does:
- `buildSeo` returns a Next-compatible `Metadata` object that Next will use for the whole app.
- Because this is a plain `metadata` export (not `generateMetadata`), Next can statically optimize and embed metadata at build-time.

---

## Dynamic metadata with generateMetadata

When metadata depends on route params, server-side data, or other runtime inputs, export `generateMetadata` from your layout or page. `generateMetadata` runs on the server and can be async.

Example: `app/blog/[slug]/layout.tsx`

```tsx
// app/blog/[slug]/layout.tsx
import type { Metadata } from "next";
import { buildSeo } from "@0xgotchi/seo";
import { getPost } from "@/lib/data";

type Props = {
  params: { slug: string };
  children: React.ReactNode;
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug); // fetch post data from CMS or DB

  if (!post) {
    return buildSeo({
      title: "Post not found",
      description: "This post could not be found",
      robots: { noindex: true, nofollow: true },
    });
  }

  return buildSeo({
    title: post.title,
    description: post.excerpt,
    canonical: `https://example.com/blog/${params.slug}`,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://example.com/blog/${params.slug}`,
      images: [{ url: post.ogImage, alt: post.title }],
      type: "article",
      publishedTime: post.publishedAt,
      authors: post.author ? [post.author.name] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      creator: post.author?.twitter,
    },
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      author: post.author ? { "@type": "Person", name: post.author.name } : undefined,
      datePublished: post.publishedAt,
    },
  });
}

export default function PostLayout({ children }: Props) {
  return <article>{children}</article>;
}
```

Notes:
- `generateMetadata` can perform server-side fetches. Because this runs on the server, it’s safe to request private APIs or connect to databases.
- Returning a `Metadata` object is the recommended approach — this package's helper returns that object shape.

---

## Full example: blog post layout + fallback defaults

You typically want global defaults (site-wide) and per-page overrides. Use a small helper to merge defaults with page metadata.

Example `app/layout.tsx` (root):

```tsx
// app/layout.tsx
import { buildSeo } from "@0xgotchi/seo";

export const metadata = buildSeo({
  title: "Example Blog",
  description: "Thoughts, tutorials, and updates",
  canonical: "https://example.com",
  openGraph: {
    siteName: "Example Blog",
    images: [{ url: "https://example.com/default-og.png", alt: "Example Blog" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@example",
  },
});
```

Then in a nested `generateMetadata` you can merge defaults with page-specific metadata:

```tsx
// app/blog/[slug]/layout.tsx
import type { Metadata } from "next";
import { buildSeo, mergeSeo } from "@0xgotchi/seo"; // mergeSeo merges defaults and overrides
import { getPost } from "@/lib/data";

export async function generateMetadata({ params, parent }: { params: { slug: string }; parent: Function }): Promise<Metadata> {
  const post = await getPost(params.slug);
  const parentMetadata = await parent(); // parent() returns parent metadata (Next 14+)
  const pageSeo = buildSeo({
    title: post.title,
    description: post.excerpt,
    openGraph: { images: [{ url: post.ogImage, alt: post.title }] },
  });
  return mergeSeo(parentMetadata, pageSeo);
}
```

If your runtime of Next supports `parent()` inside `generateMetadata`, prefer merging with the returned parent metadata so you preserve site defaults.

---

## API (options & types)

This package is designed to return Next's `Metadata` shape. Common fields you can provide are:

- title: string
- description: string
- canonical: string (preferred URL)
- robots: { index?: boolean; follow?: boolean; noindex?: boolean; nofollow?: boolean; maxSnippet?: number; nosnippet?: boolean }
- openGraph: {
  - title?: string
  - description?: string
  - url?: string
  - type?: string (e.g., "website", "article")
  - images?: Array<{ url: string; alt?: string; width?: number; height?: number }>
  - publishedTime?: string
  - authors?: string[]
  }
- twitter: { card?: "summary" | "summary_large_image"; site?: string; creator?: string }
- jsonLd: any (structured data)

Example TypeScript type (illustrative):

```ts
export type SeoOptions = {
  title?: string;
  description?: string;
  canonical?: string;
  robots?: {
    index?: boolean;
    follow?: boolean;
  };
  openGraph?: {
    title?: string;
    description?: string;
    url?: string;
    images?: { url: string; alt?: string }[];
    type?: string;
    publishedTime?: string;
    authors?: string[];
  };
  twitter?: {
    card?: string;
    site?: string;
    creator?: string;
  };
  jsonLd?: Record<string, any>;
};
```

`buildSeo(options: SeoOptions): Metadata` — returns the Next `Metadata` object.

`mergeSeo(base: Metadata | SeoOptions, override: SeoOptions | Metadata): Metadata` — shallow/meaningful merge of metadata (if supplied by package).

(If your installed package exposes different function names, adapt the snippets accordingly. The conceptual integration remains the same: compute/merge a Next Metadata object and either export it or return it from `generateMetadata`.)

---

## Open Graph, Twitter cards, and JSON-LD

- Always provide an OG image (`openGraph.images`) with explicit width/height when possible.
- Twitter cards use `twitter.card` and prefer `summary_large_image` for large hero images.
- For structured data (schema.org JSON-LD), use the `jsonLd` field and ensure it's valid JSON-LD. When returning JSON-LD inside metadata, Next will include it in the page head.

Example:
```ts
buildSeo({
  title: "Example Article",
  openGraph: {
    type: "article",
    images: [{ url: "https://example.com/article-og.png", alt: "Article" }],
    publishedTime: "2025-10-01T12:00:00Z",
  },
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Example Article",
    datePublished: "2025-10-01",
    author: { "@type": "Person", name: "Jane Developer" },
  }
});
```

---

## SSR, static rendering, and caching considerations

- Static metadata (exported `metadata` constant) allows Next to build or cache pages more aggressively. Use it for pages where metadata doesn't depend on user-specific or frequently changing data.
- `generateMetadata` runs on the server for each request or according to your caching configuration. You can fetch data there, but be mindful of performance and cache responses (revalidate, stale-while-revalidate, etc.).
- Avoid performing heavy computations in `generateMetadata`; fetch and compute only what you need for metadata.
- If your metadata depends on a CMS or third-party API, consider caching that data at the API layer or using Next.js ISR / revalidate strategies.

---

## TypeScript support

This toolkit is TypeScript-first. The `buildSeo` helper accepts typed options and returns `next.Metadata` (or compatible shape). Use proper types for your data fetchers:

```ts
import type { Metadata } from "next";
import { buildSeo } from "@0xgotchi/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildSeo({ title: "Typed Title" });
}
```

---

## Testing & debugging

- To verify the output, render a page locally and inspect the HTML <head>.
- Use tools such as:
  - Facebook Open Graph Debugger (Sharing Debugger)
  - Twitter Card Validator
  - Google Rich Results Test (for JSON-LD)
  - Lighthouse (SEO audit)
- If a field isn't appearing:
  - Ensure the `metadata` or returned `Metadata` from `generateMetadata` contains the expected fields.
  - If using nested layouts, check that child `generateMetadata` merges or overrides parent metadata as intended.
  - For dynamic images, ensure full URLs are used (absolute, publicly reachable).

---

## Common pitfalls

- Calling client-only code inside `generateMetadata` will fail — it runs on the server. Use server-safe APIs only.
- Using relative URLs for OG images may result in incorrect absolute URLs in crawlers. Prefer absolute URLs.
- Not merging parent metadata when using nested layouts may cause you to lose site-wide defaults.

---

## Contributing

Contributions, issues, and feature requests welcome. Please open issues or pull requests in this repository. When contributing:
- Add tests for new functionality where applicable
- Keep server-side-only code in server components / in `generateMetadata`
- Follow the repository's code style and lint rules

---

## License

Specify license information here (MIT or other — update as appropriate).

---

## FAQ

Q: Can I set different metadata per locale?
A: Yes. Use `generateMetadata` and the route `params` or request context for locale, and return locale-specific metadata.

Q: Can I use this with pages/ (Pages Router)?
A: This toolkit is focused on the App Router (app directory) and Next's `generateMetadata`. For the Pages Router, you would typically use `next/head` or a different runtime approach.