// Represents an OpenGraph image object
export type OpenGraphImage = {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
  type?: string;
};

// Represents an OpenGraph video object
export type OpenGraphVideo = {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
  type?: string;
};

// Allowed Twitter card types
export type TwitterCardType = 'summary' | 'summary_large_image' | 'app' | 'player';

// Represents a Twitter image object
export type TwitterImage = {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
};

// Represents an additional meta tag for the HTML head
export type AdditionalMetaTag = {
  name?: string;
  content?: string;
  property?: string;
  httpEquiv?: string;
  charSet?: string;
};

// Represents an additional link tag for the HTML head
export type AdditionalLinkTag = {
  rel: string;
  href: string;
  as?: string;
  crossOrigin?: 'anonymous' | 'use-credentials';
  media?: string;
  type?: string;
  sizes?: string;
};

// Represents GoogleBot-specific robots directives
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

// Represents basic robots directives
export type RobotsBasicDirectives = {
  noindex?: boolean;
  nofollow?: boolean;
};

// Represents advanced robots directives
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

// Union type for robots directives
export type RobotsDirectives = RobotsBasicDirectives | RobotsAdvancedDirectives;

// Represents a language alternate for hreflang tags
export type LanguageAlternate = {
  hrefLang: string;
  href: string;
};

// Represents a mobile alternate for media queries
export type MobileAlternate = {
  media: string;
  href: string;
};

// Represents alternates for canonical, languages, media, types, and mobile
export type Alternates = {
  canonical?: string;
  languages?: Record<string, string> | LanguageAlternate[];
  media?: Record<string, string>;
  types?: Record<string, string>;
  mobileAlternate?: MobileAlternate;
};

// Represents verification meta tags for search engines and social platforms
export type Verification = {
  google?: string;
  yandex?: string;
  bing?: string;
  facebook?: string;
  other?: Record<string, string>;
};

// Represents a Schema.org JSON-LD object
export type SchemaJSONLD = {
  '@context'?: string;
  '@type': string;
  [key: string]: any;
};

// Represents Twitter meta tags
export type Twitter = {
  card?: TwitterCardType;
  site?: string;
  creator?: string;
  handle?: string;
  title?: string;
  description?: string;
  image?: string | TwitterImage;
};

// Represents OpenGraph profile object
export type OpenGraphProfile = {
  firstName?: string;
  lastName?: string;
  username?: string;
  gender?: string;
};

// Represents OpenGraph book object
export type OpenGraphBook = {
  authors?: string[];
  isbn?: string;
  releaseDate?: string;
  tags?: string[];
};

// Represents OpenGraph article object
export type OpenGraphArticle = {
  publishedTime?: string;
  modifiedTime?: string;
  expirationTime?: string;
  authors?: string[];
  section?: string;
  tags?: string[];
};

// Represents the main OpenGraph object
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

// Represents an author for articles or metadata
export type Author = {
  name: string;
  url?: string;
};

// Represents a preload asset for resource hints
export type PreloadAsset = {
  href: string;
  as: 'script' | 'style' | 'font' | 'image' | 'audio' | 'video' | 'document' | 'fetch';
  crossOrigin?: 'anonymous' | 'use-credentials';
  type?: string;
};

// Main input type for metadata generation
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