import { getFromCache, setToCache, clearCache } from "../src/cache";

describe("Cache SSR", () => {
	it("should store and retrieve values", () => {
		setToCache("key", "value");
		expect(getFromCache("key")).toBe("value");
	});

	it("should clear the cache", () => {
		setToCache("key2", "value2");
		clearCache();
		expect(getFromCache("key2")).toBeUndefined();
	});
});
