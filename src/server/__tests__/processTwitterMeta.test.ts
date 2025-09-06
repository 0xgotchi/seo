
import { processTwitterMeta } from '../utils/processTwitterMeta';

/**
 * Test suite for processTwitterMeta utility.
 * Validates Twitter meta tag generation for all input scenarios.
 */
describe('processTwitterMeta', () => {
  /**
   * Should return empty object when no data is provided.
   */
  it('should return empty object when no data is provided', () => {
    expect(processTwitterMeta({})).toEqual({});
  });

  /**
   * Should process all fields including image as string.
   */
  it('should process all fields including image as string', () => {
    const result = processTwitterMeta({
      card: 'summary_large_image',
      site: '@site',
      creator: '@creator',
      title: 'Title',
      description: 'Desc',
      image: 'https://img.com/img.png',
    });
    expect(result['twitter:card']).toBe('summary_large_image');
    expect(result['twitter:site']).toBe('@site');
    expect(result['twitter:creator']).toBe('@creator');
    expect(result['twitter:title']).toBe('Title');
    expect(result['twitter:description']).toBe('Desc');
    expect(result['twitter:image']).toBe('https://img.com/img.png');
    expect(result['twitter:image:alt']).toBeUndefined();
  });

  /**
   * Should process image as object with alt text.
   */
  it('should process image as object with alt', () => {
    const result = processTwitterMeta({
      image: { url: 'https://img.com/img.png', alt: 'alt text' }
    });
    expect(result['twitter:image']).toBe('https://img.com/img.png');
    expect(result['twitter:image:alt']).toBe('alt text');
  });

  /**
   * Should ignore missing fields and only set provided ones.
   */
  it('should ignore missing fields', () => {
    const result = processTwitterMeta({ title: 'Only Title' });
    expect(result['twitter:title']).toBe('Only Title');
    expect(result['twitter:card']).toBeUndefined();
  });
});
