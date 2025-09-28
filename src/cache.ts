// Simple cache for SSR tag generation
const cache = new Map<string, unknown>();

export function getFromCache(key: string) {
	return cache.get(key);
}

export function setToCache(key: string, value: unknown) {
	cache.set(key, value);
}

export function clearCache() {
	cache.clear();
}
