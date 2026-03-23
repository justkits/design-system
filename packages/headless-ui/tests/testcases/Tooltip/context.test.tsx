import { render } from "@testing-library/react";

import { Tooltip } from "@/Tooltip";

describe("Tooltip - context errors", () => {
  it("raises error when TooltipTrigger is used outside of Tooltip", () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    expect(() => render(<Tooltip.Trigger>트리거</Tooltip.Trigger>)).toThrow(
      "Tooltip Components must be used within Tooltip",
    );

    consoleErrorSpy.mockRestore();
  });

  it("raises error when TooltipContent is used outside of Tooltip", () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    expect(() => render(<Tooltip.Content>내용</Tooltip.Content>)).toThrow(
      "Tooltip Components must be used within Tooltip",
    );

    consoleErrorSpy.mockRestore();
  });

  it("raises error when TooltipArrow is used outside of TooltipContent", () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    expect(() =>
      render(
        <Tooltip>
          <Tooltip.Trigger>트리거</Tooltip.Trigger>
          <Tooltip.Arrow />
        </Tooltip>,
      ),
    ).toThrow("Tooltip.Arrow must be used within Tooltip.Content");

    consoleErrorSpy.mockRestore();
  });
});
