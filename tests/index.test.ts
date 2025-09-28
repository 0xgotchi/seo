import { generateMetadata } from "../src/index";

describe("generateMetadata", () => {
	it("generates basic metadata", () => {
		const metadata = generateMetadata({
			title: "Test Page",
			description: "Test description",
		});
		expect(metadata.title).toBe("Test Page");
		expect(metadata.description).toBe("Test description");
	});

	it("applies fallback for title and description", () => {
		const metadata = generateMetadata({});
		expect(metadata.title).toBeDefined();
		expect(metadata.description).toBeDefined();
	});

	it("generates OpenGraph and Twitter", () => {
		const metadata = generateMetadata({
			openGraph: { title: "OG Title", url: "https://test.com" },
			twitter: { card: "summary", site: "@test" },
		});
		expect(metadata.openGraph.title).toBe("OG Title");
		expect(metadata.twitter.card).toBe("summary");
	});

	it("adds extra meta/link tags", () => {
		const metadata = generateMetadata({
			additionalMetaTags: [{ name: "viewport", content: "width=device-width" }],
			additionalLinkTags: [{ rel: "canonical", href: "https://test.com" }],
		});
		expect(metadata.additionalMetaTags[0].name).toBe("viewport");
		expect(metadata.additionalLinkTags[0].rel).toBe("canonical");
	});

	it("generates JSON-LD and Schema.org", () => {
		const metadata = generateMetadata({
			jsonLd: [{ "@type": "WebSite", url: "https://test.com" }],
			schemaOrgJSONLD: { "@type": "Organization", name: "Test" },
		});
		expect(metadata.jsonLd[0]["@type"]).toBe("WebSite");
		if (Array.isArray(metadata.schemaOrgJSONLD)) {
			expect(metadata.schemaOrgJSONLD[0]["@type"]).toBe("Organization");
		} else {
			expect(metadata.schemaOrgJSONLD["@type"]).toBe("Organization");
		}
	});

	it("adds custom favicons and icons", () => {
		const metadata = generateMetadata({
			customFavicons: [
				{ href: "/favicon.ico", rel: "icon", type: "image/x-icon" },
				{ href: "/icon.png", rel: "icon", type: "image/png" },
			],
			icons: [
				{ rel: "apple-touch-icon", href: "/apple.png", sizes: "180x180" },
			],
		});
		expect(metadata.customFavicons[0].href).toBe("/favicon.ico");
		expect(metadata.customFavicons[1].type).toBe("image/png");
		expect(metadata.icons[0].rel).toBe("apple-touch-icon");
	});

	it("adds authors, publisher and copyright", () => {
		const metadata = generateMetadata({
			authors: [{ name: "Author", url: "https://author.com" }],
			publisher: "Publisher",
			copyright: "2025",
		});
		expect(metadata.authors[0].name).toBe("Author");
		expect(metadata.publisher).toBe("Publisher");
		expect(metadata.copyright).toBe("2025");
	});
});
