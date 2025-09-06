
import { processRobotsDirectives } from '../utils/processRobotsDirectives';
import { RobotsDirectives } from '../../types';

/**
 * Test suite for processRobotsDirectives utility.
 * Validates all possible branches and return values for robots meta tag generation.
 */
describe('processRobotsDirectives', () => {
  /**
   * Should return "noindex, nofollow" when both noindex and nofollow are true (basic robots).
   */
  it('returns "noindex, nofollow" when noindex and nofollow are true', () => {
    const result = processRobotsDirectives({ noindex: true, nofollow: true });
    expect(result).toBe('noindex, nofollow');
  });

  /**
   * Should return "index, follow" when no robots directives are defined (default fallback).
   */
  it('returns "index, follow" when not defined', () => {
    const result = processRobotsDirectives({});
    expect(result).toBe('index, follow');
  });

  /**
   * Should return all advanced robots directives, including GoogleBot options.
   */
  it('returns advanced directives correctly', () => {
    const robots: RobotsDirectives = {
      index: false,
      follow: true,
      nocache: true,
      noimageindex: true,
      nosnippet: true,
      notranslate: true,
      unavailable_after: '2025-12-31',
      googleBot: {
        index: true,
        follow: false,
        noimageindex: true,
        'max-video-preview': 3,
        'max-image-preview': 'large',
        'max-snippet': 50,
      },
    };

    const result = processRobotsDirectives(robots);
    expect(result).toContain('noindex');
    expect(result).toContain('follow');
    expect(result).toContain('noarchive');
    expect(result).toContain('noimageindex');
    expect(result).toContain('nosnippet');
    expect(result).toContain('notranslate');
    expect(result).toContain('unavailable_after:2025-12-31');

    // GoogleBot directives
    expect(result).toContain('nofollow'); // googleBot follow
    expect(result).toContain('max-video-preview:3');
    expect(result).toContain('max-image-preview:large');
    expect(result).toContain('max-snippet:50');
  });

  /**
   * Should return undefined when robots is not provided.
   */
  it('returns undefined when robots is not provided', () => {
    const result = processRobotsDirectives(undefined);
    expect(result).toBeUndefined();
  });

  /**
   * Should return "index, follow" when advanced robots is empty.
   */
  it('returns "index, follow" when advanced robots is empty', () => {
    const result = processRobotsDirectives({});
    expect(result).toBe('index, follow');
  });

  /**
   * Should return "index, follow" even if googleBot is empty.
   */
  it('returns correctly even if googleBot is empty', () => {
    const result = processRobotsDirectives({ googleBot: {} });
    expect(result).toBe('index, follow');
  });

  /**
   * Should return correct string for only index true.
   */
  it('returns correct string for only index true', () => {
    const result = processRobotsDirectives({ index: true });
    expect(result).toContain('index');
    expect(result).toContain('follow');
  });

  /**
   * Should return correct string for only follow true.
   */
  it('returns correct string for only follow true', () => {
    const result = processRobotsDirectives({ follow: true });
    expect(result).toContain('index');
    expect(result).toContain('follow');
  });

  /**
   * Should return correct string for only index false.
   */
  it('returns correct string for only index false', () => {
    const result = processRobotsDirectives({ index: false });
    expect(result).toBe('index, follow');
  });

  /**
   * Should return correct string for only index and follow combination.
   */
  it('returns correct string for only index and follow', () => {
    const result = processRobotsDirectives({ index: true, follow: false });
    expect(result).toContain('index');
    expect(result).toContain('follow');
  });

  /**
   * Should return correct string for only googleBot advanced fields.
   */
  it('returns correct string for only googleBot advanced fields', () => {
    const result = processRobotsDirectives({ googleBot: { 'max-snippet': 10 } });
    expect(result).toContain('max-snippet:10');
  });
});
