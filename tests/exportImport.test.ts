import { exportSEOConfig, importSEOConfig } from "../src/seo/exportImport";
import basicSEO from "../examples/basic-config";
import mediumSEO from "../examples/medium-config";
import advancedSEO from "../examples/advanced-config";

describe("Export/Import SEO", () => {
	it("should export basic SEO config as JSON string", () => {
		const json = exportSEOConfig(basicSEO);
		expect(json).toContain("My Website");
		expect(json).toContain("Welcome to my website.");
	});
	it("should export medium SEO config as JSON string", () => {
		const json = exportSEOConfig(mediumSEO);
		expect(json).toContain("My Portfolio");
		expect(json).toContain("Showcasing my work and skills.");
	});
	it("should export advanced SEO config as JSON string", () => {
		const json = exportSEOConfig(advancedSEO);
		expect(json).toContain("Advanced Site");
		expect(json).toContain("A site with full SEO features.");
	});
	it("should import basic SEO config from JSON string", () => {
		const json = exportSEOConfig(basicSEO);
		const config = importSEOConfig(json);
		expect(config.title).toBe("My Website");
		expect(config.description).toBe("Welcome to my website.");
	});
	it("should handle invalid JSON gracefully", () => {
		const config = importSEOConfig("invalid-json");
		expect(config).toEqual({});
	});
});
