import { LanguageAlternate } from '../../types';

/**
 * Normalizes and processes the alternates object for SEO (hreflang, canonical, media, types, mobile).
 * Converts arrays to objects and ensures correct structure for Next.js metadata.
 * @param alternates The alternates input object.
 * @returns A normalized alternates object or undefined.
 */

/**
 * Processes the alternates object and returns a normalized structure.
 * Handles canonical, languages, media, types, and mobileAlternate.
 * @param alternates The alternates input object.
 * @returns A normalized alternates object or undefined.
 */
export function processAlternates(alternates: any): any {
  if (!alternates) return undefined; // No alternates provided

  const result: any = {};

  // Add canonical URL if present
  if (alternates.canonical) result.canonical = alternates.canonical;

  // Process language alternates (array or object)
  if (alternates.languages) {
    if (Array.isArray(alternates.languages)) {
      // Convert array to object { lang: url }
      result.languages = alternates.languages.reduce(
        (acc: Record<string, string>, curr: LanguageAlternate) => {
          acc[curr.hrefLang] = curr.href;
          return acc;
        },
        {}
      );
    } else {
      // Already an object
      result.languages = alternates.languages;
    }
  }

  // Add media alternates if present
  if (alternates.media) result.media = alternates.media;

  // Add type alternates if present
  if (alternates.types) result.types = alternates.types;

  // Add mobile alternate if present
  if (alternates.mobileAlternate) {
    result.mobileAlternate = {
      media: alternates.mobileAlternate.media,
      href: alternates.mobileAlternate.href,
    };
  }

  return result;
}
