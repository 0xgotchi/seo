// Support for webhooks for SEO events
export function triggerWebhook(
	url: string,
	payload: Record<string, unknown>,
): Promise<Response | null> {
	return fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	})
		.then((res) => {
			if (!res.ok) throw new Error(`Webhook failed: ${res.status}`);
			return res;
		})
		.catch((error) => {
			console.error("Webhook error:", error);
			return null;
		});
}
