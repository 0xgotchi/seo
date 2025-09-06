import { SchemaJSONLD } from '../../types';

/**
 * Converts a JSON-LD object or array into a string for HTML injection.
 * Used for structured data in SEO (Schema.org).
 * @param schema JSON-LD (object, array, or undefined)
 * @returns JSON-LD string for HTML injection.
 */
export const generateJsonLD = (
  schema?: SchemaJSONLD | SchemaJSONLD[]
): string => {
  try {
    // Return empty string if schema is not provided
    if (!schema) return '';
    // If schema is an array, clone each item and stringify the array
    if (Array.isArray(schema)) {
      return JSON.stringify(schema.map((item) => ({ ...item })));
    }
    // If schema is an object, clone and stringify
    return JSON.stringify({ ...schema });
  } catch (err) {
    // Log error and return empty string if serialization fails
    console.error('Error generating JSON-LD', err);
    return '';
  }
};
