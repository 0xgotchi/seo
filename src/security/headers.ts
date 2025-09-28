// Functions for security headers
import type { SEOOptions } from "../index";

export function getSecurityHeaders(
	security: SEOOptions["advancedSecurityExtra"],
) {
	return security?.securityHeaders || {};
}
