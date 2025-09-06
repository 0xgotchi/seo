
import { processOpenGraph } from '../utils/processOpenGraph';

/**
 * Test suite for processOpenGraph utility.
 * Validates cloning and return values for OpenGraph metadata normalization.
 */
describe('processOpenGraph', () => {
  /**
   * Should return undefined if openGraph is not provided (no input).
   */
  it('returns undefined if openGraph is not provided', () => {
    expect(processOpenGraph(undefined)).toBeUndefined();
  });

  /**
   * Should correctly clone basic OpenGraph properties.
   */
  it('correctly clones basic properties', () => {
    const input = { title: 'Home', description: 'Description' };
    const result = processOpenGraph(input);
    expect(result).toEqual(input);
    expect(result).not.toBe(input); // should be a copy
  });

  /**
   * Should correctly clone profile, book, and article sub-objects.
   */
  it('correctly clones profile, book, and article objects', () => {
    const input = {
      profile: { firstName: 'John' },
      book: { isbn: '123' },
      article: { author: 'Anna' },
    };

    const result = processOpenGraph(input);
    expect(result.profile).toEqual({ firstName: 'John' });
    expect(result.book).toEqual({ isbn: '123' });
    expect(result.article).toEqual({ author: 'Anna' });
    // Final return should be a shallow copy
    expect(result).not.toBe(input);
    expect(typeof result).toBe('object');
  });
});
