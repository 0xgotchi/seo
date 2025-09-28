import { getOptimizedImage } from "../src/seo/image";

describe("Image Optimization", () => {
	it("generates optimized img tag", () => {
		const img = getOptimizedImage("/img.png", "alt", true);
		expect(img).toContain('loading="lazy"');
	});
});
