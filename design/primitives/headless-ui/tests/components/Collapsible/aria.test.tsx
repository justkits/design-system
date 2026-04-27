import { fireEvent, render } from "@testing-library/react";

import { TestCollapsible } from "./_setup";

describe("Collapsible - aria attributes", () => {
  it("should have correct aria attributes when open and closed", () => {
    const { getByText } = render(<TestCollapsible>Content</TestCollapsible>);

    const toggleButton = getByText("Toggle");
    const content = getByText("Content");

    // Initially closed
    expect(toggleButton.getAttribute("aria-expanded")).toBe("false");
    expect(content).property("hidden", true);

    // Open the collapsible
    fireEvent.click(toggleButton);

    expect(toggleButton.getAttribute("aria-expanded")).toBe("true");
    expect(content).property("hidden", false); // hidden property should be false when open

    // Close the collapsible again
    fireEvent.click(toggleButton);

    expect(toggleButton.getAttribute("aria-expanded")).toBe("false");
    expect(content).property("hidden", true);
  });

  it("should have correct aria attributes when role is 'group'", () => {
    const { getByText } = render(
      <TestCollapsible role="group">Group Content</TestCollapsible>,
    );

    const toggleButton = getByText("Toggle");
    const content = getByText("Group Content");

    // Initially closed
    expect(toggleButton.getAttribute("aria-expanded")).toBe("false");
    expect(content).property("hidden", true);

    // Open the collapsible
    fireEvent.click(toggleButton);

    expect(toggleButton.getAttribute("aria-expanded")).toBe("true");
    expect(content).property("hidden", false); // hidden property should be false when open

    // Close the collapsible again
    fireEvent.click(toggleButton);

    expect(toggleButton.getAttribute("aria-expanded")).toBe("false");
    expect(content).property("hidden", true);
  });
});
