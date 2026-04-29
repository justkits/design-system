import { render } from "@testing-library/react";

import { DocsPage } from "@/domains/docs";

describe("DocsPage", () => {
  it("renders without crashing", () => {
    const { getByText } = render(<DocsPage />);

    expect(getByText("Posts Page")).toBeTruthy();
  });
});
