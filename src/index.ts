// SSR-first SEO Toolkit for Next.js App Router

export interface SEOOptions {
	title?: string;
	defaultTitle?: string;
	titleTemplate?: string | ((title?: string) => string);
	description?: string;
	keywords?: string[];
	openGraph?: Record<string, unknown>;
	twitter?: Record<string, unknown>;
	robots?: string | Record<string, unknown>;
	jsonLd?: Array<Record<string, unknown>>;
	schemaOrgJSONLD?: Record<string, unknown> | Array<Record<string, unknown>>;
	alternates?: Record<string, unknown>;
	preload?: string[];
	preloadAssets?: Array<{
		href: string;
		as?: string;
		type?: string;
		crossorigin?: string;
	}>;
	preconnect?: string[];
	meta?: Record<string, string>;
	additionalMetaTags?: Array<{
		name?: string;
		property?: string;
		content: string;
	}>;
	link?: Record<string, string>;
	additionalLinkTags?: Array<{
		rel: string;
		href: string;
		type?: string;
		sizes?: string;
	}>;
	appleWebApp?: Record<string, unknown>;
	favicon?: string;
	customFavicons?: Array<{
		href: string;
		rel?: string;
		type?: string;
		sizes?: string;
	}>;
	icons?: Array<{ rel: string; href: string; sizes?: string; type?: string }>;
	verification?: Record<string, unknown>;
	authors?: Array<{ name: string; url?: string }>;
	publisher?: string;
	copyright?: string;
	security?: {
		contentSecurityPolicy?: string;
		xFrameOptions?: string;
		xContentTypeOptions?: string;
		referrerPolicy?: string;
		metaTags?: Array<{ httpEquiv: string; content: string }>;
	};
	canonical?: string;
	hreflang?: Array<{ href: string; lang: string }>;
	accessibility?: {
		aria?: Record<string, string>;
		lang?: string;
	};
	sitemap?: {
		enabled?: boolean;
		urls?: Array<string>;
	};
	robotsTxt?: {
		enabled?: boolean;
		rules?: Array<string>;
	};
	pwa?: {
		enabled?: boolean;
		manifest?: Record<string, unknown>;
		meta?: Record<string, string>;
	};
	social?: {
		facebook?: Record<string, unknown>;
		linkedin?: Record<string, unknown>;
		pinterest?: Record<string, unknown>;
		appId?: string;
		pages?: string;
	};
	amp?: {
		enabled?: boolean;
		meta?: Record<string, string>;
	};
	media?: {
		video?: Array<Record<string, unknown>>;
		audio?: Array<Record<string, unknown>>;
		image?: Array<Record<string, unknown>>;
	};
	structuredData?: {
		faq?: Array<Record<string, unknown>>;
		howTo?: Array<Record<string, unknown>>;
		event?: Array<Record<string, unknown>>;
	};
	analytics?: {
		googleAnalytics?: string;
		matomo?: string;
		others?: Array<string>;
	};
	consent?: {
		cookie?: boolean;
		privacyPolicyUrl?: string;
	};
	web3?: {
		walletConnect?: boolean;
		blockchainMetadata?: Record<string, unknown>;
	};
	localSeo?: {
		geo?: {
			latitude?: number;
			longitude?: number;
			address?: string;
			city?: string;
			region?: string;
			country?: string;
			postalCode?: string;
			openingHours?: string;
		};
	};
	performance?: {
		webVitals?: boolean;
		sentry?: boolean;
		others?: Array<string>;
	};
	advancedAccessibility?: {
		schema?: Record<string, unknown>;
		screenReader?: boolean;
	};
	theme?: {
		darkMode?: boolean;
		lightMode?: boolean;
		dynamic?: boolean;
		themeColor?: Array<{ media: string; color: string }> | string;
	};
	pushNotifications?: {
		enabled?: boolean;
		serviceWorker?: string;
	};
	hybridApp?: {
		cordova?: boolean;
		capacitor?: boolean;
		meta?: Record<string, unknown>;
	};
	conversionTracking?: {
		facebookPixel?: string;
		googleAds?: string;
		others?: Array<string>;
	};
	marketplace?: {
		amazon?: Record<string, unknown>;
		mercadoLivre?: Record<string, unknown>;
		others?: Array<Record<string, unknown>>;
	};
	reviews?: {
		rating?: number;
		count?: number;
		source?: string;
	};
	podcast?: {
		title?: string;
		url?: string;
		episode?: string;
		author?: string;
	};
	book?: {
		title?: string;
		author?: string;
		isbn?: string;
		url?: string;
	};
	course?: {
		title?: string;
		provider?: string;
		url?: string;
	};
	voiceAssistant?: {
		alexa?: boolean;
		googleAssistant?: boolean;
		meta?: Record<string, unknown>;
	};
	socialAccessibility?: {
		dynamicAlt?: boolean;
		imageDescription?: string;
	};
	advancedPrivacy?: {
		optOut?: boolean;
		gdpr?: boolean;
		lgpd?: boolean;
		meta?: Record<string, unknown>;
	};
	ai?: {
		generativePrompts?: Array<string>;
		contentContext?: string;
		aiCopyright?: string;
	};
	nft?: {
		enabled?: boolean;
		collection?: string;
		tokenId?: string;
		metadata?: Record<string, unknown>;
	};
	gamification?: {
		achievements?: Array<string>;
		leaderboards?: Array<{ name: string; score: number }>;
	};
	reputation?: {
		trustpilot?: string;
		reclameAqui?: string;
		others?: Array<string>;
	};
	offlineTracking?: {
		qrCode?: string;
		nfc?: string;
	};
	cognitiveAccessibility?: {
		easyRead?: boolean;
		autoTranslate?: boolean;
	};
	sustainability?: {
		carbonFootprint?: string;
		renewableEnergy?: boolean;
	};
	advancedSecurity?: {
		mfa?: boolean;
		biometrics?: boolean;
	};
	payment?: {
		applePay?: boolean;
		googlePay?: boolean;
		pix?: boolean;
		others?: Array<string>;
	};
	governance?: {
		compliance?: Array<string>;
		audit?: boolean;
	};
	education?: {
		moodle?: string;
		coursera?: string;
		others?: Array<string>;
	};
	digitalHealth?: {
		medicalRecord?: string;
		telemedicine?: boolean;
	};
	logistics?: {
		deliveryTracking?: string;
		orderStatus?: string;
	};
	crowdsourcing?: {
		voting?: boolean;
		userSuggestions?: boolean;
	};
	streaming?: {
		twitch?: string;
		youtubeLive?: string;
		others?: Array<string>;
	};
	pagination?: { next?: string; prev?: string };
	metadataBase?: URL | string;
	viewport?: string;
	formatDetection?: {
		telephone?: boolean;
		date?: boolean;
		email?: boolean;
		address?: boolean;
	};
	appleWebAppStatusBarStyle?: "default" | "black" | "black-translucent";
	// Melhorias técnicas
	modules?: Array<string>;
	generateSitemap?: boolean;
	generateRobotsTxt?: boolean;
	devWarnings?: boolean;
	ciCdIntegration?: boolean;
	seoMonitoring?: {
		enabled?: boolean;
		apiKey?: string;
		provider?: string;
	};
	seoReport?: {
		autoExport?: boolean;
		format?: "pdf" | "json" | "csv";
		destination?: string;
	};
	// Recursos inovadores
	webStories?: {
		enabled?: boolean;
		structuredData?: Record<string, unknown>;
	};
	interactiveMedia?: {
		podcast?: {
			player?: string;
			chapters?: Array<{ title: string; start: string }>;
			transcript?: string;
		};
		video?: {
			player?: string;
			chapters?: Array<{ title: string; start: string }>;
			transcript?: string;
		};
	};
	gamificationExtra?: {
		badges?: Array<string>;
		ranking?: Array<{ user: string; score: number }>;
		achievements?: Array<string>;
	};
	aiExtra?: {
		generatedContent?: boolean;
		transparency?: string;
		copyright?: string;
	};
	sustainabilityAdvanced?: {
		ecoLabels?: Array<string>;
		practices?: Array<string>;
	};
	accessibilityAdvanced?: {
		voiceNavigation?: boolean;
		dynamicContrast?: boolean;
		accessibilityPolicyUrl?: string;
	};
	privacyGranular?: {
		categories?: Array<"analytics" | "marketing" | "functional" | "social">;
		consentByCategory?: boolean;
	};
	marketplaceIntegration?: {
		googleShopping?: Record<string, unknown>;
		amazon?: Record<string, unknown>;
		mercadoLivre?: Record<string, unknown>;
	};
	socialCommerce?: {
		instagramShop?: string;
		facebookShop?: string;
		tiktokShop?: string;
	};
	// Melhorias e recursos extras
	validate?: boolean;
	presets?: "blog" | "product" | "institutional" | "event" | "custom";
	i18n?: {
		defaultLocale?: string;
		locales?: Record<string, Partial<SEOOptions>>;
	};
	accessibilityStatement?: {
		url?: string;
		description?: string;
	};
	consentManagement?: {
		system?: string;
		policyUrl?: string;
		categories?: Array<string>;
	};
	appLinks?: {
		android?: Array<{ url: string; package?: string }>;
		ios?: Array<{ url: string; appStoreId?: string }>;
	};
	socialProof?: {
		reviews?: Array<{ author: string; rating: number; text?: string }>;
		testimonials?: Array<{ author: string; text: string }>;
		trustBadges?: Array<string>;
	};
	liveEvents?: {
		type?: "webinar" | "livestream" | "event";
		url?: string;
		startTime?: string;
		endTime?: string;
		description?: string;
	};
	visualResources?: {
		images?: Array<{
			src: string;
			alt?: string;
			srcset?: string;
			sizes?: string;
			lazy?: boolean;
		}>;
	};
	cognitiveAccessibilityExtra?: {
		easyRead?: boolean;
		autoTranslate?: boolean;
		summary?: string;
	};
	sustainabilityExtra?: {
		carbonFootprint?: string;
		renewableEnergy?: boolean;
		sustainabilityPolicyUrl?: string;
	};
	advancedSecurityExtra?: {
		dynamicCSP?: string;
		securityHeaders?: Record<string, string>;
	};
	documentation?: {
		autoGenerate?: boolean;
		examples?: Array<string>;
	};
	hooks?: {
		useSEO?: boolean;
		useMetadata?: boolean;
	};
	frameworkCompatibility?: {
		nuxt?: boolean;
		svelteKit?: boolean;
		others?: Array<string>;
	};
}

export function generateMetadata(options: SEOOptions) {
	// Função base para gerar metadados SEO
	return {
		title: options.title || "",
		defaultTitle: options.defaultTitle || "",
		titleTemplate: options.titleTemplate || "",
		description: options.description || "",
		keywords: options.keywords || [],
		openGraph: options.openGraph || {},
		twitter: options.twitter || {},
		robots: options.robots || "",
		jsonLd: options.jsonLd || [],
		schemaOrgJSONLD: options.schemaOrgJSONLD || {},
		alternates: options.alternates || {},
		preload: options.preload || [],
		preloadAssets: options.preloadAssets || [],
		preconnect: options.preconnect || [],
		meta: {
			charset: "utf-8",
			viewport: "width=device-width, initial-scale=1",
			themeColor: "#ffffff",
			...options.meta,
		},
		additionalMetaTags: options.additionalMetaTags || [],
		link: {
			canonical: options.canonical || "",
			favicon: options.favicon || "",
			...options.link,
		},
		additionalLinkTags: options.additionalLinkTags || [],
		appleWebApp: options.appleWebApp || {},
		customFavicons: options.customFavicons || [],
		icons: options.icons || [],
		verification: options.verification || {},
		authors: options.authors || [],
		publisher: options.publisher || "",
		copyright: options.copyright || "",
		security: options.security || {},
		hreflang: options.hreflang || [],
		accessibility: options.accessibility || {},
		sitemap: options.sitemap || {},
		robotsTxt: options.robotsTxt || {},
		pwa: options.pwa || {},
		social: options.social || {},
		amp: options.amp || {},
		media: options.media || {},
		structuredData: options.structuredData || {},
		analytics: options.analytics || {},
		consent: options.consent || {},
		web3: options.web3 || {},
		localSeo: options.localSeo || {},
		performance: options.performance || {},
		advancedAccessibility: options.advancedAccessibility || {},
		theme: options.theme || {},
		appleWebAppStatusBarStyle: options.appleWebAppStatusBarStyle || "default",
		pushNotifications: options.pushNotifications || {},
		hybridApp: options.hybridApp || {},
		conversionTracking: options.conversionTracking || {},
		marketplace: options.marketplace || {},
		reviews: options.reviews || {},
		podcast: options.podcast || {},
		book: options.book || {},
		course: options.course || {},
		voiceAssistant: options.voiceAssistant || {},
		socialAccessibility: options.socialAccessibility || {},
		advancedPrivacy: options.advancedPrivacy || {},
		ai: options.ai || {},
		nft: options.nft || {},
		gamification: options.gamification || {},
		reputation: options.reputation || {},
		offlineTracking: options.offlineTracking || {},
		cognitiveAccessibility: options.cognitiveAccessibility || {},
		sustainability: options.sustainability || {},
		advancedSecurity: options.advancedSecurity || {},
		payment: options.payment || {},
		governance: options.governance || {},
		education: options.education || {},
		digitalHealth: options.digitalHealth || {},
		logistics: options.logistics || {},
		crowdsourcing: options.crowdsourcing || {},
		streaming: options.streaming || {},
		pagination: options.pagination || {},
		metadataBase: options.metadataBase || "",
		viewport: options.viewport || "width=device-width, initial-scale=1",
		formatDetection: options.formatDetection || {},
		modules: options.modules || [],
		generateSitemap: options.generateSitemap ?? false,
		generateRobotsTxt: options.generateRobotsTxt ?? false,
		devWarnings: options.devWarnings ?? false,
		ciCdIntegration: options.ciCdIntegration ?? false,
		seoMonitoring: options.seoMonitoring || {},
		seoReport: options.seoReport || {},
		webStories: options.webStories || {},
		interactiveMedia: options.interactiveMedia || {},
		gamificationExtra: options.gamificationExtra || {},
		aiExtra: options.aiExtra || {},
		sustainabilityAdvanced: options.sustainabilityAdvanced || {},
		accessibilityAdvanced: options.accessibilityAdvanced || {},
		privacyGranular: options.privacyGranular || {},
		marketplaceIntegration: options.marketplaceIntegration || {},
		socialCommerce: options.socialCommerce || {},
		validate: options.validate ?? false,
		presets: options.presets ?? "custom",
		i18n: options.i18n || {},
		accessibilityStatement: options.accessibilityStatement || {},
		consentManagement: options.consentManagement || {},
		appLinks: options.appLinks || {},
		socialProof: options.socialProof || {},
		liveEvents: options.liveEvents || {},
		visualResources: options.visualResources || {},
		cognitiveAccessibilityExtra: options.cognitiveAccessibilityExtra || {},
		sustainabilityExtra: options.sustainabilityExtra || {},
		advancedSecurityExtra: options.advancedSecurityExtra || {},
		documentation: options.documentation || {},
		hooks: options.hooks || {},
		frameworkCompatibility: options.frameworkCompatibility || {},
	};
}
