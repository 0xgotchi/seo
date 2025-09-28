import { logDebug } from "../src/logger";

describe("Logger", () => {
	it("should log messages in development environment", () => {
		const spy = jest.spyOn(console, "debug").mockImplementation(() => {});
		process.env.NODE_ENV = "development";
		logDebug("Test message", 123);
		expect(spy).toHaveBeenCalledWith("[SEO Toolkit]", "Test message", 123);
		spy.mockRestore();
	});

	it("should not log in production", () => {
		const spy = jest.spyOn(console, "debug").mockImplementation(() => {});
		process.env.NODE_ENV = "production";
		logDebug("Production message");
		expect(spy).not.toHaveBeenCalled();
		spy.mockRestore();
	});
});
