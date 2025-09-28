// Support for visual themes in tags (dynamic dark/light mode)
export function getThemeMetaTags(
	theme: "dark" | "light" | "auto",
	color: string,
): string {
	if (theme === "auto") {
		return `<meta name="color-scheme" content="dark light">
<meta name="theme-color" content="${color}">`;
	}
	return `<meta name="color-scheme" content="${theme}">
<meta name="theme-color" content="${color}">`;
}
