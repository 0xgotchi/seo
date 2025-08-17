/**
 * Processes the openGraph object and returns a shallow copy.
 * Also clones profile, book, and article sub-objects if present.
 * @param openGraph The openGraph input object.
 * @returns A cloned openGraph object or undefined.
 */
export function processOpenGraph(openGraph: any): any {
  if (!openGraph) return undefined; // Return undefined if no openGraph provided

  // Shallow clone of openGraph object
  const result = { ...openGraph };

  // Clone profile object if present
  if (openGraph.profile) result.profile = { ...openGraph.profile };
  // Clone book object if present
  if (openGraph.book) result.book = { ...openGraph.book };
  // Clone article object if present
  if (openGraph.article) result.article = { ...openGraph.article };

  return result;
}
