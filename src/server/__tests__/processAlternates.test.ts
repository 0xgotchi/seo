import { processAlternates } from '../utils/processAlternates';
import { LanguageAlternate } from '../../types';

/**
 * Test suite for processAlternates utility.
 * Validates normalization of alternates for languages, canonical, media, types, and mobile.
 */
describe('processAlternates', () => {
  it('returns undefined if no alternates are provided', () => {
    expect(processAlternates(undefined)).toBeUndefined();
  });

  it('processes canonical correctly', () => {
    const input = { canonical: 'https://example.com' };
    const result = processAlternates(input);
    expect(result.canonical).toBe('https://example.com');
  });

  /**
   * Should process language alternates and return correct mapping.
   */
  it('processes languages into an array of objects', () => {
    const input: any = {
      languages: [
        { hrefLang: 'ru-RU', href: 'https://example.com/ru' } as LanguageAlternate,
        { hrefLang: 'en-US', href: 'https://example.com/en' } as LanguageAlternate,
      ],
    };
    const result = processAlternates(input);
    expect(result.languages['ru-RU']).toBe('https://example.com/ru');
    expect(result.languages['en-US']).toBe('https://example.com/en');
  });

  /**
   * Should process canonical alternate and return correct value.
   */
  it('processes languages already as an object', () => {
    const input = { languages: { 'ru-RU': 'https://example.com/ru' } };
    const result = processAlternates(input);
    expect(result.languages['ru-RU']).toBe('https://example.com/ru');
  });

  /**
   * Should process media and types alternates and return correct values.
   */
  it('processes media and types', () => {
    const input = { media: 'screen', types: 'application/json' };
    const result = processAlternates(input);
    expect(result.media).toBe('screen');
    expect(result.types).toBe('application/json');
  });

  /**
   * Should process mobileAlternate correctly and return correct values.
   */
  it('processes mobileAlternate correctly', () => {
    const input = { mobileAlternate: { href: '/m', media: 'only screen' } };
    const result = processAlternates(input);
    expect(result.mobileAlternate.href).toBe('/m');
    expect(result.mobileAlternate.media).toBe('only screen');
  });
});
