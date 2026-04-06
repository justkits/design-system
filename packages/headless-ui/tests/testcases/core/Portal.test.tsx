import { render } from "@testing-library/react";

import { ExternalPortal } from "@/core/portal";

describe("Portal - corner cases", () => {
  it("handles external portal correctly", () => {
    const { getByTestId } = render(
      <ExternalPortal>
        <div data-testid="portal-child">External Portal Content</div>
      </ExternalPortal>,
    );

    const child = getByTestId("portal-child");

    expect(child).toBeTruthy();
    // test if it renders directly in the body
    expect(child.parentElement).toBe(document.body);
  });
});
