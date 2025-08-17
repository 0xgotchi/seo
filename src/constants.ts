/**
 * Default metadata configuration for the website.
 * Used as fallback values for SEO and social tags.
 */
export const DEFAULT_METADATA = {
  // Default title and template for pages
  title: {
    default: 'My Website',
    template: '%title% | My Website',
  },

  // Default description for the website
  description: 'This is the best place to find awesome content and resources.',

  // Default OpenGraph metadata for social sharing
  openGraph: {
    type: 'website',
    siteName: 'My Website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'My Website Preview Image',
      },
    ],
    title: 'Welcome to My Website',
    description: 'This is the best place to find awesome content and resources.',
    url: 'https://example.com',
    locale: 'en_US',
  },

  // Default Twitter card metadata
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Welcome to My Website',
    description: 'Discover great articles and insights on My Website.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    site: '',      // Twitter @site handle
    creator: '',   // Twitter @creator handle
    handle: '',    // Twitter handle (optional)
  },

  // Default robots directives for search engines
  robots: {
    index: true,
    follow: true,
  },

  // Default mobile app related meta tags
  mobileApp: {
    appleTouchIcon: '/apple-touch-icon.png',
    themeColor: '#000000',
    msapplicationTileColor: '#000000',
    appleWebAppCapable: 'yes',
  },
};