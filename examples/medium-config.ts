import type { SEOOptions } from "../src";

// Medium SEO configuration example
const mediumSEO: SEOOptions = {
	title: "My Portfolio",
	description: "Showcasing my work and skills.",
	keywords: ["portfolio", "developer", "projects"],
	openGraph: {
		title: "My Portfolio",
		description: "Showcasing my work and skills.",
		url: "https://myportfolio.com",
		images: [{ url: "https://myportfolio.com/og-image.jpg" }],
	},
	twitter: {
		card: "summary_large_image",
		site: "@mytwitter",
	},
	canonical: "https://myportfolio.com",
};

export default mediumSEO;
