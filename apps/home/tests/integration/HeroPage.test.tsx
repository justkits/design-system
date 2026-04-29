import { render } from "@testing-library/react";

import { HeroPage } from "@/domains/root";

describe("HeroPage", () => {
  it("renders without crashing", () => {
    const { getByText } = render(<HeroPage />);

    expect(getByText("Hero Page")).toBeTruthy();
  });
});
