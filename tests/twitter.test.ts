import { getTwitterMeta } from "../src/social/twitter";

describe("Twitter Cards", () => {
	it("returns Twitter metadata", () => {
		const tw = getTwitterMeta({ card: "summary", site: "@site" });
		expect(tw.card).toBe("summary");
	});
});
