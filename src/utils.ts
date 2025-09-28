// Utility functions for SEO Toolkit
import type { SEOOptions } from "./index";

/**
 * Validates required fields and returns warnings if necessary
 */
export function validateSEO(options: SEOOptions): string[] {
	const warnings: string[] = [];
	if (!options.title) warnings.push('The "title" field is required for SEO.');
	return warnings;
}

/**
 * Generates security meta tags in HTML
 */
export function generateSecurityMetaTags(
	security?: SEOOptions["security"],
): string {
	if (!security || !Array.isArray(security.metaTags)) return "";
	return security.metaTags
		.filter(
			(tag) =>
				tag &&
				typeof tag.httpEquiv === "string" &&
				typeof tag.content === "string",
		)
		.map(
			(tag) => `<meta http-equiv="${tag.httpEquiv}" content="${tag.content}">`,
		)
		.join("\n");
}

/**
 * Generates sitemap.xml from URLs
 */
export function generateSitemap(urls: string[]): string {
	return (
		`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
		urls.map((url) => `  <url><loc>${url}</loc></url>`).join("\n") +
		"\n</urlset>"
	);
}

/**
 * Generates dynamic robots.txt
 */
export function generateRobotsTxt(rules: string[]): string {
	return rules.join("\n");
}

/**
 * Generates basic SEO report in JSON
 */
export function generateSEOReport(options: SEOOptions): string {
	return JSON.stringify(options, null, 2);
}

/**
 * Generates HTML tags for custom favicons
 */
export function generateFavicons(
	favicons?: SEOOptions["customFavicons"],
): string {
	if (!Array.isArray(favicons)) return "";
	return favicons
		.filter((f) => f && typeof f.href === "string")
		.map(
			(f) =>
				`<link rel="${f.rel || "icon"}" href="${f.href}"${f.type ? ` type="${f.type}"` : ""}${f.sizes ? ` sizes="${f.sizes}"` : ""}>`,
		)
		.join("\n");
}

/**
 * Generates HTML tags for additional meta tags
 */
export function generateAdditionalMetaTags(
	tags?: SEOOptions["additionalMetaTags"],
): string {
	if (!Array.isArray(tags)) return "";
	return tags
		.filter((t) => t && typeof t.content === "string")
		.map(
			(t) =>
				`<meta${t.name ? ` name="${t.name}"` : ""}${t.property ? ` property="${t.property}"` : ""} content="${t.content}">`,
		)
		.join("\n");
}

/**
 * Generates HTML tags for additional link tags
 */
export function generateAdditionalLinkTags(
	tags?: SEOOptions["additionalLinkTags"],
): string {
	if (!Array.isArray(tags)) return "";
	return tags
		.filter((t) => t && typeof t.rel === "string" && typeof t.href === "string")
		.map(
			(t) =>
				`<link rel="${t.rel}" href="${t.href}"${t.type ? ` type="${t.type}"` : ""}${t.sizes ? ` sizes="${t.sizes}"` : ""}>`,
		)
		.join("\n");
}

/**
 * Generates HTML tags for asset preloading
 */
export function generatePreloadAssets(
	assets?: SEOOptions["preloadAssets"],
): string {
	if (!Array.isArray(assets)) return "";
	return assets
		.filter((a) => a && typeof a.href === "string")
		.map(
			(a) =>
				`<link rel="preload" href="${a.href}" as="${a.as || "auto"}"${a.type ? ` type="${a.type}"` : ""}${a.crossorigin ? ` crossorigin="${a.crossorigin}"` : ""}>`,
		)
		.join("\n");
}

/**
 * Generates JSON-LD for Schema.org
 */
export function generateJSONLD(jsonLd?: SEOOptions["schemaOrgJSONLD"]): string {
	if (!jsonLd || (typeof jsonLd !== "object" && !Array.isArray(jsonLd)))
		return "";
	return `<script type="application/ld+json">${JSON.stringify(jsonLd, null, 2)}</script>`;
}

/**
 * Generates HTML tags for authors
 */
export function generateAuthors(authors?: SEOOptions["authors"]): string {
	if (!Array.isArray(authors)) return "";
	return authors
		.filter((a) => a && (typeof a === "string" || typeof a.name === "string"))
		.map((a) =>
			typeof a === "string"
				? `<meta name="author" content="${a}">`
				: `<meta name="author" content="${a.name}${a.url ? ` (${a.url})` : ""}">`,
		)
		.join("\n");
}

/**
 * Generates HTML tags for publisher
 */
export function generatePublisher(publisher?: string): string {
	return typeof publisher === "string" && publisher
		? `<meta name="publisher" content="${publisher}">`
		: "";
}

// Other functions can be added as needed
