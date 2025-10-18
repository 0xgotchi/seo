/// <reference types="jest" />

import {
	generateDynamicNextMetadata,
	metadata,
	generateNextMetadata,
	generateStaticNextMetadata,
	type NextJSMetadata,
	type OGImage,
	type OpenGraphData,
	type SEOConfig,
	validateSEOConfig,
} from "../src/index";

function generateHeadHTML(metadata: NextJSMetadata): string {
	let html = "";
	if (metadata.title)
		html += `<title>${typeof metadata.title === "string" ? metadata.title : JSON.stringify(metadata.title)}</title>\n`;
	if (metadata.description)
		html += `<meta name="description" content="${metadata.description}">\n`;
	if (metadata.keywords)
		html += `<meta name="keywords" content="${Array.isArray(metadata.keywords) ? metadata.keywords.join(",") : metadata.keywords}">\n`;
	if (metadata.viewport)
		html += `<meta name="viewport" content="${metadata.viewport}">\n`;
	if (metadata.colorScheme)
		html += `<meta name="color-scheme" content="${metadata.colorScheme}">\n`;
	if (metadata.themeColor) {
		if (Array.isArray(metadata.themeColor)) {
			metadata.themeColor.forEach((tc: { color: string; media?: string }) => {
				html += `<meta name="theme-color" content="${tc.color}"${tc.media ? ` media="${tc.media}"` : ""}>\n`;
			});
		} else {
			html += `<meta name="theme-color" content="${metadata.themeColor}">\n`;
		}
	}
	if (metadata.manifest)
		html += `<link rel="manifest" href="${metadata.manifest}">\n`;
	if (metadata.icons)
		metadata.icons.forEach((icon) => {
			html += `<link rel="${icon.rel}" href="${icon.url}"${icon.sizes ? ` sizes="${icon.sizes}"` : ""}${icon.type ? ` type="${icon.type}"` : ""}>\n`;
		});
	if (metadata.openGraph) {
		const og = metadata.openGraph as OpenGraphData;
		(Object.entries(og) as Array<[string, unknown]>).forEach(([key, value]) => {
			if (key === "images" && Array.isArray(value)) {
				(value as OGImage[]).forEach((img) => {
					html += `<meta property="og:image" content="${img.url}">\n`;
					if (img.width)
						html += `<meta property="og:image:width" content="${img.width}">\n`;
					if (img.height)
						html += `<meta property="og:image:height" content="${img.height}">\n`;
					if (img.alt)
						html += `<meta property="og:image:alt" content="${img.alt}">\n`;
				});
			} else {
				html += `<meta property="og:${key}" content="${String(value)}">\n`;
			}
		});
	}
	if (metadata.twitter) {
		(Object.entries(metadata.twitter) as Array<[string, unknown]>).forEach(
			([key, value]) => {
				if (key === "images") {
					if (Array.isArray(value)) {
						(value as string[]).forEach((img) => {
							html += `<meta name="twitter:image" content="${img}">\n`;
						});
					} else {
						html += `<meta name="twitter:image" content="${String(value)}">\n`;
					}
				} else {
					html += `<meta name="twitter:${key}" content="${String(value)}">\n`;
				}
			},
		);
	}
	if (metadata.robots)
		html += `<meta name="robots" content="${typeof metadata.robots === "string" ? metadata.robots : JSON.stringify(metadata.robots)}">\n`;
	if (metadata.alternates) {
		if (metadata.alternates.canonical)
			html += `<link rel="canonical" href="${metadata.alternates.canonical}">\n`;
		if (metadata.alternates.languages) {
			Object.entries(metadata.alternates.languages).forEach(([lang, href]) => {
				html += `<link rel="alternate" href="${href}" hreflang="${lang}">\n`;
			});
		}
		if (Array.isArray(metadata.alternates.feeds)) {
			metadata.alternates.feeds.forEach(
				(feed: { type: string; href: string }) => {
					html += `<link rel="alternate" type="${feed.type}" href="${feed.href}">\n`;
				},
			);
		}
		if (Array.isArray(metadata.alternates.appLinks)) {
			metadata.alternates.appLinks.forEach(
				(app: { platform?: string; url?: string }) => {
					if (app.url)
						html += `<meta property="al:ios:url" content="${app.url}">\n`;
				},
			);
		}
		if (Array.isArray(metadata.alternates.media)) {
			metadata.alternates.media.forEach(
				(media: { media: string; href: string }) => {
					html += `<link rel="stylesheet" media="${media.media}" href="${media.href}">\n`;
				},
			);
		}
		if (Array.isArray(metadata.alternates.formats)) {
			metadata.alternates.formats.forEach(
				(format: { type: string; href: string }) => {
					html += `<link rel="alternate" type="${format.type}" href="${format.href}">\n`;
				},
			);
		}
		if (metadata.alternates.favicons) {
			metadata.alternates.favicons.forEach(
				(favicon: {
					rel: string;
					href: string;
					sizes?: string;
					type?: string;
				}) => {
					html += `<link rel="${favicon.rel}" href="${favicon.href}"${favicon.sizes ? ` sizes="${favicon.sizes}"` : ""}${favicon.type ? ` type="${favicon.type}"` : ""}>\n`;
				},
			);
		}
	}
	if (metadata.breadcrumbs) {
		html += `<script type="application/ld+json">${JSON.stringify({
			"@context": "https://schema.org",
			"@type": "BreadcrumbList",
			itemListElement: metadata.breadcrumbs.map(
				(b: { name: string; url?: string }, i: number) => ({
					"@type": "ListItem",
					position: i + 1,
					name: b.name,
					item: b.url,
				}),
			),
		})}</script>\n`;
	}
	if (metadata.structuredData) {
		metadata.structuredData.forEach((sd) => {
			html += `<script type="application/ld+json">${JSON.stringify(sd)}</script>\n`;
		});
	}
	if (metadata.customMeta) {
		metadata.customMeta.forEach((meta) => {
			if (meta.name)
				html += `<meta name="${meta.name}" content="${meta.content}">\n`;
			if (meta.property)
				html += `<meta property="${meta.property}" content="${meta.content}">\n`;
		});
	}
	if (metadata.pwa) {
		if (metadata.pwa.manifest)
			html += `<link rel="manifest" href="${metadata.pwa.manifest}">\n`;
		if (metadata.pwa.themeColor)
			html += `<meta name="theme-color" content="${metadata.pwa.themeColor}">\n`;
		if (metadata.pwa.appleStatusBarStyle)
			html += `<meta name="apple-mobile-web-app-status-bar-style" content="${metadata.pwa.appleStatusBarStyle}">\n`;
		if (metadata.pwa.appleMobileWebAppCapable)
			html += `<meta name="apple-mobile-web-app-capable" content="yes">\n`;
	}
	if (metadata.socialProfiles) {
		metadata.socialProfiles.forEach((profile) => {
			html += `<link rel="me" href="${profile.url}" title="${profile.network}">\n`;
		});
	}
	if (metadata.verification) {
		Object.entries(metadata.verification).forEach(([key, value]) => {
			html += `<meta name="${key}-site-verification" content="${String(value)}">\n`;
		});
	}
	if (metadata.authors) {
		metadata.authors.forEach((author) => {
			html += `<meta name="author" content="${author.name}${author.url ? ` (${author.url})` : ""}">\n`;
		});
	}
	if (metadata.publisher)
		html += `<meta name="publisher" content="${metadata.publisher}">\n`;
	if (metadata.formatDetection) {
		Object.entries(metadata.formatDetection).forEach(([key, value]) => {
			html += `<meta name="format-detection" content="${key}=${String(value)}">\n`;
		});
	}
	if (metadata.category)
		html += `<meta name="category" content="${metadata.category}">\n`;
	if (metadata.classification)
		html += `<meta name="classification" content="${String(metadata.classification)}">\n`;
	if (metadata.creator)
		html += `<meta name="creator" content="${String(metadata.creator)}">\n`;
	if (metadata.referrer)
		html += `<meta name="referrer" content="${String(metadata.referrer)}">\n`;
	if (metadata.itunes) {
		if (metadata.itunes.appId)
			html += `<meta name="apple-itunes-app" content="app-id=${metadata.itunes.appId}${metadata.itunes.appArgument ? `, app-argument=${metadata.itunes.appArgument}` : ""}">\n`;
	}
	if (metadata.archives) {
		metadata.archives.forEach((a) => {
			html += `<link rel="archives" href="${a}">\n`;
		});
	}
	if (metadata.assets) {
		metadata.assets.forEach((a) => {
			html += `<link rel="asset" href="${a}">\n`;
		});
	}
	if (metadata.bookmarks) {
		metadata.bookmarks.forEach((b) => {
			html += `<link rel="bookmark" href="${b}">\n`;
		});
	}
	if (metadata.hreflang) {
		metadata.hreflang.forEach((h) => {
			html += `<link rel="alternate" hreflang="${h.lang}" href="${h.href}">\n`;
		});
	}
	if (metadata.runtime)
		html += `<meta name="runtime" content="${metadata.runtime}">\n`;
	if (metadata.streaming)
		html += `<meta name="streaming" content="${JSON.stringify(metadata.streaming)}">\n`;
	if (metadata.experimental)
		html += `<meta name="experimental" content="${JSON.stringify(metadata.experimental)}">\n`;
	if (metadata.loading)
		html += `<meta name="loading" content="${JSON.stringify(metadata.loading)}">\n`;
	if (metadata.error)
		html += `<meta name="error" content="${JSON.stringify(metadata.error)}">\n`;
	if (metadata.bundleAnalysis)
		html += `<meta name="bundle-analysis" content="${JSON.stringify(metadata.bundleAnalysis)}">\n`;
	if (metadata.rspack)
		html += `<meta name="rspack" content="${JSON.stringify(metadata.rspack)}">\n`;
	if (metadata.webAssembly)
		html += `<meta name="web-assembly" content="${JSON.stringify(metadata.webAssembly)}">\n`;
	if (metadata.serviceWorker)
		html += `<meta name="service-worker" content="${JSON.stringify(metadata.serviceWorker)}">\n`;
	if (metadata.other) {
		Object.entries(metadata.other).forEach(([key, value]) => {
			html += `<meta name="${key}" content="${String(value)}">\n`;
		});
	}
	return html;
}

const baseOptions: SEOConfig = {
	title: "Test Title",
	defaultTitle: "Default Title",
	titleTemplate: "%s | Site",
	description: "Test description",
	keywords: ["seo", "test"],
	siteUrl: "https://example.com",
	openGraph: {
		title: "OG Title",
		description: "OG Description",
		url: "https://example.com/page",
		siteName: "Example Site",
		images: [
			{
				url: "https://example.com/image.jpg",
				width: 1200,
				height: 630,
				alt: "Image Alt",
			},
		],
		locale: "en_US",
		type: "article",
	},
	twitter: {
		card: "summary_large_image",
		title: "Twitter Title",
		description: "Twitter Description",
		creator: "@creator",
		site: "@site",
		images: "https://example.com/twitter.jpg",
	},
	robots: "index,follow",
	alternates: {
		canonical: "https://example.com/page",
		languages: { en: "https://example.com/en", pt: "https://example.com/pt" },
		favicons: [
			{
				rel: "icon",
				href: "/favicon.ico",
				sizes: "32x32",
				type: "image/x-icon",
			},
		],
		feeds: [{ type: "application/rss+xml", href: "/feed.xml" }],
		appLinks: [{ platform: "ios", url: "app://ios" }],
		media: [{ media: "screen", href: "/media.css" }],
		formats: [{ type: "application/pdf", href: "/file.pdf" }],
	},
	breadcrumbs: [
		{ name: "Home", url: "/" },
		{ name: "Page", url: "/page" },
	],
	structuredData: [{ "@type": "WebPage", name: "Test Page" }],
	customMeta: [
		{ name: "custom", content: "custom content" },
		{ property: "og:custom", content: "og custom" },
	],
	pwa: {
		manifest: "/manifest.json",
		themeColor: "#fff",
		appleStatusBarStyle: "black-translucent",
		appleMobileWebAppCapable: true,
	},
	socialProfiles: [{ network: "Twitter", url: "https://twitter.com/example" }],
	preloadAssets: [
		{
			href: "/font.woff2",
			as: "font",
			type: "font/woff2",
			crossorigin: "anonymous",
		},
	],
	verification: { google: "google-site-verification-code" },
	authors: [{ name: "Author", url: "https://example.com/author" }],
	publisher: "Example Publisher",
	metadataBase: "https://example.com",
	viewport: "width=device-width, initial-scale=1",
	formatDetection: { telephone: "no", email: "no" },
	category: "blog",
	classification: "general",
	creator: "Creator",
	referrer: "origin",
	colorScheme: "light dark",
	themeColor: [
		{ media: "(prefers-color-scheme: dark)", color: "#000" },
		{ media: "(prefers-color-scheme: light)", color: "#fff" },
	],
	manifest: "/manifest.json",
	itunes: { appId: "123", appArgument: "arg" },
	archives: ["/archive.zip"],
	assets: ["/asset.js"],
	bookmarks: ["/bookmark"],
	hreflang: [
		{ lang: "en", href: "https://example.com/en" },
		{ lang: "pt", href: "https://example.com/pt" },
	],
	runtime: "nodejs",
	streaming: { enabled: true, priority: "high" },
	experimental: { ppr: true, serverActions: true, turbopack: true },
	loading: { skeleton: true, suspense: true },
	error: { boundary: true, fallback: "/error" },
	bundleAnalysis: { enabled: true, chunks: ["main"] },
	rspack: { optimization: { minimize: true } },
	webAssembly: { enabled: true, modules: ["mod.wasm"] },
	serviceWorker: { enabled: true, cacheStrategy: "networkFirst" },
	other: { custom: "value" },
};

describe("SEO Metadata Generation", () => {
	describe("Advanced OpenGraph fields", () => {
		it("validates all advanced OpenGraph fields", async () => {
			const options: SEOConfig = {
				openGraph: {
					images: [{ url: "img.png", width: 100, height: 100, alt: "img" }],
					documents: [
						{ url: "doc.pdf", type: "application/pdf", title: "PDF" },
					],
					videos: [
						{
							url: "vid.mp4",
							width: 1920,
							height: 1080,
							type: "video/mp4",
							alt: "video",
							secure_url: "vid-secure.mp4",
						},
					],
					audios: [{ url: "audio.mp3", type: "audio/mp3", alt: "audio" }],
					event: {
						name: "Event",
						start_time: "2025-10-16",
						end_time: "2025-10-17",
						location: "Location",
						url: "event.com",
					},
					product: {
						name: "Product",
						price: "10.00",
						currency: "BRL",
						brand: "Brand",
						availability: "in stock",
						url: "prod.com",
					},
					latitude: -23.5,
					longitude: -46.6,
					article: {
						author: "Author",
						published_time: "2025-10-16",
						modified_time: "2025-10-17",
						section: "Sec",
						tag: ["tag1"],
					},
					profile: {
						first_name: "First",
						last_name: "Last",
						username: "user",
						gender: "male",
					},
					musicPlaylist: {
						creator: "DJ",
						song: [{ url: "song.mp3", title: "Song" }],
					},
					book: {
						author: "Writer",
						isbn: "123456789",
						release_date: "2025-10-16",
					},
					locale: "pt_BR",
					type: "article",
				},
			};
			const metadata = await generateNextMetadata(options);
			expect(metadata.openGraph?.images?.[0].url).toBe("img.png");
			expect(metadata.openGraph?.documents?.[0].url).toBe("doc.pdf");
			expect(metadata.openGraph?.videos?.[0].url).toBe("vid.mp4");
			expect(metadata.openGraph?.videos?.[0].secure_url).toBe("vid-secure.mp4");
			expect(metadata.openGraph?.audios?.[0].url).toBe("audio.mp3");
			expect(metadata.openGraph?.event?.name).toBe("Event");
			expect(metadata.openGraph?.product?.name).toBe("Product");
			expect(metadata.openGraph?.latitude).toBe(-23.5);
			expect(metadata.openGraph?.longitude).toBe(-46.6);
			expect(metadata.openGraph?.article?.author).toBe("Author");
			expect(metadata.openGraph?.profile?.username).toBe("user");
			expect(metadata.openGraph?.musicPlaylist?.creator).toBe("DJ");
			expect(metadata.openGraph?.musicPlaylist?.song?.[0].url).toBe("song.mp3");
			expect(metadata.openGraph?.book?.isbn).toBe("123456789");
			expect(metadata.openGraph?.locale).toBe("pt_BR");
			expect(metadata.openGraph?.type).toBe("article");
		});
	});
	describe("generateMetadataForNextJS15", () => {
		it("should generate complete metadata for NextJS15", async () => {
			const parent = Promise.resolve({
				openGraph: { images: [{ url: "https://parent.com/img.png" }] },
			});
			const metadata = await generateNextMetadata(baseOptions, parent);
			expect(metadata.title).toBe("Test Title | Site");
			expect(metadata.description).toBe("Test description");
			expect(metadata.keywords).toEqual(["seo", "test"]);
			expect(metadata.metadataBase).toBeInstanceOf(URL);
			expect(metadata.openGraph?.images).toEqual([
				{ url: "https://parent.com/img.png" },
				{
					url: "https://example.com/image.jpg",
					width: 1200,
					height: 630,
					alt: "Image Alt",
				},
			]);
			expect(metadata.twitter).toBeDefined();
			expect(metadata.robots).toBe("index,follow");
			expect(metadata.icons).toEqual([
				{
					rel: "icon",
					url: "/favicon.ico",
					sizes: "32x32",
					type: "image/x-icon",
				},
			]);
			expect(metadata.alternates).toBeDefined();
			expect(metadata.breadcrumbs).toEqual([
				{ name: "Home", url: "/" },
				{ name: "Page", url: "/page" },
			]);
			expect(metadata.structuredData).toEqual([
				{ "@type": "WebPage", name: "Test Page" },
			]);
			expect(metadata.customMeta).toEqual([
				{ name: "custom", content: "custom content" },
				{ property: "og:custom", content: "og custom" },
			]);
			expect(metadata.pwa).toBeDefined();
			expect(metadata.socialProfiles).toEqual([
				{ network: "Twitter", url: "https://twitter.com/example" },
			]);
			expect(metadata.verification).toEqual({
				google: "google-site-verification-code",
			});
			expect(metadata.authors).toEqual([
				{ name: "Author", url: "https://example.com/author" },
			]);
			expect(metadata.publisher).toBe("Example Publisher");
			expect(metadata.viewport).toBe("width=device-width, initial-scale=1");
			expect(metadata.formatDetection).toEqual({
				telephone: "no",
				email: "no",
			});
			expect(metadata.category).toBe("blog");
			expect(metadata.classification).toBe("general");
			expect(metadata.creator).toBe("Creator");
			expect(metadata.referrer).toBe("origin");
			expect(metadata.colorScheme).toBe("light dark");
			expect(metadata.themeColor).toEqual([
				{ media: "(prefers-color-scheme: dark)", color: "#000" },
				{ media: "(prefers-color-scheme: light)", color: "#fff" },
			]);
			expect(metadata.manifest).toBe("/manifest.json");
			expect(metadata.itunes).toEqual({ appId: "123", appArgument: "arg" });
			expect(metadata.archives).toEqual(["/archive.zip"]);
			expect(metadata.assets).toEqual(["/asset.js"]);
			expect(metadata.bookmarks).toEqual(["/bookmark"]);
		});

		it("should apply fallbacks for minimal options", async () => {
			const minimal: SEOConfig = {};
			const metadata = await generateNextMetadata(minimal);
			expect(metadata.title).toBe("Untitled Page");
			expect(metadata.description).toBe("Page description");
			expect(metadata.viewport).toBe("width=device-width, initial-scale=1");
			expect(metadata.colorScheme).toBe("light dark");
		});
	});

	describe("generateStaticMetadata", () => {
		it("should generate static metadata", () => {
			const metadata = generateStaticNextMetadata(baseOptions);
			expect(metadata.title).toBe("Test Title");
			expect(metadata.openGraph).toBeDefined();
			expect(metadata.twitter).toBeDefined();
			expect(metadata.robots).toBe("index,follow");
			expect(metadata.icons).toBeDefined();
			expect(metadata.alternates).toBeDefined();
			expect(metadata.breadcrumbs).toBeDefined();
			expect(metadata.structuredData).toBeDefined();
			expect(metadata.customMeta).toBeDefined();
			expect(metadata.pwa).toBeDefined();
			expect(metadata.socialProfiles).toBeDefined();
			expect(metadata.verification).toBeDefined();
			expect(metadata.authors).toBeDefined();
			expect(metadata.publisher).toBe("Example Publisher");
			expect(metadata.viewport).toBe("width=device-width, initial-scale=1");
		});

		it("should allow custom meta and generate HTML", () => {
			const options: SEOConfig = {
				...baseOptions,
				customMeta: [
					{ name: "viewport", content: "width=device-width, initial-scale=1" },
					{ property: "og:type", content: "website" },
				],
			};
			const metadata = generateStaticNextMetadata(options);
			expect(metadata.customMeta).toEqual([
				{ name: "viewport", content: "width=device-width, initial-scale=1" },
				{ property: "og:type", content: "website" },
			]);
			const html = metadata.customMeta
				?.map((meta) =>
					meta.name
						? `<meta name="${meta.name}" content="${meta.content}">`
						: `<meta property="${meta.property}" content="${meta.content}">`,
				)
				.join("\n");
			expect(html).toContain(
				'<meta name="viewport" content="width=device-width, initial-scale=1">',
			);
			expect(html).toContain('<meta property="og:type" content="website">');
		});
	});

	describe("generateLayoutMetadata", () => {
		it("should generate metadata for layout", () => {
			const metadataObj = metadata(baseOptions);
			expect(metadataObj.title).toEqual({
				template: "%s | Site",
				default: "Default Title",
			});
			expect(metadataObj.description).toBe("Test description");
			expect(metadataObj.openGraph).toBeDefined();
			expect(metadataObj.twitter).toBeDefined();
			expect(metadataObj.robots).toBe("index,follow");
			expect(metadataObj.icons).toBeDefined();
			expect(metadataObj.verification).toBeDefined();
			expect(metadataObj.authors).toBeDefined();
			expect(metadataObj.publisher).toBe("Example Publisher");
			expect(metadataObj.viewport).toBe("width=device-width, initial-scale=1");
		});
	});

	describe("generateDynamicMetadata", () => {
		it("should generate dynamic metadata with params", async () => {
			const params = { slug: "dynamic-page", lang: "en" };
			const options: SEOConfig = {
				...baseOptions,
				title: "Page {slug}",
				description: "Description for {slug} in {lang}",
			};
			const metadata = await generateDynamicNextMetadata(params, options);
			expect(metadata.title).toBe("Page dynamic-page");
			expect(metadata.description).toBe("Description for dynamic-page in en");
		});
	});

	describe("validateSEO", () => {
		it("should validate SEO and return errors/warnings", () => {
			const incomplete: SEOConfig = {};
			const results = validateSEOConfig(incomplete);
			expect(results).toEqual(
				expect.arrayContaining([
					expect.objectContaining({ type: "error", field: "title" }),
					expect.objectContaining({ type: "error", field: "description" }),
					expect.objectContaining({
						type: "warning",
						field: "alternates.canonical",
					}),
					expect.objectContaining({ type: "warning", field: "openGraph" }),
					expect.objectContaining({ type: "warning", field: "twitter" }),
					expect.objectContaining({ type: "warning", field: "robots" }),
					expect.objectContaining({ type: "warning", field: "structuredData" }),
					expect.objectContaining({ type: "warning", field: "breadcrumbs" }),
					expect.objectContaining({ type: "warning", field: "pwa" }),
					expect.objectContaining({ type: "warning", field: "socialProfiles" }),
				]),
			);
		});
	});

	describe("HTML Head Generation", () => {
		it("should generate complete head HTML with all fields and log it to the console", () => {
			const options: SEOConfig = {
				...baseOptions,
				customMeta: [
					{ name: "viewport", content: "width=device-width, initial-scale=1" },
					{ property: "og:type", content: "website" },
					{ name: "robots", content: "index,follow" },
				],
				alternates: {
					...baseOptions.alternates,
					favicons: [
						{
							rel: "icon",
							href: "/favicon.ico",
							sizes: "32x32",
							type: "image/x-icon",
						},
						{
							rel: "apple-touch-icon",
							href: "/apple-touch-icon.png",
							sizes: "180x180",
							type: "image/png",
						},
					],
				},
				hreflang: [
					{ lang: "en", href: "https://example.com/en" },
					{ lang: "pt", href: "https://example.com/pt" },
					{ lang: "es", href: "https://example.com/es" },
				],
				other: { custom: "value", extra: "extra-value" },
			};
			const metadata = generateStaticNextMetadata(options);
			const html = generateHeadHTML(metadata);
			console.log(
				`<!DOCTYPE html>\n<html>\n<head>\n${html}</head>\n<body>\n</body>\n</html>`,
			);

			expect(html).toContain(`<title>${metadata.title}</title>`);
			expect(html).toContain(
				`<meta name="description" content="${metadata.description}">`,
			);
			expect(html).toContain(
				`<meta name="keywords" content="${Array.isArray(metadata.keywords) ? metadata.keywords.join(",") : metadata.keywords}">`,
			);
			expect(html).toContain(
				`<meta name="viewport" content="${metadata.viewport}">`,
			);
			if (metadata.colorScheme) {
				expect(html).toContain(
					`<meta name="color-scheme" content="${metadata.colorScheme}">`,
				);
			}
			if (Array.isArray(metadata.themeColor)) {
				metadata.themeColor.forEach((tc) => {
					expect(html).toContain(
						`<meta name="theme-color" content="${tc.color}"${tc.media ? ` media="${tc.media}"` : ""}>`,
					);
				});
			} else if (metadata.themeColor !== undefined) {
				expect(html).toContain(
					`<meta name="theme-color" content="${metadata.themeColor}">`,
				);
			}
			expect(html).toContain(`<link rel="manifest" href="/manifest.json">`);
			if (metadata.icons) {
				metadata.icons.forEach((icon) => {
					expect(html).toContain(
						`<link rel="${icon.rel}" href="${icon.url}"${icon.sizes ? ` sizes="${icon.sizes}"` : ""}${icon.type ? ` type="${icon.type}"` : ""}>`,
					);
				});
			}
			if (metadata.alternates && Array.isArray(metadata.alternates.favicons)) {
				metadata.alternates.favicons.forEach((favicon) => {
					expect(html).toContain(
						`<link rel="${favicon.rel}" href="${favicon.href}"${favicon.sizes ? ` sizes="${favicon.sizes}"` : ""}${favicon.type ? ` type="${favicon.type}"` : ""}>`,
					);
				});
			}
			if (metadata.openGraph) {
				const og = metadata.openGraph as OpenGraphData;
				(Object.entries(og) as Array<[string, unknown]>).forEach(
					([key, value]) => {
						if (key === "images" && Array.isArray(value)) {
							(value as OGImage[]).forEach((img) => {
								expect(html).toContain(
									`<meta property="og:image" content="${img.url}">`,
								);
								if (img.width)
									expect(html).toContain(
										`<meta property="og:image:width" content="${img.width}">`,
									);
								if (img.height)
									expect(html).toContain(
										`<meta property="og:image:height" content="${img.height}">`,
									);
								if (img.alt)
									expect(html).toContain(
										`<meta property="og:image:alt" content="${img.alt}">`,
									);
							});
						} else {
							expect(html).toContain(
								`<meta property="og:${key}" content="${String(value)}">`,
							);
						}
					},
				);
			}
			if (metadata.twitter) {
				(Object.entries(metadata.twitter) as Array<[string, unknown]>).forEach(
					([key, value]) => {
						if (key === "images") {
							if (Array.isArray(value)) {
								(value as string[]).forEach((img) => {
									expect(html).toContain(
										`<meta name="twitter:image" content="${img}">`,
									);
								});
							} else {
								expect(html).toContain(
									`<meta name="twitter:image" content="${String(value)}">`,
								);
							}
						} else {
							expect(html).toContain(
								`<meta name="twitter:${key}" content="${String(value)}">`,
							);
						}
					},
				);
			}
			expect(html).toContain(`<meta name="robots" content="index,follow">`);
			if (metadata.alternates) {
				if (metadata.alternates.canonical) {
					expect(html).toContain(
						`<link rel="canonical" href="${metadata.alternates.canonical}">`,
					);
				}
				if (
					metadata.alternates.languages &&
					typeof metadata.alternates.languages === "object"
				) {
					Object.entries(metadata.alternates.languages).forEach(
						([lang, href]) => {
							expect(html).toContain(
								`<link rel="alternate" href="${href}" hreflang="${lang}">`,
							);
						},
					);
				}
				if (Array.isArray(metadata.alternates.feeds)) {
					metadata.alternates.feeds.forEach((feed) => {
						expect(html).toContain(
							`<link rel="alternate" type="${feed.type}" href="${feed.href}">`,
						);
					});
				}
				if (Array.isArray(metadata.alternates.appLinks)) {
					metadata.alternates.appLinks.forEach((app) => {
						expect(html).toContain(
							`<meta property="al:ios:url" content="${app.url}">`,
						);
					});
				}
				if (Array.isArray(metadata.alternates.media)) {
					metadata.alternates.media.forEach((media) => {
						expect(html).toContain(
							`<link rel="stylesheet" media="${media.media}" href="${media.href}">`,
						);
					});
				}
				if (Array.isArray(metadata.alternates.formats)) {
					metadata.alternates.formats.forEach((format) => {
						expect(html).toContain(
							`<link rel="alternate" type="${format.type}" href="${format.href}">`,
						);
					});
				}
			}
			if (metadata.breadcrumbs) {
				const breadcrumbJson = JSON.stringify({
					"@context": "https://schema.org",
					"@type": "BreadcrumbList",
					itemListElement: metadata.breadcrumbs.map((b, i) => ({
						"@type": "ListItem",
						position: i + 1,
						name: b.name,
						item: b.url,
					})),
				});
				expect(html).toContain(
					`<script type="application/ld+json">${breadcrumbJson}</script>`,
				);
			}
			if (metadata.structuredData) {
				metadata.structuredData.forEach((sd) => {
					expect(html).toContain(
						`<script type="application/ld+json">${JSON.stringify(sd)}</script>`,
					);
				});
			}
			if (metadata.customMeta) {
				metadata.customMeta.forEach((meta) => {
					if (meta.name)
						expect(html).toContain(
							`<meta name="${meta.name}" content="${meta.content}">`,
						);
					if (meta.property)
						expect(html).toContain(
							`<meta property="${meta.property}" content="${meta.content}">`,
						);
				});
			}
			if (metadata.pwa) {
				if (metadata.pwa.manifest)
					expect(html).toContain(
						`<link rel="manifest" href="${metadata.pwa.manifest}">`,
					);
				if (metadata.pwa.themeColor)
					expect(html).toContain(
						`<meta name="theme-color" content="${metadata.pwa.themeColor}">`,
					);
				if (metadata.pwa.appleStatusBarStyle)
					expect(html).toContain(
						`<meta name="apple-mobile-web-app-status-bar-style" content="${metadata.pwa.appleStatusBarStyle}">`,
					);
				if (metadata.pwa.appleMobileWebAppCapable)
					expect(html).toContain(
						`<meta name="apple-mobile-web-app-capable" content="yes">`,
					);
			}
			if (metadata.socialProfiles) {
				metadata.socialProfiles.forEach((profile) => {
					expect(html).toContain(
						`<link rel="me" href="${profile.url}" title="${profile.network}">`,
					);
				});
			}
			if (metadata.verification) {
				Object.entries(metadata.verification).forEach(([key, value]) => {
					expect(html).toContain(
						`<meta name="${key}-site-verification" content="${String(value)}">`,
					);
				});
			}
			if (metadata.authors) {
				metadata.authors.forEach((author) => {
					expect(html).toContain(
						`<meta name="author" content="${author.name}${author.url ? ` (${author.url})` : ""}">`,
					);
				});
			}
			expect(html).toContain(
				`<meta name="publisher" content="${metadata.publisher}">`,
			);
			if (metadata.formatDetection) {
				Object.entries(metadata.formatDetection).forEach(([key, value]) => {
					expect(html).toContain(
						`<meta name="format-detection" content="${key}=${String(value)}">`,
					);
				});
			}
			if (metadata.category !== undefined) {
				expect(html).toContain(
					`<meta name="category" content="${metadata.category}">`,
				);
			}
			if (
				typeof metadata.classification === "string" ||
				typeof metadata.classification === "number"
			) {
				expect(html).toContain(
					`<meta name="classification" content="${metadata.classification}">`,
				);
			}
			if (
				(typeof metadata.creator === "string" ||
					typeof metadata.creator === "number") &&
				metadata.creator != null
			) {
				expect(html).toContain(
					`<meta name="creator" content="${metadata.creator}">`,
				);
			}
			if (
				metadata.referrer !== undefined &&
				metadata.referrer !== null &&
				(typeof metadata.referrer === "string" ||
					typeof metadata.referrer === "number")
			) {
				expect(html).toContain(
					`<meta name="referrer" content="${metadata.referrer}">`,
				);
			}
			if (metadata.itunes?.appId)
				expect(html).toContain(
					`<meta name="apple-itunes-app" content="app-id=${metadata.itunes.appId}${metadata.itunes.appArgument ? `, app-argument=${metadata.itunes.appArgument}` : ""}">`,
				);
			if (Array.isArray(metadata.archives)) {
				metadata.archives.forEach((a) => {
					expect(html).toContain(`<link rel="archives" href="${a}">`);
				});
			}
			if (Array.isArray(metadata.assets)) {
				metadata.assets.forEach((a) => {
					expect(html).toContain(`<link rel="asset" href="${a}">`);
				});
			}
			if (Array.isArray(metadata.bookmarks)) {
				metadata.bookmarks.forEach((b) => {
					expect(html).toContain(`<link rel="bookmark" href="${b}">`);
				});
			}
			if (Array.isArray(metadata.hreflang)) {
				metadata.hreflang.forEach((h) => {
					expect(html).toContain(
						`<link rel="alternate" hreflang="${h.lang}" href="${h.href}">`,
					);
				});
			}
			if (metadata.runtime)
				expect(html).toContain(
					`<meta name="runtime" content="${metadata.runtime}">`,
				);
			if (metadata.streaming)
				expect(html).toContain(
					`<meta name="streaming" content="${JSON.stringify(metadata.streaming)}">`,
				);
			if (metadata.experimental)
				expect(html).toContain(
					`<meta name="experimental" content="${JSON.stringify(metadata.experimental)}">`,
				);
			if (metadata.loading)
				expect(html).toContain(
					`<meta name="loading" content="${JSON.stringify(metadata.loading)}">`,
				);
			if (metadata.error)
				expect(html).toContain(
					`<meta name="error" content="${JSON.stringify(metadata.error)}">`,
				);
			if (metadata.bundleAnalysis)
				expect(html).toContain(
					`<meta name="bundle-analysis" content="${JSON.stringify(metadata.bundleAnalysis)}">`,
				);
			if (metadata.rspack)
				expect(html).toContain(
					`<meta name="rspack" content="${JSON.stringify(metadata.rspack)}">`,
				);
			if (metadata.webAssembly)
				expect(html).toContain(
					`<meta name="web-assembly" content="${JSON.stringify(metadata.webAssembly)}">`,
				);
			if (metadata.serviceWorker)
				expect(html).toContain(
					`<meta name="service-worker" content="${JSON.stringify(metadata.serviceWorker)}">`,
				);
			if (metadata.other) {
				Object.entries(metadata.other).forEach(([key, value]) => {
					expect(html).toContain(
						`<meta name="${key}" content="${String(value)}">`,
					);
				});
			}
		});
	});
});