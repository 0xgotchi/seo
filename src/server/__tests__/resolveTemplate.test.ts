import { resolveTemplate } from '../utils/resolveTemplate';

/**
 * Test suite for resolveTemplate utility.
 * Validates template string and function resolution for SEO title generation.
 */
describe('resolveTemplate', () => {
  /**
   * Should resolve template string with %key% placeholders.
   */
  it('correctly substitutes placeholders', () => {
    const template = 'Hello %name%, welcome to %site%!';
    const values = { name: 'John', site: 'MySite' };
    const result = resolveTemplate(template, values);

    expect(result).toBe('Hello John, welcome to MySite!');
  });

  /**
   * Should resolve template function with title argument.
   */
  it('works when template is a function', () => {
    const templateFn = (title?: string) => `Title: ${title}`;
    const result = resolveTemplate(templateFn, { title: 'Home' });

    expect(result).toBe('Title: Home');
  });

  /**
   * Should return template unchanged if no placeholders match.
   */
  it('does not change if there are no placeholders', () => {
    const template = 'Message without placeholders';
    const result = resolveTemplate(template, { any: 'value' });

    expect(result).toBe('Message without placeholders');
  });
});
