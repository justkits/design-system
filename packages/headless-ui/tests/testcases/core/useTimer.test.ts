import { act, renderHook } from "@testing-library/react";

import { useTimer } from "@/core/timer/useTimer";
import { setupTimer } from "../_setup";

describe("useTimer - corner cases", () => {
  setupTimer();

  it("pauseTimer before the timer starts does not throw", () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useTimer(callback, 5000, false));

    expect(() => act(() => result.current.pauseTimer())).not.toThrow();
    expect(callback).not.toHaveBeenCalled();
  });

  it("calling pauseTimer twice does not corrupt remaining time", () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useTimer(callback, 5000, true));

    act(() => {
      vi.advanceTimersByTime(1000);
      result.current.pauseTimer();
    });

    // Second pause — timerRef is already null, startedAtRef is already null.
    // Without the guards on lines 31 and 35, remaining would be corrupted (NaN).
    act(() => {
      vi.advanceTimersByTime(1000);
      result.current.pauseTimer();
    });

    act(() => {
      result.current.resumeTimer();
      vi.advanceTimersByTime(3999);
    });
    expect(callback).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
