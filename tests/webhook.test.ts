import { triggerWebhook } from "../src/seo/webhook";

describe("SEO Webhook", () => {
	it("simulates successful webhook trigger", async () => {
		global.fetch = jest.fn(() =>
			Promise.resolve({ ok: true, status: 200 }),
		) as jest.Mock;
		const response = await triggerWebhook("https://webhook.site", {
			event: "seo",
		});
		expect(response?.status).toBe(200);
	});
	it("simulates failed webhook trigger", async () => {
		global.fetch = jest.fn(() =>
			Promise.resolve({ ok: false, status: 500 }),
		) as jest.Mock;
		const response = await triggerWebhook("https://webhook.site", {
			event: "seo",
		});
		expect(response).toBeNull();
	});
});
