import { act, renderHook } from "@testing-library/react";

import { prefersReducedMotion, useReducedMotion } from "@/utils/reduced-motion";

describe("prefersReducedMotion", () => {
  it("returns false when window is not defined", () => {
    vi.stubGlobal("window", undefined);
    expect(prefersReducedMotion()).toBe(false);
    vi.unstubAllGlobals();
  });

  it("returns true when the media query matches", () => {
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

    expect(prefersReducedMotion()).toBe(true);
    vi.restoreAllMocks();
  });

  it("returns false when the media query does not match", () => {
    vi.spyOn(globalThis.window, "matchMedia").mockImplementationOnce(
      (query: string) =>
        ({
          matches: false,
          media: query,
          onchange: null,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        }) as unknown as MediaQueryList,
    );

    expect(prefersReducedMotion()).toBe(false);
    vi.restoreAllMocks();
  });
});

describe("useReducedMotion", () => {
  it("updates state when the media query change event fires", () => {
    let capturedHandler: ((e: MediaQueryListEvent) => void) | null = null;
    let capturedCleanup: (() => void) | null = null;

    vi.spyOn(globalThis.window, "matchMedia").mockImplementation(
      (query: string) =>
        ({
          matches: false,
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn().mockImplementation((event, handler) => {
            if (event === "change") capturedHandler = handler;
          }),
          removeEventListener: vi.fn().mockImplementation((event, handler) => {
            if (event === "change") capturedCleanup = handler;
          }),
          dispatchEvent: vi.fn(),
        }) as unknown as MediaQueryList,
    );

    const { result, unmount } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);

    act(() => {
      capturedHandler?.({ matches: true } as MediaQueryListEvent);
    });
    expect(result.current).toBe(true);

    unmount();
    expect(capturedCleanup).not.toBeNull();

    vi.restoreAllMocks();
  });
});
