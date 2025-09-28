// Functions for security meta tags
import type { SEOOptions } from "../index";

export function getSecurityMetaTags(security: SEOOptions["security"]) {
	return security?.metaTags || [];
}
