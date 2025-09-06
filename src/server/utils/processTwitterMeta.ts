
import { TwitterImage } from '../../types';

/**
 * Processes Twitter metadata and returns an object of meta tag key-value pairs.
 * Handles card, site, creator, title, description, and image (string or object).
 * Used for generating Twitter meta tags for social sharing.
 * @param twitterData Twitter metadata input (card, site, creator, title, description, image).
 * @returns Object with Twitter meta tag keys and values for HTML injection.
 */
export const processTwitterMeta = (twitterData: {
  card?: string;
  site?: string;
  creator?: string;
  title?: string;
  description?: string;
  image?: string | TwitterImage;
}) => {
  // Object to hold meta tag key-value pairs
  const metaTags: Record<string, string> = {};

  // Add basic Twitter meta tags if present
  if (twitterData.card) metaTags['twitter:card'] = twitterData.card;
  if (twitterData.site) metaTags['twitter:site'] = twitterData.site;
  if (twitterData.creator) metaTags['twitter:creator'] = twitterData.creator;
  if (twitterData.title) metaTags['twitter:title'] = twitterData.title;
  if (twitterData.description) metaTags['twitter:description'] = twitterData.description;

  // Handle Twitter image (can be string or object)
  if (twitterData.image) {
    // Normalize image to object format for consistent processing
    const image = typeof twitterData.image === 'string' 
      ? { url: twitterData.image } 
      : twitterData.image;

    // Add image URL to meta tags
    metaTags['twitter:image'] = image.url;
    // Add image alt text if present
    if (image.alt) metaTags['twitter:image:alt'] = image.alt;
  }

  // Return the meta tags object for HTML injection
  return metaTags;
};