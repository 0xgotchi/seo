/**
 * Resolves a template string or function by substituting placeholders with provided values.
 * If the template is a function, it will be called with the 'title' value.
 * If the template is a string, all %key% placeholders will be replaced by their corresponding values.
 * @param template Template string or function.
 * @param values Object containing values to substitute in the template.
 * @returns The resolved string.
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
