import { processRobotsDirectives } from '../utils/processRobotsDirectives';
import { RobotsDirectives } from '../../types';

describe('processRobotsDirectives', () => {
  it('returns "noindex, nofollow" when noindex and nofollow are true', () => {
    const result = processRobotsDirectives({ noindex: true, nofollow: true });
    expect(result).toBe('noindex, nofollow');
  });

  it('returns "index, follow" when not defined', () => {
    const result = processRobotsDirectives({});
    expect(result).toBe('index, follow');
  });

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

    // googleBot
    expect(result).toContain('nofollow'); // googleBot follow
    expect(result).toContain('max-video-preview:3');
    expect(result).toContain('max-image-preview:large');
    expect(result).toContain('max-snippet:50');
  });

  it('returns undefined when robots is not provided', () => {
    const result = processRobotsDirectives(undefined);
    expect(result).toBeUndefined();
  });

  it('returns "index, follow" when advanced robots is empty', () => {
    const result = processRobotsDirectives({});
    expect(result).toBe('index, follow');
  });

  it('returns correctly even if googleBot is empty', () => {
    const result = processRobotsDirectives({ googleBot: {} });
    expect(result).toBe('index, follow');
  });
});
