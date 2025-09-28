import { getThemeMetaTags } from "../src/seo/theme";

describe("SEO Theme", () => {
	it("generates meta tags for auto theme", () => {
		const tags = getThemeMetaTags("auto", "#fff");
		expect(tags).toContain("color-scheme");
		expect(tags).toContain("theme-color");
	});
});
