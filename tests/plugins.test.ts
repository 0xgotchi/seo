import { registerPlugin, applyPlugins } from "../src/plugins";
import type { SEOOptions } from "../src/index";

describe("Plugins", () => {
	it("should apply registered plugins", () => {
		const plugin = (options: SEOOptions) => ({
			title: `${options.title || ""} - Plugin`,
		});
		registerPlugin(plugin);
		const result = applyPlugins({ title: "Test" });
		expect(result.title).toBe("Test - Plugin");
	});
});
