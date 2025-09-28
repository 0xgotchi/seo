import type { SEOOptions } from "../src";

// Advanced SEO configuration example using all features
const advancedSEO: SEOOptions = {
	title: "Advanced Site",
	description: "A site with full SEO features.",
	keywords: ["advanced", "seo", "features"],
	openGraph: {
		title: "Advanced Site",
		description: "A site with full SEO features.",
		url: "https://advancedsite.com",
		images: [{ url: "https://advancedsite.com/og-image.jpg" }],
	},
	twitter: {
		card: "summary_large_image",
		site: "@advancedsite",
	},
	canonical: "https://advancedsite.com",
	alternates: {
		en: "https://advancedsite.com/en",
		es: "https://advancedsite.com/es",
	},
	robots: "index, follow",
	jsonLd: [
		{
			"@context": "https://schema.org",
			"@type": "WebSite",
			name: "Advanced Site",
			url: "https://advancedsite.com",
		},
	],
	schemaOrgJSONLD: {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: "Advanced Site Inc.",
		url: "https://advancedsite.com",
	},
	preloadAssets: [
		{
			href: "/fonts/main.woff2",
			as: "font",
			type: "font/woff2",
			crossorigin: "anonymous",
		},
	],
	meta: {
		viewport: "width=device-width, initial-scale=1",
	},
	additionalMetaTags: [
		{ name: "theme-color", content: "#3366ff" },
		{ property: "og:type", content: "website" },
	],
	additionalLinkTags: [
		{ rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
		{
			rel: "apple-touch-icon",
			href: "/apple-touch-icon.png",
			sizes: "180x180",
		},
	],
	appleWebApp: {
		capable: true,
		title: "Advanced Site",
		statusBarStyle: "default",
	},
	customFavicons: [
		{ href: "/favicon.ico", rel: "icon", type: "image/x-icon" },
		{
			href: "/apple-touch-icon.png",
			rel: "apple-touch-icon",
			sizes: "180x180",
		},
	],
	icons: [
		{ rel: "icon", href: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
	],
	verification: {
		google: "google-site-verification-code",
		bing: "bing-site-verification-code",
	},
	authors: [
		{ name: "Jane Doe", url: "https://janedoe.com" },
		{ name: "John Smith" },
	],
	publisher: "Advanced Site Inc.",
	copyright: "© 2025 Advanced Site Inc.",
	security: {
		contentSecurityPolicy: "default-src 'self'",
		xFrameOptions: "DENY",
		xContentTypeOptions: "nosniff",
		referrerPolicy: "strict-origin",
		metaTags: [
			{ httpEquiv: "Content-Security-Policy", content: "default-src 'self'" },
			{ httpEquiv: "X-Frame-Options", content: "DENY" },
		],
	},
	hreflang: [
		{ href: "https://advancedsite.com/en", lang: "en" },
		{ href: "https://advancedsite.com/es", lang: "es" },
	],
	accessibility: {
		aria: { label: "Main Content" },
		lang: "en",
	},
	sitemap: {
		enabled: true,
		urls: [
			"https://advancedsite.com",
			"https://advancedsite.com/en",
			"https://advancedsite.com/es",
		],
	},
	robotsTxt: {
		enabled: true,
		rules: ["User-agent: *", "Disallow: /private"],
	},
	pwa: {
		enabled: true,
		manifest: { name: "Advanced Site", short_name: "AdvSite" },
		meta: { theme_color: "#3366ff" },
	},
	social: {
		facebook: { appId: "1234567890" },
		linkedin: { page: "advancedsite" },
		pinterest: { page: "advancedsite" },
		appId: "1234567890",
		pages: "advancedsite",
	},
	amp: {
		enabled: true,
		meta: { charset: "utf-8" },
	},
	media: {
		video: [{ url: "https://advancedsite.com/video.mp4" }],
		audio: [{ url: "https://advancedsite.com/audio.mp3" }],
		image: [{ url: "https://advancedsite.com/image.jpg" }],
	},
	structuredData: {
		faq: [
			{
				question: "What is Advanced Site?",
				answer: "A site with full SEO features.",
			},
		],
		howTo: [{ name: "How to use Advanced Site", steps: ["Step 1", "Step 2"] }],
		event: [{ name: "Launch Event", startDate: "2025-10-01" }],
	},
	analytics: {
		googleAnalytics: "UA-12345678-1",
		matomo: "https://matomo.advancedsite.com",
		others: ["custom-analytics"],
	},
	consent: {
		cookie: true,
		privacyPolicyUrl: "https://advancedsite.com/privacy",
	},
	web3: {
		walletConnect: true,
		blockchainMetadata: { chain: "Ethereum" },
	},
};

export default advancedSEO;
