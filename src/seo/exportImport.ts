// Support for exporting/importing SEO configurations
import type { SEOOptions } from "../index";

export function exportSEOConfig(config: SEOOptions): string {
	return JSON.stringify(config, null, 2);
}

export function importSEOConfig(json: string): SEOOptions {
	try {
		return JSON.parse(json) as SEOOptions;
	} catch (error) {
		console.error("Invalid SEO config JSON:", error);
		return {} as SEOOptions;
	}
}
