import { useState } from "react";
import { fireEvent, render } from "@testing-library/react";

import { Collapsible } from "@/components/Collapsible";

describe("Collapsible - structure", () => {
  it("Collapsible.Content must be used within the Collapsible wrapper", () => {
    expect(() =>
      render(<Collapsible.Content>Content</Collapsible.Content>),
    ).toThrow(
      "Collapsible.Content must be used inside the Collapsible wrapper.",
    );
  });

  it("Collapsible.Toggle must be used within the Collapsible wrapper", () => {
    expect(() =>
      render(<Collapsible.Toggle>Trigger</Collapsible.Toggle>),
    ).toThrow(
      "Collapsible.Toggle must be used inside the Collapsible wrapper.",
    );
  });

  it("Collapsible.Toggle should support asChild property", () => {
    const toggleMock = vi.fn();

    const TestComponent = () => {
      const [isOpen, setIsOpen] = useState<boolean>(false);

      const toggle = (open: boolean) => {
        setIsOpen(open);
        toggleMock(open);
      };

      return (
        <Collapsible isOpen={isOpen} onOpenChange={toggle}>
          <Collapsible.Toggle asChild>
            <button>Toggle</button>
          </Collapsible.Toggle>
        </Collapsible>
      );
    };

    const { getByText } = render(<TestComponent />);

    // asChild로 감싸진 버튼이 렌더링되어야 한다.
    expect(getByText("Toggle")).toBeTruthy();

    fireEvent.click(getByText("Toggle"));
    expect(toggleMock).toHaveBeenCalledWith(true); // 클릭 시 onOpenChange가 호출되어야 한다.

    fireEvent.click(getByText("Toggle"));
    expect(toggleMock).toHaveBeenCalledWith(false); // 다시 클릭 시 onOpenChange가 호출되어야 한다.
  });
});
