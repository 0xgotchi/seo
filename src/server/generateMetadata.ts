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

type OtherDict = Record<string, string | number | (string | number)[] | object>;

/**
 * Merges additional meta tags into the target 'other' metadata object.
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
 * Generates the metadata object for the page, including OpenGraph, Twitter, robots, alternates, etc.
 * @param metadata The input metadata object.
 * @returns The processed metadata object, ready for Next.js.
 */
export const metadata = (
  metadata: MetadataInput
): NextMetadata & { jsonLD?: string } => {
  // Destructure and set defaults
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

  let title: NextMetadata['title'];
  let computedTitle: string;

  // Handle object title with default and template
  if (rawTitle && typeof rawTitle === 'object' && 'default' in rawTitle) {
    const templateValue = typeof rawTitle.template === 'string'
      ? rawTitle.template
      : typeof titleTemplate === 'string'
        ? titleTemplate
        : typeof DEFAULT_METADATA.title.template === 'string'
          ? DEFAULT_METADATA.title.template
          : '';
    title = {
      default: rawTitle.default,
      template: templateValue
    };
    computedTitle = resolveTemplate(templateValue, {
      title: rawTitle.default,
      siteName: customOpenGraph.siteName || DEFAULT_METADATA.openGraph.siteName,
    }).trim();
  } 
  // Handle titleTemplate
  else if (titleTemplate) {
    const defaultTitleValue = typeof rawTitle === 'string' ? rawTitle : defaultTitle || DEFAULT_METADATA.title.default;
    title = {
      default: defaultTitleValue,
      template: typeof titleTemplate === 'string' ? titleTemplate : ''
    };
    computedTitle = resolveTemplate(
      typeof titleTemplate === 'string' ? titleTemplate : '',
      {
        title: defaultTitleValue,
        siteName: customOpenGraph.siteName || DEFAULT_METADATA.openGraph.siteName,
      }
    ).trim();
  } 
  // Handle string title
  else if (typeof rawTitle === 'string') {
    title = rawTitle;
    computedTitle = rawTitle;
  } 
  // Default case
  else {
    const defaultTitleValue = defaultTitle || DEFAULT_METADATA.title.default;
    const template = DEFAULT_METADATA.title.template;

    computedTitle = resolveTemplate(template, {
      title: defaultTitleValue,
      siteName: customOpenGraph.siteName || DEFAULT_METADATA.openGraph.siteName,
    }).trim();

    title = {
      default: defaultTitleValue,
      template: template,
    };
  }

  // Set metadataBase if canonicalUrl is provided
  const metadataBase = canonicalUrl ? new URL(canonicalUrl) : undefined;

  // Process robots meta tag content
  const robotsContent = processRobotsDirectives(
    noindex !== undefined || nofollow !== undefined
      ? { noindex, nofollow }
      : robots
  );

  // Process OpenGraph metadata
  const openGraph = processOpenGraph({
    ...DEFAULT_METADATA.openGraph,
    ...customOpenGraph,
    title: customOpenGraph?.title || computedTitle,
    description: customOpenGraph?.description || description,
    url: customOpenGraph?.url || canonicalUrl,
  });

  // Process Twitter meta tags
  const twitterMeta = processTwitterMeta({
    ...DEFAULT_METADATA.twitter,
    ...customTwitter,
    title: customTwitter?.title || computedTitle,
    description: customTwitter?.description || description,
  });

  // Process alternates (languages, canonical, etc.)
  const processedAlternates = processAlternates(alternates);

  // Normalize authors array
  const processedAuthors: Author[] = Array.isArray(authors)
    ? authors.map((author) =>
        typeof author === 'string' ? { name: author } : author
      )
    : [];

  // Build the metadata object
  const generatedMetadata: NextMetadata & { jsonLD?: string } = {
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
    ...(openGraph ? { openGraph } : {}),
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

  // Add Facebook appId to 'other' meta if present
  if (facebook?.appId) {
    const additions: OtherDict = {
      'fb:app_id': String(facebook.appId),
    };
    generatedMetadata.other = mergeOtherMeta(generatedMetadata.other, additions);
  }

  // Add Twitter meta tags to 'other'
  const twitterMetaOther: OtherDict = {};
  Object.entries(twitterMeta).forEach(([key, value]) => {
    twitterMetaOther[key] = value;
  });
  generatedMetadata.other = mergeOtherMeta(generatedMetadata.other, twitterMetaOther);

  // Add additionalMetaTags, additionalLinkTags, and preloadAssets to 'other'
  if (
    additionalMetaTags.length ||
    additionalLinkTags.length ||
    preloadAssets.length
  ) {
    const otherMeta: OtherDict = {};

    // Add additional meta tags
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

    // Add additional link tags
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

    // Add preload assets
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

  // Add Apple Web App meta tags to 'other'
  if (appleWebApp) {
    const { title: appleTitle, capable } = appleWebApp;
    const additions: OtherDict = {};
    if (capable !== undefined) additions['apple-mobile-web-app-capable'] = capable ? 'yes' : 'no';
    if (appleTitle) additions['apple-mobile-web-app-title'] = appleTitle;
    generatedMetadata.other = mergeOtherMeta(generatedMetadata.other, additions);
  }

  // Add JSON-LD schema if provided
  if (schemaOrgJSONLD !== undefined) {
    generatedMetadata.jsonLD = generateJsonLD(schemaOrgJSONLD);
  }

  return generatedMetadata;
};