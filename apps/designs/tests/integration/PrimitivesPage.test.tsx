import { render } from "@testing-library/react";

import { PrimitivesPage } from "@pages/primitives";

describe("PrimitivesLayout", () => {
  it("renders without crashing", () => {
    const { getByText } = render(<PrimitivesPage />);

    expect(getByText("Primitives Page")).toBeTruthy();
  });
});
