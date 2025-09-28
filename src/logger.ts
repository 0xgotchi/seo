// Detailed logger for debugging
export function logDebug(message: string, ...args: unknown[]) {
	if (process.env.NODE_ENV !== "production") {
		console.debug("[SEO Toolkit]", message, ...args);
	}
}
