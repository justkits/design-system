import { fireEvent, render, waitFor } from "@testing-library/react";

import { Popover } from "@/components/Popover";
import { TestComponent } from "./_setup";

describe("Popover - state", () => {
  it("supports uncontrolled mode", () => {
    const { getByTestId } = render(<TestComponent />);

    const content = getByTestId("popover-content");

    expect(content.dataset.state).toBe("closed");

    fireEvent.click(getByTestId("popover-trigger"));
    expect(content.dataset.state).toBe("open");
  });

  it("supports controlled mode with isOpen and onOpenChange", async () => {
    const onOpenChange = vi.fn();

    const { getByTestId, rerender } = render(
      <Popover isOpen={false} onOpenChange={onOpenChange}>
        <Popover.Trigger data-testid="trigger">Trigger</Popover.Trigger>
        <Popover.Content data-testid="content">
          <Popover.Close data-testid="close-button">Close</Popover.Close>
        </Popover.Content>
      </Popover>,
    );

    const content = getByTestId("content");
    expect(content.dataset.state).toBe("closed");

    fireEvent.click(getByTestId("trigger"));
    expect(onOpenChange).toHaveBeenCalledWith(true);

    rerender(
      <Popover isOpen={true} onOpenChange={onOpenChange}>
        <Popover.Trigger data-testid="trigger">Trigger</Popover.Trigger>
        <Popover.Content data-testid="content">
          <Popover.Close data-testid="close-button">Close</Popover.Close>
        </Popover.Content>
      </Popover>,
    );
    onOpenChange.mockClear();

    expect(content.dataset.state).toBe("open");

    fireEvent.click(getByTestId("close-button"));
    await waitFor(() => expect(onOpenChange).toHaveBeenCalledWith(false));
  });
});
