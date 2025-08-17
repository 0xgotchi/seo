import { Metadata } from '../generateMetadata';
import { DEFAULT_METADATA } from '../../constants';
import { MetadataInput } from '../../types';
import * as generateJsonLDModule from '../utils/processJsonLD';

describe('Metadata', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ------------------------------
  // TITLE
  // ------------------------------
  it('should return default title if not provided', () => {
    const result = Metadata({});
    expect(result.title).toBeDefined();
    expect(result.title).toEqual(DEFAULT_METADATA.title);
  });

  it('should apply a simple title', () => {
    const result = Metadata({ title: 'Test Page' });
    expect(result.title).toBe('Test Page');
  });

  it('should apply titleTemplate with defaultTitle', () => {
    const result = Metadata({
      defaultTitle: 'Home',
      titleTemplate: '%s | My Site',
    });
    expect(result.title).toEqual({ default: 'My Website', template: '%title% | My Website' });
  });

  it('should apply titleTemplate using provided title', () => {
    const result = Metadata({
      title: 'Test Page',
      titleTemplate: '%s | My Site'
    });
    expect(result.title).toEqual({ default: 'Test Page', template: '%s | My Site' });
  });

  // ------------------------------
  // DESCRIPTION
  // ------------------------------
  it('should process description', () => {
    const result = Metadata({ description: 'Test description' });
    expect(result.description).toBe('Test description');
  });

  // ------------------------------
  // ROBOTS
  // ------------------------------
  it('should process basic robots', () => {
    const result = Metadata({ noindex: true, nofollow: true });
    expect(result.robots).toBe('noindex, nofollow');
  });

  it('should process advanced robots', () => {
    const result = Metadata({
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

  it('should process advanced robots without googleBot', () => {
    const result = Metadata({
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

  // ------------------------------
  // OPEN GRAPH
  // ------------------------------
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
    const result = Metadata({ openGraph: ogData });
    expect(result.openGraph).toMatchObject(ogData);
  });

  it('should process OpenGraph with minimal data', () => {
    const result = Metadata({ openGraph: { title: 'OG Title' } });
    expect(result.openGraph?.title).toBe('OG Title');
  });

  // ------------------------------
  // TWITTER
  // ------------------------------
  it('should process Twitter with string image', () => {
    const result = Metadata({
      twitter: {
        card: 'summary_large_image',
        image: 'https://site.com/img.png',
      },
    });
    expect(result.other?.['twitter:image']).toBe('https://site.com/img.png');
  });

  it('should process Twitter with image object', () => {
    const img = {
      url: 'https://site.com/img.png',
      alt: 'test',
      width: 1200,
      height: 600
    };
    const result = Metadata({
      twitter: {
        card: 'summary',
        image: img,
      },
    });
    expect(result.other?.['twitter:image']).toBe('https://site.com/img.png');
    expect(result.other?.['twitter:image:alt']).toBe('test');
  });

  it('should process Twitter with default values', () => {
    const result = Metadata({});
    expect(result.other?.['twitter:card']).toBe('summary_large_image');
    expect(result.other?.['twitter:title']).toBe(DEFAULT_METADATA.twitter.title);
    expect(result.other?.['twitter:description']).toBe(DEFAULT_METADATA.twitter.description);
    expect(result.other?.['twitter:image']).toBe(DEFAULT_METADATA.twitter.image);
  });

  it('should use defaults for Twitter when values are empty', () => {
    const result = Metadata({ twitter: {} });
    expect(result.other?.['twitter:card']).toBe('summary_large_image');
  });

  // ------------------------------
  // ALTERNATES
  // ------------------------------
  it('should process language alternates', () => {
    const alternates = {
      languages: { 
        ru: 'https://site.com/ru', 
        en: 'https://site.com/en' 
      },
    };
    const result = Metadata({ alternates });
    expect(result.alternates?.languages).toEqual(alternates.languages);
  });

  // ------------------------------
  // VERIFICATION
  // ------------------------------
  it('should process verification', () => {
    const verification = { 
      google: '123',
      facebook: '456'
    };
    const result = Metadata({ verification });
    expect(result.verification).toEqual(verification);
  });

  // ------------------------------
  // SCHEMA ORG JSON-LD
  // ------------------------------
  it('should process schemaOrgJSONLD (object and array)', () => {
    const spy = jest.spyOn(generateJsonLDModule, 'generateJsonLD');

    // Object
    const schemaObj = { 
      '@type': 'Article', 
      name: 'Test',
      datePublished: '2023-01-01'
    };
    const resultObj = Metadata({ schemaOrgJSONLD: schemaObj });
    expect(spy).toHaveBeenCalledWith(schemaObj);
    expect(resultObj.jsonLD).toBe(generateJsonLDModule.generateJsonLD(schemaObj));

    // Array
    const schemaArr = [
      { '@type': 'WebSite', name: 'Site 1' },
      { '@type': 'Organization', name: 'Site 2' },
    ];
    const resultArr = Metadata({ schemaOrgJSONLD: schemaArr });
    expect(spy).toHaveBeenCalledWith(schemaArr);
    expect(resultArr.jsonLD).toBe(generateJsonLDModule.generateJsonLD(schemaArr));
  });

  // ------------------------------
  // AUTHORS
  // ------------------------------
  it('should process authors', () => {
    const authors = [
      'Author 1', 
      { name: 'Author 2', url: 'https://a.com' },
      { name: 'Author 3' }
    ];
    const result = Metadata({ authors });
    expect(result.authors).toEqual([
      { name: 'Author 1' },
      { name: 'Author 2', url: 'https://a.com' },
      { name: 'Author 3' }
    ]);
  });

  it('should return empty array for missing authors', () => {
    const result = Metadata({});
    expect(result.authors).toEqual([]);
  });

  // ------------------------------
  // PUBLISHER
  // ------------------------------
  it('should process publisher', () => {
    const result = Metadata({ publisher: 'Company' });
    expect(result.publisher).toBe('Company');
  });

  it('should return undefined publisher if not provided', () => {
    const result = Metadata({});
    expect(result.publisher).toBeUndefined();
  });

  // ------------------------------
  // FACEBOOK
  // ------------------------------
  it('should process Facebook appId', () => {
    const result = Metadata({ 
      facebook: { 
        appId: '123456',
        pages: '789'
      } 
    });
    expect(result.other?.['fb:app_id']).toBe('123456');
  });

  it('should not add fb:app_id if not provided', () => {
    const result = Metadata({ facebook: { pages: '123' } });
    expect(result.other?.['fb:app_id']).toBeUndefined();
  });

  // ------------------------------
  // ADDITIONAL TAGS AND PRELOAD
  // ------------------------------
  it('should process additionalMetaTags, additionalLinkTags, and preloadAssets', () => {
    const result = Metadata({
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

  it('should process empty arrays for additionalMetaTags, additionalLinkTags, and preloadAssets', () => {
    const result = Metadata({
      additionalMetaTags: [],
      additionalLinkTags: [],
      preloadAssets: [],
    });
    expect(result.other ?? {}).toMatchObject({});
  });

  // ------------------------------
  // APPLE WEB APP
  // ------------------------------
  it('should process appleWebApp', () => {
    const result = Metadata({
      appleWebApp: {
        capable: true,
        title: 'App'
      }
    });
    expect(result.other?.['apple-mobile-web-app-capable']).toBe('yes');
    expect(result.other?.['apple-mobile-web-app-title']).toBe('App');
  });

  it('should process partial appleWebApp', () => {
    const result = Metadata({ appleWebApp: { title: 'App' } });
    expect(result.other?.['apple-mobile-web-app-title']).toBe('App');
    expect(result.other?.['apple-mobile-web-app-capable']).toBeUndefined();
  });

  // ------------------------------
  // FORMAT DETECTION
  // ------------------------------
  it('should process formatDetection', () => {
    const result = Metadata({
      formatDetection: { email: false, telephone: true, address: false }
    });
    expect(result.formatDetection).toEqual({ email: false, telephone: true, address: false });
  });

  it('should process partial formatDetection', () => {
    const result = Metadata({ formatDetection: { email: false } });
    expect(result.formatDetection).toEqual({ email: false });
  });
});
