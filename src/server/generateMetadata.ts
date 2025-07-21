import { Metadata } from 'next';
import {
  AmphibianSEOMetadataInput,
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

export const AmphibianSEOMetadata = (
  metadata: AmphibianSEOMetadataInput
): Metadata => {
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
    additionalMetaTags,
    schemaOrgJSONLD,
    pagination,
    mobileApp,
    securityMetaTags,
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
    computedTitle = rawTitle.default
      ? rawTitle.template.replace('%s', rawTitle.default)
      : rawTitle.template.replace('%s', '').trim();
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

  const generatedMetadata: Metadata = {
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
  };

  if (additionalMetaTags?.length) {
    generatedMetadata.other = additionalMetaTags.reduce(
      (acc: Record<string, string>, tag: AdditionalMetaTag) => {
        const key = tag.name || tag.property || tag.httpEquiv || '';
        if (key && tag.content) {
          acc[key] = tag.content;
        }
        return acc;
      },
      {}
    );
  }

  return generatedMetadata;
};
