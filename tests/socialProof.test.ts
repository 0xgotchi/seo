import { getSocialProofMeta } from "../src/social/socialProof";

describe("Social Proof", () => {
	it("returns reviews correctly", () => {
		const sp = getSocialProofMeta({
			reviews: [
				{ author: "User", rating: 5, text: "Great!" },
				{ author: "Client", rating: 4 },
			],
		});
		expect(sp.reviews).toBeDefined();
		expect(sp.reviews?.[0].author).toBe("User");
		expect(sp.reviews?.[0].rating).toBe(5);
		expect(sp.reviews?.[0].text).toBe("Great!");
		expect(sp.reviews?.[1].author).toBe("Client");
		expect(sp.reviews?.[1].rating).toBe(4);
	});

	it("returns trustBadges correctly", () => {
		const sp = getSocialProofMeta({ trustBadges: ["badge1", "badge2"] });
		expect(sp.trustBadges).toBeDefined();
		expect(sp.trustBadges).toContain("badge1");
		expect(sp.trustBadges).toContain("badge2");
	});

	it("returns testimonials correctly", () => {
		const sp = getSocialProofMeta({
			testimonials: [{ author: "User", text: "Great service!" }],
		});
		expect(sp.testimonials).toBeDefined();
		expect(sp.testimonials?.[0].author).toBe("User");
		expect(sp.testimonials?.[0].text).toBe("Great service!");
	});
});
