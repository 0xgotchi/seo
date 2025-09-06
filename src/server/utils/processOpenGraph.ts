/**
 * Processes the openGraph metadata object and returns a shallow copy.
 * Ensures sub-objects (profile, book, article) are also cloned to avoid reference issues.
 * @param openGraph The openGraph input object (may contain profile, book, article sub-objects).
 * @returns A cloned openGraph object or undefined if input is not provided.
 */
export function processOpenGraph(openGraph: any): any {
  // Return undefined if no openGraph provided
  if (!openGraph) return undefined;

  // Shallow clone of openGraph object
  const result = { ...openGraph };

  // Clone profile object if present to avoid mutating original
  if (openGraph.profile) result.profile = { ...openGraph.profile };
  // Clone book object if present to avoid mutating original
  if (openGraph.book) result.book = { ...openGraph.book };
  // Clone article object if present to avoid mutating original
  if (openGraph.article) result.article = { ...openGraph.article };

  // Return the cloned result
  return result;
}
