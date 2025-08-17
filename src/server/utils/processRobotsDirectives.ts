import { RobotsDirectives, RobotsAdvancedDirectives } from '../../types';

/**
 * Type guard to check if the object is RobotsAdvancedDirectives.
 * @param obj The object to check.
 * @returns True if obj is RobotsAdvancedDirectives.
 */
function isRobotsAdvancedDirectives(obj: any): obj is RobotsAdvancedDirectives {
  return (
    typeof obj === 'object' &&
    (obj.nocache !== undefined ||
      obj.noarchive !== undefined ||
      obj.noimageindex !== undefined ||
      obj.nosnippet !== undefined ||
      obj.googleBot !== undefined)
  );
}

/**
 * Processes robots directives and returns a string for meta tag usage.
 * Handles both basic and advanced robots directives.
 * @param robots Robots directives input.
 * @returns Robots meta tag string or undefined.
 */
export function processRobotsDirectives(robots?: RobotsDirectives): string | undefined {
  if (robots === undefined) return undefined;

  // Basic directives: noindex/nofollow
  if ('noindex' in robots || 'nofollow' in robots) {
    const parts = [];
    parts.push(robots.noindex ? 'noindex' : 'index');
    parts.push(robots.nofollow ? 'nofollow' : 'follow');
    return parts.join(', ');
  }

  // Advanced directives
  if (isRobotsAdvancedDirectives(robots)) {
    const parts: string[] = [];

    // Main directives: index/follow
    parts.push(robots.index === false ? 'noindex' : 'index');
    parts.push(robots.follow === false ? 'nofollow' : 'follow');

    // Other directives
    if (robots.nocache || robots.noarchive) parts.push('noarchive');
    if (robots.noimageindex) parts.push('noimageindex');
    if (robots.nosnippet) parts.push('nosnippet');
    if (robots.notranslate) parts.push('notranslate');
    if (robots.unavailable_after) parts.push(`unavailable_after:${robots.unavailable_after}`);

    // GoogleBot specific directives
    if (robots.googleBot) {
      const gb = robots.googleBot;
      if (gb.index === false) parts.push('noindex');
      if (gb.follow === false) parts.push('nofollow');
      if (gb.noimageindex) parts.push('noimageindex');
      if (gb['max-video-preview'] !== undefined)
        parts.push(`max-video-preview:${gb['max-video-preview']}`);
      if (gb['max-image-preview']) parts.push(`max-image-preview:${gb['max-image-preview']}`);
      if (gb['max-snippet'] !== undefined) parts.push(`max-snippet:${gb['max-snippet']}`);
    }

    // Join all directives into a string, or fallback to 'index, follow'
    return parts.filter(Boolean).join(', ') || 'index, follow';
  }

  // Default fallback
  return 'index, follow';
}