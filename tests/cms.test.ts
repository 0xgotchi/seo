import { fetchWordPressPosts, fetchContentfulEntries } from "../src/seo/cms";

describe("CMS", () => {
	it("simulates fetch of WordPress posts", async () => {
		global.fetch = jest.fn(() =>
			Promise.resolve({ ok: true, json: () => Promise.resolve([{ id: 1 }]) }),
		) as jest.Mock;
		const posts = await fetchWordPressPosts("https://site.com");
		expect(Array.isArray(posts)).toBe(true);
	});

	it("simulates fetch of Contentful entries", async () => {
		global.fetch = jest.fn(() =>
			Promise.resolve({ ok: true, json: () => Promise.resolve({ items: [] }) }),
		) as jest.Mock;
		const entries = (await fetchContentfulEntries("space", "token")) as {
			items: unknown[];
		};
		expect(entries?.items).toBeDefined();
	});
});
