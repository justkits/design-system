import { fireEvent, render } from "@testing-library/react";

import { Toast } from "@/Toast";
import { TestComponent } from "./_setup";

describe("Toast - state", () => {
  it("supports uncontrolled mode", () => {
    const { getByTestId, queryByTestId } = render(<TestComponent />);

    expect(queryByTestId("toast-content")).toBeNull();

    fireEvent.click(getByTestId("toast-trigger"));
    expect(getByTestId("toast-content")).toBeTruthy();
  });

  it("supports controlled mode with isOpen and onOpenChange", () => {
    const onOpenChange = vi.fn();

    const { getByTestId, queryByTestId, rerender } = render(
      <Toast isOpen={false} onOpenChange={onOpenChange}>
        <Toast.Trigger data-testid="trigger">Trigger</Toast.Trigger>
        <Toast.Content data-testid="content">
          <Toast.Close data-testid="close-button">Close</Toast.Close>
        </Toast.Content>
      </Toast>,
    );

    expect(queryByTestId("content")).toBeNull();

    fireEvent.click(getByTestId("trigger"));
    expect(onOpenChange).toHaveBeenCalledWith(true);

    rerender(
      <Toast isOpen={true} onOpenChange={onOpenChange}>
        <Toast.Trigger data-testid="trigger">Trigger</Toast.Trigger>
        <Toast.Content data-testid="content">
          <Toast.Close data-testid="close-button">Close</Toast.Close>
        </Toast.Content>
      </Toast>,
    );
    onOpenChange.mockClear();

    expect(getByTestId("content")).toBeTruthy();

    fireEvent.click(getByTestId("close-button"));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
