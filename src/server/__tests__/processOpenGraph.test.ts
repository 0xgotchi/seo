import { processOpenGraph } from '../utils/processOpenGraph';

describe('processOpenGraph', () => {
  it('returns undefined if openGraph is not provided', () => {
    expect(processOpenGraph(undefined)).toBeUndefined();
  });

  it('correctly clones basic properties', () => {
    const input = { title: 'Home', description: 'Description' };
    const result = processOpenGraph(input);
    expect(result).toEqual(input);
    expect(result).not.toBe(input); // should be a copy
  });

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
  });
});
