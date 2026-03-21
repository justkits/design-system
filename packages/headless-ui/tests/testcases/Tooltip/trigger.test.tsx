import { act, fireEvent, render } from "@testing-library/react";

import { ControlledComponent } from "./_setup";

describe("Tooltip - trigger cornercases", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("handles controlled open state correctly", () => {
    const { getByTestId, getByText } = render(<ControlledComponent />);

    const trigger = getByTestId("tooltip-trigger");
    fireEvent.mouseEnter(trigger);
    act(() => vi.advanceTimersByTime(300));

    const tooltip = getByText("툴팁 메시지");

    expect(trigger.getAttribute("aria-describedby")).toBe(tooltip.id);
  });
});
