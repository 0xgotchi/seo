import { LanguageAlternate } from '../../types';

/**
 * Processes the alternates object and returns a normalized structure.
 * Handles canonical, languages, media, types, and mobileAlternate.
 * @param alternates The alternates input object.
 * @returns A normalized alternates object or undefined.
 */
export function processAlternates(alternates: any): any {
  if (!alternates) return undefined; // Return undefined if no alternates provided

  const result: any = {};

  // Add canonical URL if present
  if (alternates.canonical) result.canonical = alternates.canonical;

  // Process language alternates
  if (alternates.languages) {
    // If languages is an array, convert to object { lang: url }
    if (Array.isArray(alternates.languages)) {
      result.languages = alternates.languages.reduce(
        (acc: Record<string, string>, curr: LanguageAlternate) => {
          acc[curr.hrefLang] = curr.href;
          return acc;
        },
        {}
      );
    } else {
      // If already an object, just assign
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
