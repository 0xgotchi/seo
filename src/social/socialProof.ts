// Functions for social proof
import type { SEOOptions } from "../index";

export function getSocialProofMeta(socialProof: SEOOptions["socialProof"]) {
	return socialProof || {};
}
