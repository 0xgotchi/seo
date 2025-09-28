// Function for lazy loading and image optimization
export function getOptimizedImage(
	src: string,
	alt: string,
	lazy: boolean = true,
): string {
	return `<img src="${src}" alt="${alt}" loading="${lazy ? "lazy" : "eager"}">`;
}
