import { SchemaJSONLD } from '../../types';

/**
 * Converts a JSON-LD object or array into a string ready for HTML injection.
 * @param schema JSON-LD (object, array, or undefined)
 * @returns JSON-LD string
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
