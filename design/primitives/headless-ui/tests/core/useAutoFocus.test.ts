import { renderHook } from "@testing-library/react";

import { useAutoFocus } from "@/core/keyboard/useAutoFocus";

describe("useAutoFocus - corner cases", () => {
  it("handles no returnRef given", () => {
    const trigger = document.createElement("button");
    const target = document.createElement("div");
    target.tabIndex = -1;
    document.body.appendChild(trigger);
    document.body.appendChild(target);

    // Simulate the element that should receive returned focus
    trigger.focus();
    const targetRef = { current: target };

    const { rerender, unmount } = renderHook(
      ({ enabled }: { enabled: boolean }) => useAutoFocus(targetRef, enabled),
      { initialProps: { enabled: false } },
    );

    // Enable auto-focus — focus should move to targetRef
    rerender({ enabled: true });
    expect(document.activeElement).toBe(target);

    // Disable auto-focus — focus should return to the previously active element (trigger)
    rerender({ enabled: false });
    expect(document.activeElement).toBe(trigger);

    unmount();
    trigger.remove();
    target.remove();
  });
});
