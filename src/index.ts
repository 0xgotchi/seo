/**
 * Export all type definitions for external usage.
 * Includes all metadata, SEO, and social types for consumers of the package.
 */
export * from './types';

/**
 * Export the main metadata generation function for Next.js metadata API.
 * This is the entry point for generating SEO metadata in Next.js App Router.
 */
export { metadata } from './server/generateMetadata';