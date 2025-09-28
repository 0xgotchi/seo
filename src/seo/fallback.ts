// Automatic fallback for required fields
import type { SEOOptions } from "../index";

export function applyFallbacks(options: SEOOptions): SEOOptions {
	return {
		...options,
		title: options.title || "Default Title",
		description: options.description || "Default Description",
	};
}
