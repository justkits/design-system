import { fireEvent, render } from "@testing-library/react";
import { type ButtonProps } from "@justkits/headless-ui/Button";

import { Collapsible } from "@/components/Collapsible";

vi.mock("@/atoms/Buttons", () => ({
  Button: ({ children, ...rest }: ButtonProps) => (
    <button {...rest} data-testid="collapsible-button">
      {children}
    </button>
  ),
}));

describe("Collapsible", () => {
  it("renders the label and toggles content correctly", () => {
    const { getByTestId, getByText } = render(
      <Collapsible label="Test Label">Test Content</Collapsible>,
    );

    const label = getByText("Test Label");
    const content = getByText("Test Content");
    const toggle = getByTestId("collapsible-button");

    // 초기 상태 확인
    expect(label).toBeTruthy();
    expect(content.dataset.state).toBe("closed");

    // 토글을 클릭하면 콘텐츠가 보여져야 한다.
    fireEvent.click(toggle);
    expect(content.dataset.state).toBe("open");

    // 다시 클릭하면 콘텐츠가 숨겨져야 한다.
    fireEvent.click(toggle);
    expect(content.dataset.state).toBe("closed");
  });
});
