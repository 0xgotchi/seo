// Integration with CMSs (WordPress, Contentful, etc)
export async function fetchWordPressPosts(apiUrl: string): Promise<unknown> {
	try {
		const res = await fetch(`${apiUrl}/wp-json/wp/v2/posts`);
		if (!res.ok)
			throw new Error(`Failed to fetch WordPress posts: ${res.status}`);
		return await res.json();
	} catch (error) {
		console.error("WordPress fetch error:", error);
		return null;
	}
}

export async function fetchContentfulEntries(
	spaceId: string,
	accessToken: string,
): Promise<unknown> {
	try {
		const res = await fetch(
			`https://cdn.contentful.com/spaces/${spaceId}/entries?access_token=${accessToken}`,
		);
		if (!res.ok)
			throw new Error(`Failed to fetch Contentful entries: ${res.status}`);
		return await res.json();
	} catch (error) {
		console.error("Contentful fetch error:", error);
		return null;
	}
}
