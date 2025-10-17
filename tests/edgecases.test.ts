import {
	generateDynamicNextMetadata,
	generateNextMetadata,
	generateStaticNextMetadata,
	type SEOConfig,
	validateSEOConfig,
} from "../src/index";

describe("Edge cases for SEO metadata", () => {
	test("titleTemplate as function should apply and handle exceptions", async () => {
		const options: SEOConfig = {
			title: "My Page",
			titleTemplate: (title?: string) => {
				if (!title) throw new Error("no title");
				return `${title} ~ Site`;
			},
			description: "desc",
		};

		const metadata = await generateNextMetadata(options);
		expect(metadata.title).toBe("My Page ~ Site");

		const optionsBad: SEOConfig = {
			title: "X",
			titleTemplate: (_title?: string) => {
				throw new Error("boom");
			},
			description: "desc",
		};
		const metadataBad = await generateNextMetadata(optionsBad);
		expect(metadataBad.title).toBe("X");
	});

	test("openGraph partial and empty arrays", async () => {
		const options: SEOConfig = {
			openGraph: {
				title: "OG",
				images: [],
				videos: undefined,
			},
		};
		const metadata = await generateNextMetadata(options);
		expect(metadata.openGraph).toBeDefined();
		expect(Array.isArray(metadata.openGraph?.images)).toBe(true);
		expect(metadata.openGraph?.images?.length).toBe(0);
	});

	test("dynamic metadata with complex params (arrays and missing keys)", async () => {
		const params: Record<string, string | string[]> = {
			slug: ["a", "b"],
			id: "123",
		};
		const options: SEOConfig = {
			title: "Page {slug}",
			description: "Description {id} {missing}",
		};
		const metadata = await generateDynamicNextMetadata(params, options);
		expect(metadata.title).toBe("Page a");
		expect(metadata.description).toBe("Description 123 {missing}");
	});

	test("validateSEOConfig returns warnings for missing optional groups", () => {
		const options: SEOConfig = {
			title: "T",
			description: "D",
		};
		const results = validateSEOConfig(options);
		expect(results.find((r) => r.field === "openGraph")).toBeDefined();
		expect(Array.isArray(results)).toBe(true);
	});

	test("generateStaticNextMetadata handles missing fields gracefully", () => {
		const metadata = generateStaticNextMetadata({} as SEOConfig);
		expect(metadata.title).toBe("Untitled Page");
	});
});
