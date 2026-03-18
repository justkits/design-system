import { resolveDuration, resolveTiming } from "@/loop/lib";
import { loop } from "@/loop/loop";

describe("loop", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("returns correct style for looping animation with default options", () => {
    const style = loop({ name: "rotate-cw" });

    expect(style).toHaveProperty("animationName", "rotate-cw");
    expect(style).toHaveProperty("animationDuration", "800ms");
    expect(style).toHaveProperty("animationTimingFunction", "linear");
    expect(style).toHaveProperty("animationDelay", "100ms");
    expect(style).toHaveProperty("animationIterationCount", "infinite");
    expect(style).toHaveProperty("animationFillMode", "both");
  });

  it("returns correct style for looping animation with custom options", () => {
    const style = loop({
      name: "bounce",
      easing: "ease-in-out",
      duration: "slow",
      iterations: 3,
      delay: "medium",
    });

    expect(style).toHaveProperty("animationName", "bounce");
    expect(style).toHaveProperty("animationDuration", "3300ms");
    expect(style).toHaveProperty("animationTimingFunction", "ease-in-out");
    expect(style).toHaveProperty("animationDelay", "300ms");
    expect(style).toHaveProperty("animationIterationCount", 3);
    expect(style).toHaveProperty("animationFillMode", "both");
  });

  it("returns empty style when isLooping is false", () => {
    const style = loop({ name: "swing", isLooping: false });
    expect(style).toEqual({});
  });

  it("returns empty style when reduced motion is preferred", () => {
    vi.spyOn(globalThis.window, "matchMedia").mockImplementationOnce(
      (query: string) =>
        ({
          matches: true,
          media: query,
          onchange: null,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        }) as unknown as MediaQueryList,
    );

    const style = loop({ name: "rotate-cw" });
    expect(style).toEqual({});
  });

  it("handles numeric duration with no scale for rotate animations", () => {
    const style = loop({ name: "rotate-cw", duration: 1200 });
    expect(style).toHaveProperty("animationDuration", "1200ms");
  });

  it("gracefully handles invalid iteration values", () => {
    const consoleWarnSpy = vi
      .spyOn(console, "warn")
      .mockImplementation(() => {});

    const style = loop({
      name: "rotate-cw",
      iterations: -1,
    });

    expect(style).toHaveProperty("animationIterationCount", "infinite");
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'Invalid iteration value for animation "rotate-cw". Defaulting to "infinite".',
    );
  });

  it("doesn't warn if environment is production (invalid iteration)", () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "production";
    const consoleWarnSpy = vi
      .spyOn(console, "warn")
      .mockImplementation(() => {});

    const style = loop({
      name: "rotate-cw",
      iterations: -1,
    });

    expect(style).toHaveProperty("animationIterationCount", "infinite");
    expect(consoleWarnSpy).not.toHaveBeenCalled();

    process.env.NODE_ENV = originalEnv;
  });

  it("warns when iteration value of 1 is used", () => {
    const consoleWarnSpy = vi
      .spyOn(console, "warn")
      .mockImplementation(() => {});

    const style = loop({
      name: "bounce",
      iterations: 1,
    });

    expect(style).toHaveProperty("animationIterationCount", 1);
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'Iteration value of 1 for animation "bounce" will not loop. Consider using a value greater than 1 or switch to a non-looping animation.',
    );
  });

  it("doesn't warn when iteration value of 1 is used in production", () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "production";
    const consoleWarnSpy = vi
      .spyOn(console, "warn")
      .mockImplementation(() => {});

    const style = loop({
      name: "bounce",
      iterations: 1,
    });

    expect(style).toHaveProperty("animationIterationCount", 1);
    expect(consoleWarnSpy).not.toHaveBeenCalled();

    process.env.NODE_ENV = originalEnv;
  });
});

describe("resolveDuration", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("returns correct bounce durations", () => {
    expect(resolveDuration("bounce", "fast")).toBe(1980);
    expect(resolveDuration("bounce", "normal")).toBe(2640);
    expect(resolveDuration("bounce", "slow")).toBe(3300);
    expect(resolveDuration("bounce", 500)).toBe(1650);
  });

  it("returns correct swing durations", () => {
    expect(resolveDuration("swing", "fast")).toBe(1980);
    expect(resolveDuration("swing", "normal")).toBe(2640);
    expect(resolveDuration("swing", "slow")).toBe(3300);
    expect(resolveDuration("swing", 1500)).toBe(4950);
  });

  it("returns correct durations for other animations", () => {
    expect(resolveDuration("rotate-cw", "fast")).toBe(600);
    expect(resolveDuration("rotate-cw", "normal")).toBe(800);
    expect(resolveDuration("rotate-ccw", "slow")).toBe(1000);
    expect(resolveDuration("rotate-ccw", 700)).toBe(700);
  });

  it("warns in dev when a negative numeric duration is used", () => {
    const consoleWarnSpy = vi
      .spyOn(console, "warn")
      .mockImplementation(() => {});

    expect(resolveDuration("rotate-cw", -200)).toBe(-200);
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "Invalid duration value: -200. Duration must be a non-negative number.",
    );
  });

  it("does not warn in production when a negative numeric duration is used", () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "production";
    const consoleWarnSpy = vi
      .spyOn(console, "warn")
      .mockImplementation(() => {});

    expect(resolveDuration("rotate-cw", -200)).toBe(-200);
    expect(consoleWarnSpy).not.toHaveBeenCalled();

    process.env.NODE_ENV = originalEnv;
  });
});

describe("resolveTiming", () => {
  it("returns correct timing function for animations without custom easing", () => {
    expect(resolveTiming("rotate-cw", undefined)).toBe("linear");
    expect(resolveTiming("rotate-ccw", undefined)).toBe("linear");
    expect(resolveTiming("bounce", undefined)).toBe(
      "cubic-bezier(0.4, 0, 0.2, 1)",
    );
    expect(resolveTiming("swing", undefined)).toBe(
      "cubic-bezier(0.4, 0, 0.2, 1)",
    );
  });

  it("returns correct timing function for animations with custom easing", () => {
    expect(resolveTiming("swing", "ease-in-out")).toBe("ease-in-out");
  });
});
