/**
 * Default metadata configuration for the website.
 * Used as fallback values for SEO and social tags.
 */
export const DEFAULT_METADATA = {
  // Default title and template for pages
  title: {
    default: '',
    template: '',
  },

  // Default description for the website
  description: '',

  // Default OpenGraph metadata for social sharing
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

  // Default Twitter card metadata
  twitter: {
    card: '' as const,
    title: '',
    description: '',
    image: '',
    site: '',      // Twitter @site handle
    creator: '',   // Twitter @creator handle
    handle: '',    // Twitter handle (optional)
  },

  // Default robots directives for search engines
  robots: {
    index: false,
    follow: false,
  },

  // Default mobile app related meta tags
  mobileApp: {
    appleTouchIcon: '',
    themeColor: '',
    msapplicationTileColor: '',
    appleWebAppCapable: '',
  },
};