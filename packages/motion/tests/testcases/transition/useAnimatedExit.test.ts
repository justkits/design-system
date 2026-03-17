import { act, renderHook } from "@testing-library/react";

import { useAnimatedExit } from "@/transition/useAnimatedExit";

describe("useAnimatedExit", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("exiting starts as false", () => {
    const { result } = renderHook(() => useAnimatedExit(400));

    expect(result.current.exiting).toBe(false);
  });

  it("handles startClosing correctly", async () => {
    const onClose = vi.fn();
    const { result } = renderHook(() => useAnimatedExit(400, onClose));

    act(() => result.current.startClosing());
    expect(result.current.exiting).toBe(true);

    // 애니메이션이 끝나면 exiting이 false로 돌아오고, onClose가 호출되어야 한다.
    await act(async () => vi.advanceTimersByTime(400));
    expect(onClose).toHaveBeenCalledOnce();
    expect(result.current.exiting).toBe(false);
  });

  it("does not call onClose before duration has elapsed", () => {
    const onClose = vi.fn();
    const { result } = renderHook(() => useAnimatedExit(400, onClose));

    act(() => result.current.startClosing());
    act(() => vi.advanceTimersByTime(300));
    expect(onClose).not.toHaveBeenCalled();
  });

  it("ignores duplicate startClosing calls", () => {
    const onClose = vi.fn();
    const { result } = renderHook(() => useAnimatedExit(400, onClose));

    act(() => {
      result.current.startClosing();
      result.current.startClosing();
    });
    act(() => vi.advanceTimersByTime(400));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("respects preset duration string value", () => {
    const onClose = vi.fn();
    const { result } = renderHook(() => useAnimatedExit("fast", onClose));

    act(() => result.current.startClosing());
    act(() => vi.advanceTimersByTime(399));
    expect(onClose).not.toHaveBeenCalled();

    act(() => vi.advanceTimersByTime(1));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("respects reduced motion preference", async () => {
    vi.spyOn(globalThis.window, "matchMedia").mockImplementation(
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

    const onClose = vi.fn();
    const { result } = renderHook(() => useAnimatedExit(400, onClose));

    act(() => result.current.startClosing());
    // with reduced motion, duration collapses to 0ms — onClose fires immediately
    await act(async () => vi.advanceTimersByTime(1));
    expect(onClose).toHaveBeenCalledOnce();

    vi.restoreAllMocks();
  });
});
