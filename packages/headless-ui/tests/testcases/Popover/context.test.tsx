import { render } from "@testing-library/react";

import { Popover } from "@/Popover";

describe("Popover - context errors", () => {
  it("raises error when PopoverTrigger is used outside of Popover", () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    expect(() => render(<Popover.Trigger>트리거</Popover.Trigger>)).toThrow(
      "Popover Components must be used within the Popover wrapper",
    );

    consoleErrorSpy.mockRestore();
  });

  it("raises error when PopoverContent is used outside of Popover", () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    expect(() => render(<Popover.Content>내용</Popover.Content>)).toThrow(
      "Popover Components must be used within the Popover wrapper",
    );

    consoleErrorSpy.mockRestore();
  });

  it("raises error when usePopoverContent is used outside of PopoverContent", () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    expect(() =>
      render(
        <Popover>
          <Popover.Arrow />
        </Popover>,
      ),
    ).toThrow("Popover.Arrow must be used within Popover.Content");

    consoleErrorSpy.mockRestore();
  });
});
