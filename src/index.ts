export type AsyncMetadata = Promise<{
	openGraph?: {
		images?: Array<{
			url: string | URL;
			width?: number;
			height?: number;
			alt?: string;
		}>;
		videos?: Array<{
			url: string | URL;
			width?: number;
			height?: number;
			type?: string;
			alt?: string;
		}>;
		audios?: Array<{
			url: string | URL;
			type?: string;
			alt?: string;
		}>;
	};
}>;

export interface OGImage {
	url: string | URL;
	width?: number;
	height?: number;
	alt?: string;
}

export interface OGVideo {
	url: string | URL;
	width?: number;
	height?: number;
	type?: string;
	alt?: string;
	secure_url?: string;
	duration?: number;
	release_date?: string;
}

export interface OGAudio {
	url: string | URL;
	type?: string;
	alt?: string;
	secure_url?: string;
}

export interface OGDocument {
	url: string | URL;
	type?: string;
	title?: string;
}

export interface OpenGraphData {
	title?: string;
	description?: string;
	url?: string;
	siteName?: string;
	images?: OGImage[];
	videos?: OGVideo[];
	audios?: OGAudio[];
	documents?: OGDocument[];
	event?: {
		name?: string;
		start_time?: string;
		end_time?: string;
		location?: string;
		url?: string;
	};
	product?: {
		name?: string;
		price?: string;
		currency?: string;
		brand?: string;
		availability?: string;
		url?: string;
	};
	latitude?: number;
	longitude?: number;
	article?: {
		author?: string;
		published_time?: string;
		modified_time?: string;
		section?: string;
		tag?: string[];
	};
	profile?: {
		first_name?: string;
		last_name?: string;
		username?: string;
		gender?: string;
	};
	musicPlaylist?: {
		creator?: string;
		song?: Array<{ url: string; title?: string }>;
	};
	book?: {
		author?: string;
		isbn?: string;
		release_date?: string;
	};
	locale?: string;
	locale_alternate?: string[];
	type?: string;
	fb_pages?: string[];
	fb_app_id?: string;
	pin_media?: string;
	pin_description?: string;
	linkedin_profile?: string;
	news_keywords?: string[];
	publication_date?: string;
	determiner?: string;
	accessibilityLabel?: string;
	accessibilityHint?: string;
	copyright?: string;
	license?: string;
	rating?: string;
	age_group?: string;
	estimated_reading_time?: string;
}

export interface AlternateLinks {
	canonical?: string;
	languages?: Record<string, string>;
	favicons?: Array<{
		rel: string;
		href: string;
		sizes?: string;
		type?: string;
	}>;
	feeds?: Array<{ type: string; href: string }>;
	appLinks?: Array<{ platform: string; url: string }>;
	media?: Array<{ media: string; href: string }>;
	formats?: Array<{ type: string; href: string }>;
	[key: string]: unknown;
}

export interface SEOConfig {
	title?: string;
	defaultTitle?: string;
	titleTemplate?: string | ((title?: string) => string);
	description?: string;
	keywords?: string[];
	siteUrl?: string;
	openGraph?: OpenGraphData;
	twitter?: {
		card?: "summary" | "summary_large_image" | "app" | "player";
		title?: string;
		description?: string;
		creator?: string;
		site?: string;
		images?: string | string[];
		player?: string;
		player_width?: number;
		player_height?: number;
	};
	robots?: string | Record<string, unknown>;
	alternates?: AlternateLinks;
	breadcrumbs?: Array<{ name: string; url?: string }>;
	structuredData?: Array<Record<string, unknown>>;
	schemaRecipe?: Record<string, unknown>;
	schemaFAQ?: Record<string, unknown>;
	schemaProduct?: Record<string, unknown>;
	schemaEvent?: Record<string, unknown>;
	schemaReview?: Record<string, unknown>;
	customMeta?: Array<{ name?: string; property?: string; content: string }>;
	pwa?: {
		manifest?: string;
		themeColor?: string;
		appleStatusBarStyle?: string;
		appleMobileWebAppCapable?: boolean;
	};
	socialProfiles?: Array<{ network: string; url: string }>;
	preloadAssets?: Array<{
		href: string;
		as?: string;
		type?: string;
		crossorigin?: string;
	}>;
	verification?: Record<string, unknown>;
	authors?: Array<{ name: string; url?: string }>;
	publisher?: string;
	metadataBase?: string;
	viewport?: string;
	formatDetection?: Record<string, unknown>;
	category?: string;
	classification?: string;
	creator?: string;
	referrer?:
		| "no-referrer"
		| "no-referrer-when-downgrade"
		| "origin"
		| "origin-when-cross-origin"
		| "same-origin"
		| "strict-origin"
		| "strict-origin-when-cross-origin"
		| "unsafe-url";
	colorScheme?:
		| "normal"
		| "light"
		| "dark"
		| "light dark"
		| "dark light"
		| "only light"
		| "only dark";
	themeColor?: string | Array<{ media?: string; color: string }>;
	manifest?: string;
	itunes?: {
		appId?: string;
		appArgument?: string;
	};
	archives?: string[];
	assets?: string[];
	bookmarks?: string[];
	hreflang?: Array<{ lang: string; href: string }>;
	runtime?: "edge" | "nodejs";
	streaming?: {
		enabled?: boolean;
		priority?: "high" | "normal" | "low";
	};
	experimental?: {
		ppr?: boolean;
		serverActions?: boolean;
		turbopack?: boolean;
	};
	loading?: {
		skeleton?: boolean;
		suspense?: boolean;
	};
	error?: {
		boundary?: boolean;
		fallback?: string;
	};
	bundleAnalysis?: {
		enabled?: boolean;
		chunks?: string[];
	};
	rspack?: {
		optimization?: Record<string, unknown>;
	};
	webAssembly?: {
		enabled?: boolean;
		modules?: string[];
	};
	serviceWorker?: {
		enabled?: boolean;
		cacheStrategy?: "networkFirst" | "cacheFirst" | "staleWhileRevalidate";
	};
	other?: Record<string, unknown>;
	[key: string]: unknown;
}

export interface NextJSMetadata {
	title?: string | { template?: string; default?: string };
	description?: string;
	keywords?: string | string[];
	metadataBase?: URL;
	openGraph?: OpenGraphData;
	twitter?: {
		card?: "summary" | "summary_large_image" | "app" | "player";
		title?: string;
		description?: string;
		creator?: string;
		site?: string;
		images?: string | string[];
		player?: string;
		player_width?: number;
		player_height?: number;
	};
	robots?: string | Record<string, unknown>;
	icons?: Array<{ rel: string; url: string; sizes?: string; type?: string }>;
	alternates?: AlternateLinks;
	breadcrumbs?: Array<{ name: string; url?: string }>;
	structuredData?: Array<Record<string, unknown>>;
	schemaRecipe?: Record<string, unknown>;
	schemaFAQ?: Record<string, unknown>;
	schemaProduct?: Record<string, unknown>;
	schemaEvent?: Record<string, unknown>;
	schemaReview?: Record<string, unknown>;
	customMeta?: Array<{ name?: string; property?: string; content: string }>;
	pwa?: {
		manifest?: string;
		themeColor?: string;
		appleStatusBarStyle?: string;
		appleMobileWebAppCapable?: boolean;
	};
	socialProfiles?: Array<{ network: string; url: string }>;
	preloadAssets?: Array<{
		href: string;
		as?: string;
		type?: string;
		crossorigin?: string;
	}>;
	verification?: Record<string, unknown>;
	authors?: Array<{ name: string; url?: string }>;
	publisher?: string;
	viewport?: string;
	formatDetection?: Record<string, unknown>;
	category?: string;
	classification?: string;
	creator?: string;
	referrer?: SEOConfig["referrer"];
	colorScheme?: SEOConfig["colorScheme"];
	themeColor?: SEOConfig["themeColor"];
	manifest?: string;
	itunes?: SEOConfig["itunes"];
	archives?: string[];
	assets?: string[];
	bookmarks?: string[];
	hreflang?: Array<{ lang: string; href: string }>;
	runtime?: SEOConfig["runtime"];
	streaming?: SEOConfig["streaming"];
	experimental?: SEOConfig["experimental"];
	loading?: SEOConfig["loading"];
	error?: SEOConfig["error"];
	bundleAnalysis?: SEOConfig["bundleAnalysis"];
	rspack?: SEOConfig["rspack"];
	webAssembly?: SEOConfig["webAssembly"];
	serviceWorker?: SEOConfig["serviceWorker"];
	other?: Record<string, unknown>;
}

function applyFallbacks(options: SEOConfig): SEOConfig {
	return {
		...options,
		title: options.title || options.defaultTitle || "Untitled Page",
		description: options.description || "Page description",
		viewport: options.viewport || "width=device-width, initial-scale=1",
		metadataBase: options.metadataBase ? options.metadataBase : undefined,
		colorScheme: options.colorScheme || "light dark",
	} as SEOConfig;
}

function normalizeFavicons(options: SEOConfig) {
	if (options.alternates && Array.isArray(options.alternates.favicons) && options.alternates.favicons.length > 0) {
		return options.alternates.favicons;
	}

	const altAny = options.alternates as any;
	if (altAny && altAny.favicon && altAny.favicon.href) {
		return [altAny.favicon];
	}

	const topAny = options as any;
	if (topAny && topAny.favicon && topAny.favicon.href) {
		return [topAny.favicon];
	}

	return undefined;
}

export async function generateNextMetadata(
	options: SEOConfig,
	parent?: AsyncMetadata,
): Promise<NextJSMetadata> {
	const config = applyFallbacks(options);
	const previous = parent ? await parent : undefined;
	const previousImages = previous?.openGraph?.images || [];

	const faviconArray = normalizeFavicons(config);
	const icons =
		faviconArray && Array.isArray(faviconArray)
			? faviconArray.map((icon) => ({
					rel: icon.rel,
					url: icon.href,
					sizes: icon.sizes,
					type: icon.type,
			  }))
			: undefined;

	const alternates =
		config.alternates && Object.keys(config.alternates).length > 0
			? {
					canonical: config.alternates.canonical,
					languages: config.alternates.languages,
					feeds: config.alternates.feeds,
					appLinks: config.alternates.appLinks,
					media: config.alternates.media,
					formats: config.alternates.formats,
			  }
			: config.hreflang && Array.isArray(config.hreflang)
				? {
						languages: config.hreflang.reduce(
							(acc: Record<string, string>, item) => {
								acc[item.lang] = item.href;
								return acc;
							},
							{} as Record<string, string>,
						),
					}
				: undefined;

	let resolvedTitle:
		| string
		| { template?: string; default?: string }
		| undefined;
	if (typeof config.title === "string") {
		if (typeof config.titleTemplate === "string") {
			resolvedTitle = config.titleTemplate.replace("%s", config.title);
		} else if (typeof config.titleTemplate === "function") {
			try {
				resolvedTitle = config.titleTemplate(config.title);
			} catch {
				resolvedTitle = config.title;
			}
		} else {
			resolvedTitle = config.title;
		}
	} else {
		resolvedTitle = {
			default: String(config.title || config.defaultTitle || "Default Title"),
		};
	}

	const openGraphCombined =
		config.openGraph || previous?.openGraph
			? {
					...(previous?.openGraph || {}),
					...(config.openGraph || {}),
					images: [
						...(previousImages || []),
						...(config.openGraph?.images || []),
					],
			  }
			: undefined;

	const twitterFromOG =
		openGraphCombined?.images && openGraphCombined.images.length > 0
			? openGraphCombined.images.map((img) => String(img.url))
			: undefined;

	const twitterValue = config.twitter
		? {
				...(config.twitter as Record<string, unknown>),
				images:
					(config.twitter as any).images ?? twitterFromOG,
		  }
		: twitterFromOG
		? { images: twitterFromOG }
		: undefined;

	const metadata: NextJSMetadata = {
		title: resolvedTitle,
		description: config.description,
		keywords: config.keywords,
		metadataBase: config.metadataBase
			? new URL(config.metadataBase)
			: undefined,
		openGraph: openGraphCombined,
		twitter: twitterValue as NextJSMetadata["twitter"],
		robots: config.robots as string | Record<string, unknown>,
		icons,
		alternates,
		breadcrumbs: config.breadcrumbs,
		structuredData: config.structuredData,
		customMeta: config.customMeta,
		pwa: config.pwa,
		socialProfiles: config.socialProfiles,
		verification: config.verification,
		authors: config.authors,
		publisher: config.publisher,
		viewport: config.viewport || "width=device-width, initial-scale=1",
		formatDetection: config.formatDetection,
		category: config.category,
		classification: config.classification,
		creator: config.creator,
		referrer: config.referrer,
		colorScheme: config.colorScheme,
		themeColor: config.themeColor,
		manifest: config.manifest,
		itunes: config.itunes,
		archives: config.archives,
		assets: config.assets,
		bookmarks: config.bookmarks,
		hreflang: config.hreflang,
		runtime: config.runtime,
		streaming: config.streaming,
		experimental: config.experimental,
		loading: config.loading,
		error: config.error,
		bundleAnalysis: config.bundleAnalysis,
		rspack: config.rspack,
		webAssembly: config.webAssembly,
		serviceWorker: config.serviceWorker,
		other: config.other,
	};

	return Object.fromEntries(
		Object.entries(metadata).filter(([, value]) => value !== undefined),
	) as NextJSMetadata;
}

export function generateStaticNextMetadata(options: SEOConfig): NextJSMetadata {
	const config = applyFallbacks(options);

	const faviconArray = normalizeFavicons(config);
	const icons =
		faviconArray && Array.isArray(faviconArray)
			? faviconArray.map((icon) => ({
					rel: icon.rel,
					url: icon.href,
					sizes: icon.sizes,
					type: icon.type,
			  }))
			: undefined;

	const alternates =
		config.alternates && Object.keys(config.alternates).length > 0
			? {
					canonical: config.alternates.canonical,
					languages: config.alternates.languages,
					feeds: config.alternates.feeds,
					appLinks: config.alternates.appLinks,
					media: config.alternates.media,
					formats: config.alternates.formats,
				}
			: undefined;

	const openGraphObj = config.openGraph
		? {
				...config.openGraph,
				type: config.openGraph.type || "website",
		  }
		: undefined;

	const twitterFromOGStatic =
		openGraphObj?.images && openGraphObj.images.length > 0
			? openGraphObj.images.map((img) => String(img.url))
			: undefined;

	const twitterStatic = config.twitter
		? {
				...(config.twitter as Record<string, unknown>),
				images: (config.twitter as any).images ?? twitterFromOGStatic,
		  }
		: twitterFromOGStatic
		? { images: twitterFromOGStatic }
		: undefined;

	const metadata: NextJSMetadata = {
		title: config.title,
		description: config.description,
		keywords: config.keywords,
		metadataBase: config.metadataBase
			? new URL(config.metadataBase)
			: undefined,
		openGraph: openGraphObj,
		twitter: twitterStatic as NextJSMetadata["twitter"],
		robots: config.robots as string | Record<string, unknown>,
		icons,
		alternates,
		breadcrumbs: config.breadcrumbs,
		structuredData: config.structuredData,
		customMeta: config.customMeta,
		pwa: config.pwa,
		socialProfiles: config.socialProfiles,
		verification: config.verification,
		authors: config.authors,
		publisher: config.publisher,
		viewport: config.viewport || "width=device-width, initial-scale=1",
		themeColor: config.themeColor,
	};

	return Object.fromEntries(
		Object.entries(metadata).filter(([, value]) => value !== undefined),
	) as NextJSMetadata;
}

export function metadata(options: SEOConfig): NextJSMetadata {
	const faviconArray = normalizeFavicons(options);
	const icons =
		faviconArray && Array.isArray(faviconArray)
			? faviconArray.map((icon) => ({
					rel: icon.rel,
					url: icon.href,
					sizes: icon.sizes,
					type: icon.type,
			  }))
			: undefined;

	const titleValue: NextJSMetadata["title"] =
		typeof options.titleTemplate === "string"
			? {
					template: options.titleTemplate,
					default: options.defaultTitle || options.title || "Default Title",
				}
			: {
					template:
						typeof options.titleTemplate === "function"
							? undefined
							: `%s | ${options.defaultTitle}`,
					default: options.defaultTitle || options.title || "Default Title",
				};

	const openGraphObj = options.openGraph;

	const twitterFromOGLay =
		openGraphObj?.images && openGraphObj.images.length > 0
			? openGraphObj.images.map((img) => String(img.url))
			: undefined;

	const twitterValue = options.twitter
		? {
				...(options.twitter as Record<string, unknown>),
				images: (options.twitter as any).images ?? twitterFromOGLay,
		  }
		: twitterFromOGLay
		? { images: twitterFromOGLay }
		: undefined;

	const metadata: NextJSMetadata = {
		title: titleValue,
		description: options.description,
		keywords: options.keywords,
		metadataBase: options.metadataBase
			? new URL(options.metadataBase)
			: undefined,
		openGraph: openGraphObj,
		twitter: twitterValue as NextJSMetadata["twitter"],
		robots: options.robots,
		icons,
		verification: options.verification,
		authors: options.authors,
		publisher: options.publisher,
		viewport: options.viewport || "width=device-width, initial-scale=1",
		themeColor: options.themeColor,
		alternates: options.alternates,
		breadcrumbs: options.breadcrumbs,
		structuredData: options.structuredData,
		customMeta: options.customMeta,
		pwa: options.pwa,
		socialProfiles: options.socialProfiles,
	};

	return Object.fromEntries(
		Object.entries(metadata).filter(([, value]) => value !== undefined),
	) as NextJSMetadata;
}

export const generateLayoutNextMetadata = metadata;

export async function generateDynamicNextMetadata(
	params: { [key: string]: string | string[] },
	options: SEOConfig,
): Promise<NextJSMetadata> {
	const dynamicTitle = options.title?.replace(
		/\{(\w+)\}/g,
		(_match: string, key: string) =>
			Array.isArray(params[key])
				? (params[key] as string[])[0]
				: (params[key] as string) || _match,
	);

	const dynamicDescription = options.description?.replace(
		/\{(\w+)\}/g,
		(_match: string, key: string) =>
			Array.isArray(params[key])
				? (params[key] as string[])[0]
				: (params[key] as string) || _match,
	);

	return generateStaticNextMetadata({
		...options,
		title: dynamicTitle,
		description: dynamicDescription,
	});
}

interface SEOValidationResult {
	type: "error" | "warning";
	field: string;
	message: string;
}

export function validateSEOConfig(options: SEOConfig): SEOValidationResult[] {
	const results: SEOValidationResult[] = [];

	if (!options.title) {
		results.push({
			type: "error",
			field: "title",
			message: 'The "title" field is required for SEO.',
		});
	}

	if (!options.description) {
		results.push({
			type: "error",
			field: "description",
			message: 'The "description" field is required for SEO.',
		});
	}

	if (!options.alternates?.canonical) {
		results.push({
			type: "warning",
			field: "alternates.canonical",
			message:
				"It is recommended to define a canonical URL in alternates.canonical.",
		});
	}

	if (!options.openGraph) {
		results.push({
			type: "warning",
			field: "openGraph",
			message: "Consider adding openGraph for better social sharing.",
		});
	} else {
		const og = options.openGraph;
		if (!og.images || og.images.length === 0) {
			results.push({
				type: "warning",
				field: "openGraph.images",
				message: "Add at least one image for OpenGraph.",
			});
		}
		if (!og.documents || og.documents.length === 0) {
			results.push({
				type: "warning",
				field: "openGraph.documents",
				message: "Add documents (PDF, etc) for OpenGraph.",
			});
		}
		if (!og.videos || og.videos.length === 0) {
			results.push({
				type: "warning",
				field: "openGraph.videos",
				message: "Add videos for OpenGraph.",
			});
		}
		if (!og.audios || og.audios.length === 0) {
			results.push({
				type: "warning",
				field: "openGraph.audios",
				message: "Add audios for OpenGraph.",
			});
		}
		if (!og.event) {
			results.push({
				type: "warning",
				field: "openGraph.event",
				message: "Add event info for OpenGraph.",
			});
		}
		if (!og.product) {
			results.push({
				type: "warning",
				field: "openGraph.product",
				message: "Add product info for OpenGraph.",
			});
		}
		if (typeof og.latitude !== "number" || typeof og.longitude !== "number") {
			results.push({
				type: "warning",
				field: "openGraph.location",
				message: "Add latitude and longitude for OpenGraph.",
			});
		}
		if (!og.article) {
			results.push({
				type: "warning",
				field: "openGraph.article",
				message: "Add article info for OpenGraph.",
			});
		}
		if (!og.profile) {
			results.push({
				type: "warning",
				field: "openGraph.profile",
				message: "Add profile info for OpenGraph.",
			});
		}
		if (!og.musicPlaylist) {
			results.push({
				type: "warning",
				field: "openGraph.musicPlaylist",
				message: "Add music playlist info for OpenGraph.",
			});
		}
		if (!og.book) {
			results.push({
				type: "warning",
				field: "openGraph.book",
				message: "Add book info for OpenGraph.",
			});
		}
	}

	if (!options.twitter) {
		results.push({
			type: "warning",
			field: "twitter",
			message: "Consider adding twitter for social cards.",
		});
	}

	if (!options.robots) {
		results.push({
			type: "warning",
			field: "robots",
			message: "Consider defining robots rules for indexing control.",
		});
	}

	if (!options.structuredData) {
		results.push({
			type: "warning",
			field: "structuredData",
			message: "Add structuredData for advanced SEO and rich snippets.",
		});
	}

	if (!options.breadcrumbs) {
		results.push({
			type: "warning",
			field: "breadcrumbs",
			message: "Add breadcrumbs for improved navigation and SEO.",
		});
	}

	if (!options.pwa) {
		results.push({
			type: "warning",
			field: "pwa",
			message: "Consider configuring pwa for mobile/progressive optimization.",
		});
	}

	if (!options.socialProfiles) {
		results.push({
			type: "warning",
			field: "socialProfiles",
			message: "Add socialProfiles to link social profiles in Schema.org.",
		});
	}

	return results;
}