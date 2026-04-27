import { useState } from "react";
import { fireEvent, render } from "@testing-library/react";

import { TestCollapsible } from "./_setup";

describe("Collapsible - interactions", () => {
  it("should handle controlled mode correctly", () => {
    const TestComponent = () => {
      const [isOpen, setIsOpen] = useState(false);

      return (
        <TestCollapsible isOpen={isOpen} onOpenChange={setIsOpen}>
          Controlled Content
        </TestCollapsible>
      );
    };

    const { getByText } = render(<TestComponent />);

    const toggleButton = getByText("Toggle");
    const content = getByText("Controlled Content");

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

  it("should handle disabled state correctly", () => {
    const { getByText } = render(
      <TestCollapsible disabled>Disabled Content</TestCollapsible>,
    );

    const toggleButton = getByText("Toggle");
    const content = getByText("Disabled Content");

    // The toggle should be disabled
    expect(toggleButton).property("disabled", true);
    expect(toggleButton.getAttribute("aria-disabled")).toBe("true");

    // The content should be hidden
    expect(content).property("hidden", true);

    // Clicking the toggle should not change the state
    fireEvent.click(toggleButton);
    expect(toggleButton.getAttribute("aria-expanded")).toBe("false");
    expect(content).property("hidden", true);
  });

  it("unmountOnHide - should toggle content visibility when the toggle is clicked", () => {
    const { getByText, queryByText } = render(
      <TestCollapsible unmountOnHide>Content</TestCollapsible>,
    );

    const toggle = getByText("Toggle");

    // 초기에는 콘텐츠가 보이지 않아야 한다.
    expect(queryByText("Content")).toBeNull();

    fireEvent.click(toggle);
    // 토글을 클릭하면 콘텐츠가 보여야 한다.
    expect(getByText("Content")).toBeTruthy();

    fireEvent.click(toggle);
    // 다시 클릭하면 콘텐츠가 숨겨져야 한다.
    expect(queryByText("Content")).toBeNull();
  });

  it("no unmountOnHide - should toggle content visibility when the toggle is clicked", () => {
    const { getByText } = render(<TestCollapsible>Content</TestCollapsible>);

    const toggle = getByText("Toggle");
    const content = getByText("Content");

    // 초기에는 콘텐츠가 숨겨져 있어야 한다.
    expect(content).property("hidden", true);

    fireEvent.click(toggle);
    // 토글을 클릭하면 콘텐츠가 보여야 한다.
    expect(content).property("hidden", false);

    fireEvent.click(toggle);
    // 다시 클릭하면 콘텐츠가 숨겨져야 한다.
    expect(content).property("hidden", true);
  });
});
