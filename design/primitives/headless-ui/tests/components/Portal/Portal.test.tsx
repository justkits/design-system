import { render } from "@testing-library/react";

import { Portal } from "@/components/Portal";

describe("Portal", () => {
  it("renders children in a portal", () => {
    const { getByText } = render(
      <Portal>
        <div>Portal Content</div>
      </Portal>,
    );

    const content = getByText("Portal Content");

    expect(content).toBeTruthy();
    expect(content.parentElement).toBe(document.body);
  });
});
