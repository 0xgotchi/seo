// Plugin system for SEO Toolkit
import type { SEOOptions } from "./index";

export type SEOPlugin = (options: SEOOptions) => Partial<SEOOptions>;

const plugins: SEOPlugin[] = [];

export function registerPlugin(plugin: SEOPlugin) {
	plugins.push(plugin);
}

export function applyPlugins(options: SEOOptions): SEOOptions {
	// Avoid spread and Object.assign in accumulator for performance
	return plugins.reduce(
		(acc, plugin) => {
			const result = plugin(acc);
			for (const key in result) {
				// @ts-expect-error: dynamic assignment
				acc[key] = result[key];
			}
			return acc;
		},
		{ ...options },
	);
}
