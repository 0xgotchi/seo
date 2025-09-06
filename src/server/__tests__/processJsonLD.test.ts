
import { generateJsonLD } from '../utils/processJsonLD';

/**
 * Test suite for generateJsonLD utility.
 * Validates serialization and error handling for JSON-LD generation.
 */
describe('generateJsonLD', () => {
  /**
   * Should return empty string if schema is undefined (no input).
   */
  it('should return empty string if schema is undefined', () => {
    expect(generateJsonLD(undefined)).toBe('');
  });

  /**
   * Should serialize a single object to JSON string.
   */
  it('should serialize a single object', () => {
    const obj = { '@type': 'Test', name: 'Name' };
    expect(generateJsonLD(obj)).toBe(JSON.stringify(obj));
  });

  /**
   * Should serialize an array of objects to JSON string.
   */
  it('should serialize an array of objects', () => {
    const arr = [
      { '@type': 'A', name: 'A' },
      { '@type': 'B', name: 'B' }
    ];
    expect(generateJsonLD(arr)).toBe(JSON.stringify(arr));
  });

  /**
   * Should return empty string and log error if serialization fails (e.g., circular reference).
   */
  it('should return empty string and log error if serialization fails', () => {
    const circular: any = {};
    circular.self = circular;
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(generateJsonLD(circular)).toBe('');
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
