import { render } from "@testing-library/react";

import { Badge } from "@/components/Badge";

describe("Badge", () => {
  it("renders children correctly", () => {
    const { getByText } = render(<Badge label="Test Badge" />);
    expect(getByText("Test Badge")).toBeTruthy();
  });

  it("renders correctly with color and left right components", () => {
    const { getByText } = render(
      <Badge
        label="Test Badge With Options"
        color="blue"
        left={<span>Left</span>}
        right={<span>Right</span>}
      />,
    );
    expect(getByText("Test Badge With Options")).toBeTruthy();
  });
});
