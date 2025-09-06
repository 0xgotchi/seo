import { metadata } from '../generateMetadata';
import { DEFAULT_METADATA } from '../../constants';
import * as generateJsonLDModule from '../utils/processJsonLD';

/**
 * Test suite for metadata generation.
 * Validates merging of layout and route metadata, default fallbacks, and specific metadata fields.
 */
describe('Metadata', () => {
  /* Reset all mocks before each test to ensure clean state */
  beforeEach(() => {
    jest.clearAllMocks();
  });

  /* Test merging of layout and route metadata, with route metadata taking precedence */
  it('should merge layout and route metadata, giving priority to route', () => {
    const layoutMeta = {
      title: 'Layout Title',
      description: 'Layout Desc',
      openGraph: { title: 'Layout OG' },
    };
    const routeMeta = {
      title: 'Route Title',
      description: 'Route Desc',
      openGraph: { title: 'Route OG' },
    };
    const result = metadata(layoutMeta, routeMeta);
    expect(result.title).toBe('Route Title');
    expect(result.description).toBe('Route Desc');
    expect(result.openGraph?.title).toBe('Route OG');
  });

  /* Test fallback to default metadata when title is omitted */
  it('should fallback to default title object when no title is provided', () => {
    const result = metadata({});
    expect(result.title).toEqual(DEFAULT_METADATA.title);
  });

  /* Test that openGraph is excluded if no relevant fields are present */
  it('should not include openGraph if no relevant fields are present', () => {
    const result = metadata({ openGraph: {} });
    expect(result.openGraph).toBeUndefined();
  });

  /* Test that openGraph is included if at least one relevant field is present */
  it('should include openGraph if at least one relevant field is present', () => {
    const result = metadata({ openGraph: { title: 'OG Title' } });
    expect(result.openGraph).toBeDefined();
    expect(result.openGraph?.title).toBe('OG Title');
  });

  /* Test that Facebook appId is added to other meta only if present */
  it('should add Facebook appId to other meta only if present', () => {
    const result = metadata({ facebook: { appId: '999' } });
    expect(result.other?.['fb:app_id']).toBe('999');
    const result2 = metadata({ facebook: { pages: '123' } });
    expect(result2.other?.['fb:app_id']).toBeUndefined();
  });

  /* Test that Apple Web App meta tags are added to other only if present */
  it('should add Apple Web App meta tags to other only if present', () => {
    const result = metadata({ appleWebApp: { capable: true, title: 'AppTitle' } });
    expect(result.other?.['apple-mobile-web-app-capable']).toBe('yes');
    expect(result.other?.['apple-mobile-web-app-title']).toBe('AppTitle');
    const result2 = metadata({ appleWebApp: { title: 'AppTitle' } });
    expect(result2.other?.['apple-mobile-web-app-title']).toBe('AppTitle');
    expect(result2.other?.['apple-mobile-web-app-capable']).toBeUndefined();
  });

  /* Test that Facebook appId is properly added */
  it('should add Facebook appId to other meta', () => {
    const result = metadata({ facebook: { appId: '999' } });
    expect(result.other?.['fb:app_id']).toBe('999');
  });

  /* Test that Apple Web App meta tags are properly added */
  it('should add Apple Web App meta tags to other', () => {
    const result = metadata({ appleWebApp: { capable: true, title: 'AppTitle' } });
    expect(result.other?.['apple-mobile-web-app-capable']).toBe('yes');
    expect(result.other?.['apple-mobile-web-app-title']).toBe('AppTitle');
  });

  /* Test that default title is used if not provided */
  it('should return default title if not provided', () => {
    const result = metadata({});
    expect(result.title).toBeDefined();
    expect(result.title).toEqual(DEFAULT_METADATA.title);
  });

  /* Test application of a simple title */
  it('should apply a simple title', () => {
    const result = metadata({ title: 'Test Page' });
    expect(result.title).toBe('Test Page');
  });

  /* Test usage of titleTemplate with only defaultTitle */
  it('should apply titleTemplate with defaultTitle', () => {
    const result = metadata({
      defaultTitle: 'Home',
      titleTemplate: '%s | My Site',
    });
    expect(result.title).toEqual({ default: '', template: '' });
  });

  /* Test titleTemplate usage with provided title */
  it('should apply titleTemplate using provided title', () => {
    const result = metadata({
      title: 'Test Page',
      titleTemplate: '%s | My Site'
    });
    expect(result.title).toEqual({ default: 'Test Page', template: '%s | My Site' });
  });

  /* Test description field processing */
  it('should process description', () => {
    const result = metadata({ description: 'Test description' });
    expect(result.description).toBe('Test description');
  });

  /* Test basic robots meta tag generation */
  it('should process basic robots', () => {
    const result = metadata({ noindex: true, nofollow: true });
    expect(result.robots).toBe('noindex, nofollow');
  });

  /* Test advanced robots meta tag processing, including GoogleBot directives */
  it('should process advanced robots', () => {
    const result = metadata({
      robots: {
        index: false,
        follow: true,
        noarchive: true,
        noimageindex: true,
        nosnippet: true,
        notranslate: true,
        unavailable_after: '2025-12-31',
        googleBot: {
          index: true,
          follow: false,
          'max-video-preview': 3,
          noarchive: true,
        },
      },
    });

    if (typeof result.robots !== 'string') {
      throw new Error('Robots should be a string');
    }

    const directives = result.robots.split(', ');

    expect(directives).toContain('noindex');
    expect(directives).toContain('follow');
    expect(directives).toContain('noarchive');
    expect(directives).toContain('noimageindex');
    expect(directives).toContain('nosnippet');
    expect(directives).toContain('notranslate');
    expect(directives).toContain('unavailable_after:2025-12-31');
    expect(directives).toContain('max-video-preview:3');
  });

  /* Test advanced robots meta tag processing without GoogleBot directives */
  it('should process advanced robots without googleBot', () => {
    const result = metadata({
      robots: {
        index: false,
        follow: true,
        noarchive: true
      }
    });
    expect(result.robots).toContain('noindex');
    expect(result.robots).toContain('follow');
    expect(result.robots).toContain('noarchive');
  });

  /* Test OpenGraph meta tag processing with complete data */
  it('should process OpenGraph with full data', () => {
    const ogData = {
      title: 'OG Title',
      description: 'OG Desc',
      url: 'https://site.com',
      publishedTime: '2023-01-01',
      images: [
        {
          url: 'https://site.com/image.jpg',
          width: 1200,
          height: 630,
          alt: 'OG Image'
        }
      ]
    };
    const result = metadata({ openGraph: ogData });
    expect(result.openGraph).toMatchObject(ogData);
  });

  /* Test OpenGraph meta tag processing with minimal data */
  it('should process OpenGraph with minimal data', () => {
    const result = metadata({ openGraph: { title: 'OG Title' } });
    expect(result.openGraph?.title).toBe('OG Title');
  });

  /* Test Twitter meta tag processing with image as string */
  it('should process Twitter with string image', () => {
    const result = metadata({
      twitter: {
        card: 'summary_large_image',
        image: 'https://site.com/img.png',
      },
    });
    expect(result.other?.['twitter:image']).toBe('https://site.com/img.png');
  });

  /* Test Twitter meta tag processing with image object */
  it('should process Twitter with image object', () => {
    const img = {
      url: 'https://site.com/img.png',
      alt: 'test',
      width: 1200,
      height: 600
    };
    const result = metadata({
      twitter: {
        card: 'summary',
        image: img,
      },
    });
    expect(result.other?.['twitter:image']).toBe('https://site.com/img.png');
    expect(result.other?.['twitter:image:alt']).toBe('test');
  });

  /* Test Twitter meta tag processing with default values */
  it('should process Twitter with default values', () => {
    const result = metadata({});
    expect(result.other?.['twitter:card'] ?? 'summary_large_image').toBe('summary_large_image');
    expect(result.other?.['twitter:title'] ?? DEFAULT_METADATA.twitter.title).toBe(DEFAULT_METADATA.twitter.title);
    expect(result.other?.['twitter:description'] ?? DEFAULT_METADATA.twitter.description).toBe(DEFAULT_METADATA.twitter.description);
    expect(result.other?.['twitter:image'] ?? DEFAULT_METADATA.twitter.image).toBe(DEFAULT_METADATA.twitter.image);
  });

  /* Test Twitter meta tag usage of defaults when values are empty */
  it('should use defaults for Twitter when values are empty', () => {
    const result = metadata({ twitter: {} });
    expect(result.other?.['twitter:card'] ?? 'summary_large_image').toBe('summary_large_image');
  });

  /* Test language alternates meta tag processing */
  it('should process language alternates', () => {
    const alternates = {
      languages: { 
        ru: 'https://site.com/ru', 
        en: 'https://site.com/en' 
      },
    };
    const result = metadata({ alternates });
    expect(result.alternates?.languages).toEqual(alternates.languages);
  });

  /* Test verification meta tag processing */
  it('should process verification', () => {
    const verification = { 
      google: '123',
      facebook: '456'
    };
    const result = metadata({ verification });
    expect(result.verification).toEqual(verification);
  });

  /* Test schemaOrgJSONLD meta tag processing for both objects and arrays */
  it('should process schemaOrgJSONLD (object and array)', () => {
    const spy = jest.spyOn(generateJsonLDModule, 'generateJsonLD');

    const schemaObj = { 
      '@type': 'Article', 
      name: 'Test',
      datePublished: '2023-01-01'
    };
    const resultObj = metadata({ schemaOrgJSONLD: schemaObj });
    expect(spy).toHaveBeenCalledWith(schemaObj);
    expect(resultObj.jsonLD).toBe(generateJsonLDModule.generateJsonLD(schemaObj));

    const schemaArr = [
      { '@type': 'WebSite', name: 'Site 1' },
      { '@type': 'Organization', name: 'Site 2' },
    ];
    const resultArr = metadata({ schemaOrgJSONLD: schemaArr });
    expect(spy).toHaveBeenCalledWith(schemaArr);
    expect(resultArr.jsonLD).toBe(generateJsonLDModule.generateJsonLD(schemaArr));
  });

  /* Test authors meta tag processing for string and object authors */
  it('should process authors', () => {
    const authors = [
      'Author 1', 
      { name: 'Author 2', url: 'https://a.com' },
      { name: 'Author 3' }
    ];
    const result = metadata({ authors });
    expect(result.authors).toEqual([
      { name: 'Author 1' },
      { name: 'Author 2', url: 'https://a.com' },
      { name: 'Author 3' }
    ]);
  });

  /* Test fallback when authors are missing */
  it('should return empty array for missing authors', () => {
    const result = metadata({});
    expect(result.authors).toEqual([]);
  });

  /* Test publisher meta tag processing */
  it('should process publisher', () => {
    const result = metadata({ publisher: 'Company' });
    expect(result.publisher).toBe('Company');
  });

  /* Test fallback when publisher is missing */
  it('should return undefined publisher if not provided', () => {
    const result = metadata({});
    expect(result.publisher).toBeUndefined();
  });

  /* Test Facebook appId processing with both appId and pages */
  it('should process Facebook appId', () => {
    const result = metadata({ 
      facebook: { 
        appId: '123456',
        pages: '789'
      } 
    });
    expect(result.other?.['fb:app_id']).toBe('123456');
  });

  /* Test Facebook appId is not added if missing */
  it('should not add fb:app_id if not provided', () => {
    const result = metadata({ facebook: { pages: '123' } });
    expect(result.other?.['fb:app_id']).toBeUndefined();
  });

  /* Test processing of additionalMetaTags, additionalLinkTags, and preloadAssets */
  it('should process additionalMetaTags, additionalLinkTags, and preloadAssets', () => {
    const result = metadata({
      additionalMetaTags: [
        { name: 'robots', content: 'noindex' },
        { property: 'og:locale', content: 'ru_RU' }
      ],
      additionalLinkTags: [
        { rel: 'stylesheet', href: '/style.css' },
        { rel: 'icon', href: '/favicon.ico', type: 'image/x-icon' }
      ],
      preloadAssets: [
        { href: '/font.woff2', as: 'font', crossOrigin: 'anonymous' },
        { href: '/script.js', as: 'script' }
      ],
    });

    expect(result.other ?? {}).toMatchObject({
      'robots': 'noindex',
      'meta::og:locale': { property: 'og:locale', content: 'ru_RU' },
      'link::stylesheet::/style.css': { 
        rel: 'stylesheet', 
        href: '/style.css' 
      },
      'link::icon::/favicon.ico': {
        rel: 'icon',
        href: '/favicon.ico',
        type: 'image/x-icon'
      },
      'preload::/font.woff2': { 
        href: '/font.woff2', 
        as: 'font',
        rel: 'preload',
        crossOrigin: 'anonymous'
      },
      'preload::/script.js': {
        href: '/script.js',
        as: 'script',
        rel: 'preload'
      }
    });
  });

  /* Test handling of empty arrays for additionalMetaTags, additionalLinkTags, and preloadAssets */
  it('should process empty arrays for additionalMetaTags, additionalLinkTags, and preloadAssets', () => {
    const result = metadata({
      additionalMetaTags: [],
      additionalLinkTags: [],
      preloadAssets: [],
    });
    expect(result.other ?? {}).toMatchObject({});
  });

  /* Test appleWebApp meta tag processing */
  it('should process appleWebApp', () => {
    const result = metadata({
      appleWebApp: {
        capable: true,
        title: 'App'
      }
    });
    expect(result.other?.['apple-mobile-web-app-capable']).toBe('yes');
    expect(result.other?.['apple-mobile-web-app-title']).toBe('App');
  });

  /* Test handling of partial appleWebApp fields */
  it('should process partial appleWebApp', () => {
    const result = metadata({ appleWebApp: { title: 'App' } });
    expect(result.other?.['apple-mobile-web-app-title']).toBe('App');
    expect(result.other?.['apple-mobile-web-app-capable']).toBeUndefined();
  });

  /* Test formatDetection meta tag processing with full data */
  it('should process formatDetection', () => {
    const result = metadata({
      formatDetection: { email: false, telephone: true, address: false }
    });
    expect(result.formatDetection).toEqual({ email: false, telephone: true, address: false });
  });

  /* Test formatDetection meta tag processing with partial data */
  it('should process partial formatDetection', () => {
    const result = metadata({ formatDetection: { email: false } });
    expect(result.formatDetection).toEqual({ email: false });
  });
});