import { getOpenGraphMeta } from "../src/social/openGraph";

describe("OpenGraph", () => {
	it("returns OpenGraph metadata", () => {
		const og = getOpenGraphMeta({ title: "OG", url: "https://site.com" });
		expect(og.title).toBe("OG");
	});
});
