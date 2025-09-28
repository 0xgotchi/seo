import { applyFallbacks } from "../src/seo/fallback";

describe("SEO Fallbacks", () => {
	it("applies fallback for title and description", () => {
		const result = applyFallbacks({});
		expect(result.title).toBe("Default Title");
		expect(result.description).toBe("Default Description");
	});
});
