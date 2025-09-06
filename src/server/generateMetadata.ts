/**
 * Main metadata generator for Next.js App Router SEO.
 * Generates all SEO, social, and custom meta tags for Next.js App Router pages.
 */
import { Metadata as NextMetadata } from 'next';
import {
  MetadataInput,
  Author,
} from '../types';
import { DEFAULT_METADATA } from '../constants';
import { resolveTemplate } from './utils/resolveTemplate';
import { processRobotsDirectives } from './utils/processRobotsDirectives';
import { processOpenGraph } from './utils/processOpenGraph';
import { processAlternates } from './utils/processAlternates';
import { generateJsonLD } from './utils/processJsonLD';
import { processTwitterMeta } from './utils/processTwitterMeta';

/**
 * Type for additional meta tags dictionary used in metadata merging.
 */
type OtherDict = Record<string, string | number | (string | number)[] | object>;

/**
 * Merges additional meta tags into the target 'other' metadata object.
 * Used to combine custom meta/link/preload tags into the metadata output.
 * @param target The original 'other' metadata object.
 * @param additions The new meta tags to add.
 * @returns The merged 'other' metadata object.
 */
function mergeOtherMeta(
  target: NextMetadata['other'],
  additions: OtherDict
): NextMetadata['other'] {
  const base = (target ?? {}) as OtherDict;
  return { ...base, ...additions } as NextMetadata['other'];
}

/**
 * Generates the metadata object for the page, including OpenGraph, Twitter, robots, alternates, favicons, etc.
 * This is the main entry point for generating SEO metadata for Next.js App Router.
 * Handles merging of layout and route metadata, normalization of all fields, and custom favicons.
 * @param metadata The input metadata object.
 * @param parent Optional parent metadata (from layout or parent route) for merging.
 * @returns The processed metadata object, ready for Next.js.
 */
export const metadata = (
  metadata: MetadataInput,
  parent?: NextMetadata
): NextMetadata & { jsonLD?: string } => {
  // Destructure and set defaults from input and fallback to DEFAULT_METADATA
  const {
    title: rawTitle,
    defaultTitle,
    titleTemplate,
    description,
    keywords,
    canonicalUrl,
    openGraph: customOpenGraph = {},
    twitter: customTwitter = {},
    robots,
    noindex,
    nofollow,
    alternates,
    verification,
    additionalMetaTags = [],
    additionalLinkTags = [],
    customFavicons = [],
    schemaOrgJSONLD,
    pagination,
    mobileApp,
    securityMetaTags,
    themeColor,
    viewport,
    formatDetection,
    preloadAssets = [],
    authors,
    publisher,
    facebook,
    appleWebApp,
  } = { ...DEFAULT_METADATA, ...metadata };

  /**
   * Title variables for metadata output.
   */
  let title: NextMetadata['title'];
  let computedTitle: string;

  /**
   * Handle object title with default and template (supports %title% and %siteName%).
   */
  if (rawTitle && typeof rawTitle === 'object' && 'default' in rawTitle) {
    const siteNameValue = customOpenGraph.siteName || DEFAULT_METADATA.openGraph.siteName;
    const templateValue = typeof rawTitle.template === 'string'
      ? rawTitle.template
      : typeof titleTemplate === 'string'
        ? titleTemplate
        : typeof DEFAULT_METADATA.title.template === 'string'
          ? DEFAULT_METADATA.title.template
          : '';
    // Always resolve the template for the final title
    computedTitle = resolveTemplate(templateValue, {
      title: rawTitle.default,
      siteName: siteNameValue,
    }).trim();
    title = {
      default: rawTitle.default,
      template: templateValue
    };
  } 
  /**
   * Handle titleTemplate (supports %title% and %siteName%).
   */
  else if (titleTemplate) {
    const siteNameValue = customOpenGraph.siteName || DEFAULT_METADATA.openGraph.siteName;
    const defaultTitleValue = typeof rawTitle === 'string' ? rawTitle : defaultTitle || DEFAULT_METADATA.title.default;
    computedTitle = resolveTemplate(
      typeof titleTemplate === 'string' ? titleTemplate : '',
      {
        title: defaultTitleValue,
        siteName: siteNameValue,
      }
    ).trim();
    title = {
      default: defaultTitleValue,
      template: typeof titleTemplate === 'string' ? titleTemplate : ''
    };
  } 
  /**
   * Handle string title (no template).
   */
  else if (typeof rawTitle === 'string') {
    title = rawTitle;
    computedTitle = rawTitle;
  } 
  /**
   * Default case (fallback to DEFAULT_METADATA).
   */
  else {
    const siteNameValue = customOpenGraph.siteName || DEFAULT_METADATA.openGraph.siteName;
    const defaultTitleValue = defaultTitle || DEFAULT_METADATA.title.default;
    const template = DEFAULT_METADATA.title.template;
    computedTitle = resolveTemplate(template, {
      title: defaultTitleValue,
      siteName: siteNameValue,
    }).trim();
    title = {
      default: defaultTitleValue,
      template: template
    };
  }

  /**
   * Set metadataBase if canonicalUrl is provided.
   */
  const metadataBase = canonicalUrl ? new URL(canonicalUrl) : undefined;

  /**
   * Process robots meta tag content (basic and advanced).
   */
  const robotsContent = processRobotsDirectives(
    noindex !== undefined || nofollow !== undefined
      ? { noindex, nofollow }
      : robots
  );

  /**
   * Process OpenGraph metadata (only if relevant fields are present).
   * Only processes OpenGraph if at least one relevant field is present.
   */
    const hasOpenGraphData = !!(
      customOpenGraph && (
        customOpenGraph.title ||
        customOpenGraph.description ||
        customOpenGraph.url ||
        customOpenGraph.type ||
        (customOpenGraph.images && customOpenGraph.images.length > 0) ||
        customOpenGraph.siteName ||
        customOpenGraph.locale
      )
    );

    const openGraph = hasOpenGraphData
      ? processOpenGraph({
          ...DEFAULT_METADATA.openGraph,
          ...customOpenGraph,
          title: customOpenGraph?.title || computedTitle,
          description: customOpenGraph?.description || description,
          url: customOpenGraph?.url || canonicalUrl,
        })
      : undefined;

  /**
   * Process Twitter meta tags (card, title, description, image, etc).
   */
  const twitterMeta = processTwitterMeta({
    ...DEFAULT_METADATA.twitter,
    ...customTwitter,
    title: customTwitter?.title || computedTitle,
    description: customTwitter?.description || description,
  });

  /**
   * Process alternates (languages, canonical, media, types, mobile).
   */
  const processedAlternates = processAlternates(alternates);

  /**
   * Normalize authors array (string or object).
   */
  const processedAuthors: Author[] = Array.isArray(authors)
    ? authors.map((author) =>
        typeof author === 'string' ? { name: author } : author
      )
    : [];

  /**
   * Build the metadata object (layout-level, merged with parent if provided).
   */
  const layoutMetadata: NextMetadata & { jsonLD?: string } = {
    ...(typeof title === 'string'
      ? { title }
      : title
        ? { title }
        : {}),
    description,
    ...(metadataBase && { metadataBase }),
    alternates: {
      ...(canonicalUrl && { canonical: canonicalUrl }),
      ...processedAlternates,
    },
    ...(keywords?.length ? { keywords: keywords.join(', ') } : {}),
    ...(openGraph ? { openGraph } : {}), // só inclui se existir
    ...(robotsContent ? { robots: robotsContent } : {}),
    ...(verification ? { verification } : {}),
    ...(pagination
      ? {
          pagination: {
            previous: pagination?.prev ?? undefined,
            next: pagination?.next ?? undefined,
          },
        }
      : {}),
    ...(mobileApp ? { mobileApp } : {}),
    ...(securityMetaTags ? { security: securityMetaTags } : {}),
    ...(viewport ? { viewport } : {}),
    ...(formatDetection ? { formatDetection } : {}),
    ...(themeColor
      ? {
          themeColor: Array.isArray(themeColor)
            ? themeColor.map((t) => ({ media: t.media, color: t.color }))
            : themeColor,
        }
      : {}),
    authors: processedAuthors,
    ...(publisher ? { publisher } : {}),
  };

  /**
   * Merge layout metadata with child route metadata (parent), giving priority to route metadata.
   */
  const generatedMetadata: NextMetadata & { jsonLD?: string } = {
    ...layoutMetadata,
    ...(parent || {}),
  };

  /**
   * Add Facebook appId to 'other' meta if present.
   */
  if (facebook?.appId) {
    const additions: OtherDict = {
      'fb:app_id': String(facebook.appId),
    };
    generatedMetadata.other = mergeOtherMeta(generatedMetadata.other, additions);
  }

  /**
   * Add Twitter meta tags to 'other'.
   */
  const twitterMetaOther: OtherDict = {};
  Object.entries(twitterMeta).forEach(([key, value]) => {
    twitterMetaOther[key] = value;
  });
  generatedMetadata.other = mergeOtherMeta(generatedMetadata.other, twitterMetaOther);

  /**
   * Add additionalMetaTags, additionalLinkTags, customFavicons, and preloadAssets to 'other'.
   */
  if (
  additionalMetaTags.length ||
  additionalLinkTags.length ||
  customFavicons.length ||
  preloadAssets.length
  ) {
    const otherMeta: OtherDict = {};

  /**
   * Add additional meta tags to 'other'.
   */
    additionalMetaTags.forEach((tag) => {
      const key = tag.name || tag.property || tag.httpEquiv || '';
      if (key && tag.content) {
        if (key.toLowerCase() === 'robots') {
          otherMeta['robots'] = tag.content;
        } else {
          otherMeta[`meta::${key}`] = { ...tag };
        }
      }
    });

  /**
   * Add additional link tags to 'other'.
   */
    additionalLinkTags.forEach((tag) => {
      const linkKey = `link::${tag.rel}::${tag.href}`;
      otherMeta[linkKey] = {
        rel: tag.rel,
        href: tag.href,
        ...(tag.as && { as: tag.as }),
        ...(tag.crossOrigin && { crossOrigin: tag.crossOrigin }),
        ...(tag.media && { media: tag.media }),
        ...(tag.type && { type: tag.type }),
        ...(tag.sizes && { sizes: tag.sizes }),
      };
    });

  /**
   * Add custom favicons to 'other'.
   */
    customFavicons.forEach((favicon) => {
      const rel = favicon.rel || 'icon';
      const linkKey = `link::${rel}::${favicon.href}`;
      otherMeta[linkKey] = {
        rel,
        href: favicon.href,
        ...(favicon.type && { type: favicon.type }),
        ...(favicon.sizes && { sizes: favicon.sizes }),
      };
    });

  /**
   * Add preload assets to 'other'.
   */
    preloadAssets.forEach((asset) => {
      const preloadKey = `preload::${asset.href}`;
      otherMeta[preloadKey] = {
        rel: 'preload',
        href: asset.href,
        as: asset.as,
        ...(asset.crossOrigin && { crossOrigin: asset.crossOrigin }),
      };
    });

    generatedMetadata.other = mergeOtherMeta(generatedMetadata.other, otherMeta);
  }

  /**
   * Add Apple Web App meta tags to 'other'.
   */
  if (appleWebApp) {
    const { title: appleTitle, capable } = appleWebApp;
    const additions: OtherDict = {};
    if (capable !== undefined) additions['apple-mobile-web-app-capable'] = capable ? 'yes' : 'no';
    if (appleTitle) additions['apple-mobile-web-app-title'] = appleTitle;
    generatedMetadata.other = mergeOtherMeta(generatedMetadata.other, additions);
  }

  /**
   * Add JSON-LD schema if provided.
   */
  if (schemaOrgJSONLD !== undefined) {
    generatedMetadata.jsonLD = generateJsonLD(schemaOrgJSONLD);
  }

  /**
   * Return the fully processed metadata object for Next.js.
   */
  return generatedMetadata;
};