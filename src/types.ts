/**
 * Represents an OpenGraph image object for social sharing.
 * Used in OpenGraph metadata for sharing images on social platforms.
 */
export type OpenGraphImage = {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
  type?: string;
};

/**
 * Represents an OpenGraph video object for social sharing.
 * Used in OpenGraph metadata for sharing videos on social platforms.
 */
export type OpenGraphVideo = {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
  type?: string;
};

/**
 * Allowed Twitter card types for Twitter meta tags.
 * Used to specify the type of Twitter card for social sharing.
 */
export type TwitterCardType = 'summary' | 'summary_large_image' | 'app' | 'player';

/**
 * Represents a Twitter image object for Twitter meta tags.
 * Used in Twitter metadata for sharing images.
 */
export type TwitterImage = {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
};

/**
 * Represents an additional meta tag for the HTML head.
 * Used to inject custom meta tags into the document head.
 */
export type AdditionalMetaTag = {
  name?: string;
  content?: string;
  property?: string;
  httpEquiv?: string;
  charSet?: string;
};

/**
 * Represents an additional link tag for the HTML head.
 * Used to inject custom link tags (e.g., stylesheets, icons) into the document head.
 */
export type AdditionalLinkTag = {
  rel: string;
  href: string;
  as?: string;
  crossOrigin?: 'anonymous' | 'use-credentials';
  media?: string;
  type?: string;
  sizes?: string;
};

/**
 * Represents GoogleBot-specific robots directives for advanced SEO control.
 * Used to fine-tune how GoogleBot crawls and indexes the page.
 */
export type RobotsGoogleBot = {
  index?: boolean;
  follow?: boolean;
  noimageindex?: boolean;
  'max-video-preview'?: number | string;
  'max-image-preview'?: 'none' | 'standard' | 'large';
  'max-snippet'?: number;
  nocache?: boolean;
  noarchive?: boolean;
  nosnippet?: boolean;
  notranslate?: boolean;
  unavailable_after?: string;
};

/**
 * Represents basic robots directives for SEO control.
 * Used for simple index/follow control in robots meta tags.
 */
export type RobotsBasicDirectives = {
  noindex?: boolean;
  nofollow?: boolean;
};

/**
 * Represents advanced robots directives for SEO control.
 * Used for advanced control over indexing, caching, and crawling.
 */
export type RobotsAdvancedDirectives = {
  index?: boolean;
  follow?: boolean;
  nocache?: boolean;
  noarchive?: boolean;
  noimageindex?: boolean;
  nosnippet?: boolean;
  notranslate?: boolean;
  unavailable_after?: string;
  maxSnippet?: number;
  maxImagePreview?: 'none' | 'standard' | 'large';
  maxVideoPreview?: number | string;
  googleBot?: RobotsGoogleBot;
};

/**
 * Union type for robots directives (basic or advanced).
 * Used to allow both simple and advanced robots meta tag configurations.
 */
export type RobotsDirectives = RobotsBasicDirectives | RobotsAdvancedDirectives;

/**
 * Represents a language alternate for hreflang tags.
 * Used to specify alternate URLs for different languages.
 */
export type LanguageAlternate = {
  hrefLang: string;
  href: string;
};

/**
 * Represents a mobile alternate for media queries.
 * Used to specify alternate URLs for mobile devices.
 */
export type MobileAlternate = {
  media: string;
  href: string;
};

/**
 * Represents alternates for canonical, languages, media, types, and mobile.
 * Used to configure alternate URLs for SEO and internationalization.
 */
export type Alternates = {
  canonical?: string;
  languages?: Record<string, string> | LanguageAlternate[];
  media?: Record<string, string>;
  types?: Record<string, string>;
  mobileAlternate?: MobileAlternate;
};

/**
 * Represents verification meta tags for search engines and social platforms.
 * Used to verify site ownership with search engines and social platforms.
 */
export type Verification = {
  google?: string;
  yandex?: string;
  bing?: string;
  facebook?: string;
  other?: Record<string, string>;
};

/**
 * Represents a Schema.org JSON-LD object for structured data.
 * Used for structured data markup in SEO.
 */
export type SchemaJSONLD = {
  '@context'?: string;
  '@type': string;
  [key: string]: any;
};

/**
 * Represents Twitter meta tags for social sharing.
 * Used to configure Twitter card metadata for social sharing.
 */
export type Twitter = {
  card?: TwitterCardType;
  site?: string;
  creator?: string;
  handle?: string;
  title?: string;
  description?: string;
  image?: string | TwitterImage;
};

/**
 * Represents OpenGraph profile object for social sharing.
 * Used in OpenGraph metadata for profile pages.
 */
export type OpenGraphProfile = {
  firstName?: string;
  lastName?: string;
  username?: string;
  gender?: string;
};

/**
 * Represents OpenGraph book object for social sharing.
 * Used in OpenGraph metadata for book pages.
 */
export type OpenGraphBook = {
  authors?: string[];
  isbn?: string;
  releaseDate?: string;
  tags?: string[];
};

/**
 * Represents OpenGraph article object for social sharing.
 * Used in OpenGraph metadata for article pages.
 */
export type OpenGraphArticle = {
  publishedTime?: string;
  modifiedTime?: string;
  expirationTime?: string;
  authors?: string[];
  section?: string;
  tags?: string[];
};

/**
 * Represents the main OpenGraph object for social sharing.
 * Used to configure OpenGraph metadata for social platforms.
 */
export type OpenGraph = {
  title?: string;
  description?: string;
  url?: string;
  type?: string;
  images?: OpenGraphImage[];
  videos?: OpenGraphVideo[];
  siteName?: string;
  locale?: string;
  profile?: OpenGraphProfile;
  book?: OpenGraphBook;
  article?: OpenGraphArticle;
  publishedTime?: string;
  modifiedTime?: string;
  expirationTime?: string;
};

/**
 * Represents an author for articles or metadata.
 * Used to specify authorship in metadata.
 */
export type Author = {
  name: string;
  url?: string;
};

/**
 * Represents a preload asset for resource hints.
 * Used to specify resources to preload for performance.
 */
export type PreloadAsset = {
  href: string;
  as: 'script' | 'style' | 'font' | 'image' | 'audio' | 'video' | 'document' | 'fetch';
  crossOrigin?: 'anonymous' | 'use-credentials';
  type?: string;
};

/**
 * Main input type for metadata generation. Used to configure all SEO and social meta tags.
 * This is the main configuration type for the metadata generator function.
 */
export type MetadataInput = {
  title?: string | {
    default: string;
    template?: string | ((title?: string) => string);
  };
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
  pagination?: {
    next?: string;
    prev?: string;
  };
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