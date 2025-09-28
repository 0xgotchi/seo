import { getSecurityMetaTags } from "../src/security/metaTags";

describe("Security MetaTags", () => {
	it("returns security metaTags", () => {
		const metaTags = getSecurityMetaTags({
			metaTags: [{ httpEquiv: "referrer", content: "no-referrer" }],
		});
		expect(metaTags[0].httpEquiv).toBe("referrer");
		expect(metaTags[0].content).toBe("no-referrer");
	});
});
