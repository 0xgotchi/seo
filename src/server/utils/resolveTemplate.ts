/**
 * Resolves a template string or function by substituting placeholders with provided values.
 * If the template is a function, it will be called with the 'title' value.
 * If the template is a string, all %key% placeholders will be replaced by their corresponding values.
 * Used for dynamic title and siteName substitution in SEO metadata.
 * @param template Template string or function to resolve.
 * @param values Object containing values to substitute in the template (e.g., title, siteName).
 * @returns The resolved string with all placeholders replaced.
 */
export function resolveTemplate(
  template: string | ((title?: string) => string),
  values: Record<string, string>
): string {
  // If template is a function, call it with the 'title' value
  if (typeof template === 'function') {
    return template(values.title);
  }
  // If template is a string, replace all %key% placeholders with their values
  return Object.entries(values).reduce(
    (acc, [key, value]) => acc.replace(new RegExp(`%${key}%`, 'g'), value),
    template
  );
}
