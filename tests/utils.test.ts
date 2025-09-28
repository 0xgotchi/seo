import * as utils from "../src/utils";
import basicSEO from "../examples/basic-config";
import mediumSEO from "../examples/medium-config";
import advancedSEO from "../examples/advanced-config";

describe("Utils SEO", () => {
	it("should generate example HTML for favicons", () => {
		const html = utils.generateFavicons(advancedSEO.customFavicons);
		expect(html).toContain("<link");
		expect(html).toContain("favicon.ico");
		console.log("Favicons HTML Example:\n", html);
	});

	it("should generate example HTML for additional meta tags", () => {
		const html = utils.generateAdditionalMetaTags(
			advancedSEO.additionalMetaTags,
		);
		expect(html).toContain("<meta");
		expect(html).toContain("theme-color");
		console.log("Meta Tags HTML Example:\n", html);
	});

	it("should generate example HTML for additional link tags", () => {
		const html = utils.generateAdditionalLinkTags(
			advancedSEO.additionalLinkTags,
		);
		expect(html).toContain("<link");
		expect(html).toContain("icon");
		console.log("Link Tags HTML Example:\n", html);
	});

	it("should generate example HTML for security meta tags", () => {
		const html = utils.generateSecurityMetaTags(advancedSEO.security);
		expect(html).toContain("<meta");
		expect(html).toContain("Content-Security-Policy");
		console.log("Security Meta Tags HTML Example:\n", html);
	});

	it("should generate example HTML for authors", () => {
		const html = utils.generateAuthors(advancedSEO.authors);
		expect(html).toContain("<meta");
		expect(html).toContain("Jane Doe");
		console.log("Authors HTML Example:\n", html);
	});

	it("should generate example HTML for publisher", () => {
		const html = utils.generatePublisher(advancedSEO.publisher);
		expect(html).toContain("<meta");
		expect(html).toContain("publisher");
		console.log("Publisher HTML Example:\n", html);
	});

	it("should generate example HTML for preload assets", () => {
		const html = utils.generatePreloadAssets(advancedSEO.preloadAssets);
		expect(html).toContain("<link");
		expect(html).toContain("main.woff2");
		console.log("Preload Assets HTML Example:\n", html);
	});

	it("should generate example HTML for JSON-LD", () => {
		const html = utils.generateJSONLD(advancedSEO.schemaOrgJSONLD);
		expect(html).toContain("<script");
		expect(html).toContain("Organization");
		console.log("JSON-LD HTML Example:\n", html);
	});

	it("should generate example sitemap.xml", () => {
		const xml = utils.generateSitemap(advancedSEO.sitemap?.urls || []);
		expect(xml).toContain("<urlset");
		expect(xml).toContain("advancedsite.com");
		console.log("Sitemap XML Example:\n", xml);
	});

	it("should generate example robots.txt", () => {
		const txt = utils.generateRobotsTxt(advancedSEO.robotsTxt?.rules || []);
		expect(txt).toContain("User-agent");
		console.log("Robots.txt Example:\n", txt);
	});
	it("should generate example HTML for favicons", () => {
		const html = utils.generateFavicons(advancedSEO.customFavicons);
		expect(html).toContain("<link");
		expect(html).toContain("favicon.ico");
		console.log("Favicons HTML Example:\n", html);
	});

	it("should generate example HTML for additional meta tags", () => {
		const html = utils.generateAdditionalMetaTags(
			advancedSEO.additionalMetaTags,
		);
		expect(html).toContain("<meta");
		expect(html).toContain("theme-color");
		console.log("Meta Tags HTML Example:\n", html);
	});

	it("should generate example HTML for additional link tags", () => {
		const html = utils.generateAdditionalLinkTags(
			advancedSEO.additionalLinkTags,
		);
		expect(html).toContain("<link");
		expect(html).toContain("icon");
		console.log("Link Tags HTML Example:\n", html);
	});

	it("should generate example HTML for security meta tags", () => {
		const html = utils.generateSecurityMetaTags(advancedSEO.security);
		expect(html).toContain("<meta");
		expect(html).toContain("Content-Security-Policy");
		console.log("Security Meta Tags HTML Example:\n", html);
	});

	it("should generate example HTML for authors", () => {
		const html = utils.generateAuthors(advancedSEO.authors);
		expect(html).toContain("<meta");
		expect(html).toContain("Jane Doe");
		console.log("Authors HTML Example:\n", html);
	});
	it("should warn if title is missing", () => {
		const warnings = utils.validateSEO({});
		expect(warnings).toContain('The "title" field is required for SEO.');
	});
	it("should not warn if title is present (basic)", () => {
		const warnings = utils.validateSEO(basicSEO);
		expect(warnings.length).toBe(0);
	});
	it("should not warn if title is present (medium)", () => {
		const warnings = utils.validateSEO(mediumSEO);
		expect(warnings.length).toBe(0);
	});
	it("should not warn if title is present (advanced)", () => {
		const warnings = utils.validateSEO(advancedSEO);
		expect(warnings.length).toBe(0);
	});

	it("generates security meta tags", () => {
		const meta = utils.generateSecurityMetaTags({
			metaTags: [{ httpEquiv: "referrer", content: "no-referrer" }],
		});
		expect(meta).toContain("referrer");
	});

	it("generates sitemap", () => {
		const sitemap = utils.generateSitemap(["https://site.com"]);
		expect(sitemap).toContain("https://site.com");
	});

	it("generates robots.txt", () => {
		const robots = utils.generateRobotsTxt(["User-agent: *"]);
		expect(robots).toContain("User-agent: *");
	});

	it("generates SEO report", () => {
		const report = utils.generateSEOReport(basicSEO);
		expect(typeof report).toBe("string");
		expect(report).toContain("My Website");
	});

	it("generates favicons from advanced config", () => {
		const favicons = utils.generateFavicons(advancedSEO.customFavicons);
		expect(favicons).toContain("favicon.ico");
		expect(favicons).toContain("apple-touch-icon.png");
	});

	it("generates additional meta/link tags from advanced config", () => {
		const meta = utils.generateAdditionalMetaTags(
			advancedSEO.additionalMetaTags,
		);
		const link = utils.generateAdditionalLinkTags(
			advancedSEO.additionalLinkTags,
		);
		expect(meta).toContain("theme-color");
		expect(link).toContain("icon");
	});

	it("generates preload assets from advanced config", () => {
		const preload = utils.generatePreloadAssets(advancedSEO.preloadAssets);
		expect(preload).toContain("main.woff2");
	});

	it("generates JSON-LD from advanced config", () => {
		const jsonld = utils.generateJSONLD(advancedSEO.schemaOrgJSONLD);
		expect(jsonld).toContain("Organization");
	});

	it("generates authors from advanced config", () => {
		const authors = utils.generateAuthors(advancedSEO.authors);
		expect(authors).toContain("Jane Doe");
		expect(authors).toContain("John Smith");
	});
});
