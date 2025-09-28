import { getSecurityHeaders } from "../src/security/headers";

describe("Security Headers", () => {
	it("returns security headers", () => {
		const headers = getSecurityHeaders({
			securityHeaders: { "X-Frame-Options": "DENY" },
		});
		expect(headers["X-Frame-Options"]).toBe("DENY");
	});
});
