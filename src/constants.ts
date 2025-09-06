/**
 * Default metadata configuration for the website.
 * Used as fallback values for SEO and social tags when no custom values are provided.
 * This object is used as the base for all metadata fields, including OpenGraph, Twitter, robots, mobile app, and favicons.
 */
export const DEFAULT_METADATA = {
  /**
   * Default title and template for all pages.
   */
  title: {
    default: '',
    template: '',
  },

  /**
   * Default description for the website.
   */
  description: '',

  /**
   * Default OpenGraph metadata for social sharing.
   */
  openGraph: {
    type: '',
    siteName: '',
    images: [
      {
        url: '',
        width: 0,
        height: 0,
        alt: '',
      },
    ],
    title: '',
    description: '',
    url: '',
    locale: '',
  },

  /**
   * Default Twitter card metadata for social sharing.
   */
  twitter: {
    card: '' as const,
    title: '',
    description: '',
    image: '',
    site: '',      // Twitter @site handle
    creator: '',   // Twitter @creator handle
    handle: '',    // Optional Twitter handle
  },

  /**
   * Default robots directives for search engines.
   */
  robots: {
    index: false,
    follow: false,
  },

  /**
   * Default mobile app related meta tags.
   */
  mobileApp: {
    appleTouchIcon: '',
    themeColor: '',
    msapplicationTileColor: '',
    appleWebAppCapable: '',
  },

  /**
   * Default favicons configuration (empty by default, can be overridden).
   * Used for custom favicons support in metadata generation.
   */
  customFavicons: [],
};