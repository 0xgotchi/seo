export type OpenGraphImage = {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
  type?: string;
};

export type TwitterCardType = 'summary' | 'summary_large_image' | 'app' | 'player';

export type AdditionalMetaTag = {
  name?: string;
  content?: string;
  property?: string;
  httpEquiv?: string;
  charSet?: string;
};

export type RobotsGoogleBot = {
  index?: boolean;
  follow?: boolean;
  noimageindex?: boolean;
  'max-video-preview'?: number | string;
  'max-image-preview'?: 'none' | 'standard' | 'large';
  'max-snippet'?: number;
};

export type RobotsDirectives = {
  index?: boolean;
  follow?: boolean;
  nocache?: boolean;
  noimageindex?: boolean;
  nosnippet?: boolean;
  noarchive?: boolean;
  notranslate?: boolean;
  unavailable_after?: string;
  maxSnippet?: number;
  maxImagePreview?: 'none' | 'standard' | 'large';
  maxVideoPreview?: number | string;
  googleBot?: RobotsGoogleBot;
};

export type Alternates = {
  canonical?: string;
  languages?: Record<string, string>;
  media?: Record<string, string>;
  types?: Record<string, string>;
};

export type Verification = {
  google?: string;
  yandex?: string;
  bing?: string;
  other?: Record<string, string>;
};

export type SchemaJSONLD = {
  type: string;
  [key: string]: any;
};

export type Twitter = {
  card?: TwitterCardType;
  site?: string;
  creator?: string;
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
};

export type Author = {
  name: string;
  url: string;
};

export type MetadataInput = {
  title: string | { default: string; template: string };
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  openGraph?: {
    title?: string;
    description?: string;
    url?: string;
    type?: string;
    images?: OpenGraphImage[];
    siteName?: string;
    locale?: string;
  };
  twitter?: Twitter;
  robots?: RobotsDirectives;
  alternates?: Alternates;
  verification?: Verification;
  additionalMetaTags?: AdditionalMetaTag[];
  preloadAssets?: Array<{ href: string; as: string; crossOrigin?: string }>;
  schemaOrgJSONLD?: SchemaJSONLD | SchemaJSONLD[];
  pagination?: {
    next?: string;
    prev?: string;
  };
  mobileApp?: {
    appleTouchIcon?: string;
    themeColor?: string;
    msapplicationTileColor?: string;
  };
  securityMetaTags?: Array<{ httpEquiv: string; content: string }>;
  authors?: Author[];
  publisher?: string;
  metadataBase?: URL | string;
  themeColor?: Array<{ media: string; color: string }> | string;
  viewport?: string;
  formatDetection?: {
    telephone?: boolean;
  };
};
