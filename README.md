```markdown
# @0xgotchi/seo

A small utility to produce Next.js App Router compatible `Metadata` objects from a single, friendly SEO configuration object.

- Works best with Next.js 13+ App Router.
- Exports a primary helper function named `metadata` (see usage notes about avoiding name collisions when exporting `metadata` from your layout).
- Use it to centralize SEO configuration and generate `Metadata` for layouts/pages.

## Table of contents

- Installation
- Quick start (App Router)
- Examples
  - App Router (metadata.ts)
  - Using generated metadata in layout.tsx (App Router)
  - Pages Router (next/head) mapping example
  - Dynamic metadata and server components
- Configuration (SeoConfig)
- API reference
- TypeScript tips
- i18n and alternate URLs
- Favicons & images
- Custom meta tags
- Common troubleshooting
- Testing & verifying metadata
- Contributing
- License
- FAQ

---

## Installation

```bash
bun add @0xgotchi/seo
```



---

## Quick start (App Router)

Create a `metadata.ts` file (or any module) and export a `metadata` object compatible with the App Router.

Important: this package exports a helper function named `metadata` that converts your friendly SEO config into a Next.js `Metadata` shape. Because Next.js uses the exported identifier `metadata` from a layout file, you should alias the helper on import to avoid a naming collision when you export the final `metadata` value from your module.

Example: Aurora Coffee (file: `app/metadata.ts`)

```ts
import type { Metadata } from "next";
// The exported helper is named `metadata`. To avoid colliding with the name
// Next.js expects (`export const metadata = ...`), import the helper with an alias.
import { metadata as buildMetadata } from "@0xgotchi/seo";

const seoConfig = {
  title: "Aurora Coffee Co.",
  description:
    "Aurora Coffee Co. — specialty coffees, seasonal blends and cozy spaces.",
  metadataBase: "https://auroracoffee.example",
  alternates: {
    canonical: "https://auroracoffee.example/menu/",
    favicons: [
      { rel: "icon", href: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    # @0xgotchi/seo

    A small utility to produce Next.js App Router compatible Metadata objects from a single, friendly SEO configuration object.

    This README is aligned with the runtime behavior and TypeScript declarations found in `dist/index.js` and `dist/index.d.ts`.

    - Works best with Next.js 13+ App Router.
    - Exports a primary helper function named `metadata` (see usage notes about avoiding name collisions when exporting `metadata` from your layout).
    - Centralizes SEO configuration and generates `Metadata` objects for layouts/pages (static or dynamic).

    ## Table of contents

    - Installation
    - Quick start (App Router)
    - Examples
      - App Router (metadata.ts)
      - Using generated metadata in layout.tsx (App Router)
      - Pages Router (next/head) mapping example
      - Dynamic metadata and server components
    - Behavior and edge cases
    - API reference (functions + types)
    - Validation helper
    - Favicons & images
    - Custom meta tags
    - Testing & verifying metadata
    - Contributing
    - License

    ---

    ## Installation

    ```bash
    # npm
    npm install @0xgotchi/seo --save

    # yarn
    yarn add @0xgotchi/seo

    # pnpm
    pnpm add @0xgotchi/seo
    ```

    ---

    ## Quick start (App Router)

    Create a `metadata.ts` (or `.js`) file and export a `metadata` value compatible with the App Router. The package exports a helper function named `metadata`. Because Next.js also expects an exported identifier named `metadata` from layout files, import the helper with an alias to avoid a naming collision.

    Example: `app/metadata.ts`

    ```ts
    import type { Metadata } from "next";
    // import the helper with an alias to avoid colliding with Next's `metadata` export
    import { metadata as buildMetadata } from "@0xgotchi/seo";

    const seoConfig = {
      title: "Aurora Coffee Co.",
      description: "Aurora Coffee Co. — specialty coffees, seasonal blends and cozy spaces.",
      metadataBase: "https://auroracoffee.example",
      alternates: {
        canonical: "https://auroracoffee.example/menu/",
        favicons: [
          { rel: "icon", href: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
          { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
        ],
      },
      openGraph: {
        title: "Menu — Aurora Coffee Co.",
        description: "Check out our seasonal lattes and single-origin pour-overs.",
        url: "https://auroracoffee.example/menu/",
        siteName: "Aurora Coffee Co.",
        type: "website",
        locale: "en_US",
        images: [
          {
            url: "https://auroracoffee.example/assets/og-menu.jpg",
            alt: "Aurora Coffee Co. menu and coffee cups",
            width: 1200,
            height: 630,
            type: "image/jpeg",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        site: "@auroracoffee",
      },
      customMeta: [
        { name: "theme-color", content: "#7A4A2B" },
        { name: "robots", content: "index, follow" },
      ],
    };

    // buildMetadata (helper) returns an object shaped for Next.js Metadata
    export const metadata: Metadata = buildMetadata(seoConfig as any) as unknown as Metadata;

    export default metadata;
    ```

    ---

    ## Behavior and edge cases

    This section documents precise runtime behavior implemented in `dist/index.js` and typed in `dist/index.d.ts`.

    - Title resolution
      - If `title` is a string:
        - and `titleTemplate` is a string: the helper replaces the first occurrence of `%s` with the title.
        - and `titleTemplate` is a function: the helper calls it with the title; if the function throws, it falls back to the original `title`.
      - If `title` is not a string, the helper returns a `title` object with a `default` property set to the string coercion of `title || defaultTitle || "Default Title"`.

    - Favicons normalization
      - Favicons are accepted in three places (preference order): `alternates.favicons` (preferred, an array), `alternates.favicon` (single object), and a top-level `favicon` (single object). The helper normalizes these to the `icons` array in the produced metadata where each icon becomes { rel, url, sizes, type } and `href` is mapped to `url`.

    - Alternates
      - If `alternates` is present and has keys, it's passed through to the returned metadata as `alternates` with the following fields preserved when present: `canonical`, `languages`, `feeds`, `appLinks`, `media`, `formats`.
      - If `alternates` is not present but a top-level `hreflang` array exists, the helper will convert it to an `alternates.languages` mapping where each item with { lang, href } becomes languages[lang] = href.

    - Open Graph merging (generateNextMetadata)
      - `generateNextMetadata(options, parent)` applies fallbacks first. If `parent` metadata is provided (an AsyncMetadata promise), it awaits it and merges `openGraph` objects. The merge preserves properties from both and concatenates `images` arrays (parent images first, then config images).
      - For `generateStaticNextMetadata(options)` there is no parent merge; if `openGraph.type` is not set, it defaults to `website`.

    - Twitter images fallback
      - If twitter.images is not provided, the helper will fallback to openGraph images (mapped to their `url` strings) when available.

    - Dynamic metadata generation
      - `generateDynamicNextMetadata(params, options)` replaces placeholders like `{key}` in `title` and `description` using `params` values. If `params[key]` is an array, the first element is used. If the placeholder has no matching param, it is left unchanged.

    - Validation
      - `validateSEOConfig(options)` returns an array of validation results with shape { type: "error" | "warning", field: string, message: string }.
      - It treats `title` and `description` as required and will push `error` entries if missing.
      - It emits many `warning` entries for optional but recommended fields (openGraph, twitter, robots, structuredData, breadcrumbs, pwa, socialProfiles, etc.). For `openGraph` it also warns on many subfields if they are missing (images, documents, videos, audios, event, product, location lat/long, article, profile, musicPlaylist, book).

    ---

    ## API reference (matching dist/index.d.ts)

    This section mirrors the public types and functions exported by the package. The text below is a human-friendly summary — rely on `dist/index.d.ts` for exact types.

    Primary types (high level):

    - SEOConfig: the input configuration object accepted by helpers. It contains top-level fields such as `title`, `defaultTitle`, `titleTemplate`, `description`, `keywords`, `metadataBase`, `openGraph`, `twitter`, `robots`, `alternates`, `customMeta`, `authors`, `publisher`, `viewport`, `hreflang`, `manifest`, `pwa`, `socialProfiles`, `verification`, `structuredData`, `assets`, `archives`, `other`, and many experimental/runtime-specific keys. See `dist/index.d.ts` for the complete shape.

    - NextJSMetadata: the output shape intended to align with Next.js `Metadata` (title can be a string or an object with `template` and `default`, `metadataBase` becomes a URL if provided, `icons`, `openGraph`, `twitter`, etc.). See `dist/index.d.ts`.

    Primary functions (exports):

    - generateNextMetadata(options: SEOConfig, parent?: AsyncMetadata): Promise<NextJSMetadata>
      - Produces runtime metadata by applying fallbacks and merging with an optional `parent` metadata (awaited). Uses logic described in "Behavior and edge cases".

    - generateStaticNextMetadata(options: SEOConfig): NextJSMetadata
      - Produces static metadata object (no parent merge). Ensures `openGraph.type` defaults to `website` if not provided.

    - metadata(options: SEOConfig): NextJSMetadata
      - Primary helper which maps the provided `SEOConfig` into Next.js-compatible metadata. It normalizes favicons, maps twitter/openGraph fallback logic, and converts `metadataBase` strings to `URL` instances when present.

    - generateLayoutNextMetadata
      - Alias of `metadata` (exported as `generateLayoutNextMetadata = metadata` in dist)

    - generateDynamicNextMetadata(params: { [key: string]: string | string[] }, options: SEOConfig): Promise<NextJSMetadata>
      - Replaces `{key}` placeholders in `title` and `description` using `params` and then delegates to `generateStaticNextMetadata`.

    - validateSEOConfig(options: SEOConfig): Array<{ type: "error" | "warning"; field: string; message: string }>
      - Returns validation results. `title` and `description` missing => errors. Many recommended fields produce warnings.

    ---

    ## Favicons & images

    - The helper maps favicon objects with `href` to metadata `icons` entries using `url` property.
    - `alternates.favicons` (array) is preferred. If absent, `alternates.favicon` (single) or top-level `favicon` (single) are used.
    - OpenGraph images accept objects with `url` (string|URL), `width`, `height`, `alt`, and `type`.

    ---

    ## Custom meta tags

    - `customMeta` in `SEOConfig` is passed through as `customMeta` in the returned metadata when present. Each entry typically includes `name` or `property` with a `content` value.

    ---

    ## Validation helper

    Use `validateSEOConfig` to get quick guidance before sending metadata to a page. It returns structured errors and warnings so you can fail fast or log suggestions in CI.

    Example:

    ```js
    import { validateSEOConfig } from "@0xgotchi/seo";

    const results = validateSEOConfig({ title: "x" });
    // results is an array of errors/warnings; inspect or throw on errors in CI
    ```

    ---

    ## Examples

    Pages Router (rendering manually with next/head)

    ```tsx
    import Head from "next/head";
    import { metadata as buildMetadata } from "@0xgotchi/seo";

    const seoConfig = { title: "Starlight Books", description: "..." };
    const md = buildMetadata(seoConfig as any);

    export default function MyPage() {
      return (
        <>
          <Head>
            <title>{typeof md.title === "string" ? md.title : md.title?.default}</title>
            <meta name="description" content={md.description as string} />
            {md.openGraph?.images?.map((img: any, i: number) => (
              <meta key={i} property="og:image" content={String(img.url)} />
            ))}
          </Head>
          <main>...</main>
        </>
      );
    }
    ```

    Dynamic server component example using generateMetadata

    ```ts
    import { metadata as buildMetadata } from "@0xgotchi/seo";
    import { getPostBySlug } from "@/lib/cms";
    import type { Metadata } from "next";

    export async function generateMetadata({ params }): Promise<Metadata> {
      const post = await getPostBySlug(params.slug);
      const seoConfig = {
        title: post.title,
        description: post.excerpt,
        openGraph: {
          title: post.title,
          description: post.excerpt,
          url: `https://example.com/posts/${params.slug}`,
          images: [{ url: post.ogImage, alt: post.title, width: 1200, height: 630 }],
        },
      };

      return buildMetadata(seoConfig as any) as unknown as Metadata;
    }

    export default async function PostPage({ params }) {
      const post = await getPostBySlug(params.slug);
      return <article>{/* ... */}</article>;
    }
    ```

    ---

    ## Testing & verifying metadata

    - Inspect page source or use social preview tools (Facebook Sharing Debugger, Twitter Card Validator).
    - Unit tests should call `metadata`, `generateStaticNextMetadata`, `generateNextMetadata` and `generateDynamicNextMetadata` with representative configs and assert the returned objects.

    ---

    ## Contributing

    Contributions are welcome. When changing behavior, update `dist/index.d.ts` and `dist/index.js` accordingly and add tests to `tests/` for new behaviors or edge cases.

    ---

    ## License

    MIT (or check the repository license file).

    ---

    ## Completion note

    This README was updated to match the runtime behavior and TypeScript declaration files found in `dist/index.js` and `dist/index.d.ts`. If you want, I can now run the TypeScript build and tests to ensure everything passes.
