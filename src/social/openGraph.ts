// Functions for OpenGraph
import type { SEOOptions } from "../index";

export function getOpenGraphMeta(openGraph: SEOOptions["openGraph"]) {
	return openGraph || {};
}
