import { resolveTemplate } from '../utils/resolveTemplate';

// Test suite for the resolveTemplate utility function
describe('resolveTemplate', () => {
  // Test: Should substitute placeholders in a string template
  it('correctly substitutes placeholders', () => {
    const template = 'Hello %name%, welcome to %site%!';
    const values = { name: 'John', site: 'MySite' };
    const result = resolveTemplate(template, values);

    expect(result).toBe('Hello John, welcome to MySite!');
  });

  // Test: Should work when template is a function
  it('works when template is a function', () => {
    const templateFn = (title?: string) => `Title: ${title}`;
    const result = resolveTemplate(templateFn, { title: 'Home' });

    expect(result).toBe('Title: Home');
  });

  // Test: Should not change the string if there are no placeholders
  it('does not change if there are no placeholders', () => {
    const template = 'Message without placeholders';
    const result = resolveTemplate(template, { any: 'value' });

    expect(result).toBe('Message without placeholders');
  });
});
