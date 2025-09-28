// Functions for Twitter Cards
import type { SEOOptions } from "../index";

export function getTwitterMeta(twitter: SEOOptions["twitter"]) {
	return twitter || {};
}
