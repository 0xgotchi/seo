import { Metadata as NextMetadata } from 'next';
import {
  MetadataInput,
  RobotsDirectives,
  AdditionalMetaTag,
} from '../types';
import { DEFAULT_METADATA } from '../constants';

function isRobotsDirectives(obj: any): obj is RobotsDirectives {
  return (
    typeof obj === 'object' &&
    (obj.nocache !== undefined ||
      obj.noimageindex !== undefined ||
      obj.nosnippet !== undefined ||
      obj.googleBot !== undefined)
  );
}

function resolveTemplate(template: string, values: Record<string, string>): string {
  return Object.entries(values).reduce(
    (acc, [key, value]) => acc.replace(new RegExp(`%${key}%`, 'g'), value),
    template
  );
}

export const Metadata = (
  metadata: MetadataInput
): NextMetadata => {
  const {
    title: rawTitle,
    description,
    keywords,
    canonicalUrl,
    openGraph: customOpenGraph,
    twitter: customTwitter,
    robots,
    alternates,
    verification,
    additionalMetaTags = [],
    schemaOrgJSONLD,
    pagination,
    mobileApp,
    securityMetaTags,
    themeColor,
    viewport,
    formatDetection,
    preloadAssets,
  } = { ...DEFAULT_METADATA, ...metadata };

  let title: string | { default: string; template: string };
  let computedTitle: string;

  if (typeof rawTitle === 'string') {
    title = rawTitle;
    computedTitle = rawTitle;
  } else {
    title = {
      default: rawTitle.default,
      template: rawTitle.template,
    };
    computedTitle = resolveTemplate(rawTitle.template, {
      title: rawTitle.default,
      siteName: DEFAULT_METADATA.openGraph.siteName,
    }).trim();
  }

  const metadataBase = canonicalUrl ? new URL(canonicalUrl) : undefined;

  const robotsContent = (() => {
    if (!robots) return undefined;

    if (!isRobotsDirectives(robots)) {
      const parts = [];
      if ('index' in robots) parts.push(robots.index === false ? 'noindex' : 'index');
      else parts.push('index');
      if ('follow' in robots) parts.push(robots.follow === false ? 'nofollow' : 'follow');
      else parts.push('follow');
      return parts.join(', ');
    }

    const parts = [];

    if ('index' in robots) parts.push(robots.index === false ? 'noindex' : 'index');
    else parts.push('index');

    if ('follow' in robots) parts.push(robots.follow === false ? 'nofollow' : 'follow');
    else parts.push('follow');

    if (robots.nocache) parts.push('noarchive');
    if (robots.noimageindex) parts.push('noimageindex');
    if (robots.nosnippet) parts.push('nosnippet');

    if (robots.googleBot) {
      const gb = robots.googleBot;
      if ('index' in gb) parts.push(gb.index === false ? 'noindex' : '');
      if ('follow' in gb) parts.push(gb.follow === false ? 'nofollow' : '');
      if (gb.noimageindex) parts.push('noimageindex');
      if (gb['max-video-preview'] !== undefined)
        parts.push(`max-video-preview:${gb['max-video-preview']}`);
      if (gb['max-image-preview'])
        parts.push(`max-image-preview:${gb['max-image-preview']}`);
      if (gb['max-snippet'] !== undefined)
        parts.push(`max-snippet:${gb['max-snippet']}`);
    }

    return parts.filter(Boolean).join(', ');
  })();

  const openGraph = {
    ...DEFAULT_METADATA.openGraph,
    ...customOpenGraph,
    title: customOpenGraph?.title || computedTitle,
    description: customOpenGraph?.description || description,
    url: customOpenGraph?.url || canonicalUrl,
  };

  const twitter = {
    ...DEFAULT_METADATA.twitter,
    ...customTwitter,
    title: customTwitter?.title || computedTitle,
    description: customTwitter?.description || description,
    image: customTwitter?.image,
  };

  const generatedMetadata: NextMetadata = {
    ...(typeof title === 'string'
      ? { title }
      : {
          title: {
            default: title.default,
            template: title.template,
          },
        }),
    description,
    ...(metadataBase && { metadataBase }),
    alternates: {
      ...(canonicalUrl && { canonical: canonicalUrl }),
      ...alternates,
    },
    ...(keywords?.length && { keywords: keywords.join(', ') }),
    ...(openGraph && { openGraph }),
    ...(twitter && { twitter }),
    ...(robotsContent ? { robots: robotsContent } : {}),
    ...(verification && { verification }),
    ...(schemaOrgJSONLD && { metadata: { jsonLd: schemaOrgJSONLD } }),
    ...(pagination && {
      pagination: {
        previous: pagination.prev ?? undefined,
        next: pagination.next ?? undefined,
      },
    }),
    ...(mobileApp && { mobileApp }),
    ...(securityMetaTags && { security: securityMetaTags }),
    ...(themeColor && { themeColor }),
    ...(viewport && { viewport }),
    ...(formatDetection && { formatDetection }),
  };

  if (additionalMetaTags?.length || preloadAssets?.length) {
    const otherMeta: Record<string, string> = {};

    additionalMetaTags.forEach((tag) => {
      const key = tag.name || tag.property || tag.httpEquiv || '';
      if (key && tag.content) {
        otherMeta[key] = tag.content;
      }
    });

    preloadAssets?.forEach((asset) => {
      const preloadKey = `preload::${asset.href}`;
      otherMeta[preloadKey] = JSON.stringify({
        rel: 'preload',
        href: asset.href,
        as: asset.as,
        ...(asset.crossOrigin && { crossOrigin: asset.crossOrigin }),
      });
    });

    generatedMetadata.other = otherMeta;
  }

  return generatedMetadata;
};
