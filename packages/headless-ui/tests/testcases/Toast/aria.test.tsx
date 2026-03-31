import { render } from "@testing-library/react";

import { TestComponent } from "./_setup";

describe("Toast - aria", () => {
  describe("ID", () => {
    it("Toast.Message's ID matches Toast.Content's aria-describedby", () => {
      const { getByTestId } = render(<TestComponent isOpen />);

      const content = getByTestId("toast-content");
      const message = getByTestId("toast-message");
      expect(message.getAttribute("id")).toBe(
        content.getAttribute("aria-describedby"),
      );
    });

    it("Toast.Content's aria-describedby and aria-description are null if Toast.Message is not rendered", () => {
      const { getByTestId } = render(<TestComponent isOpen omit="message" />);

      const content = getByTestId("toast-content");
      expect(content.getAttribute("aria-describedby")).toBeNull();
      expect(content.getAttribute("aria-description")).toBeNull();
    });
  });

  describe("Attributes", () => {
    it("Toast.Content always has role='status', aria-atomic='true' and aria-live='polite' by default", () => {
      const { getByTestId } = render(<TestComponent isOpen />);

      const content = getByTestId("toast-content");

      expect(content.getAttribute("role")).toBe("status");
      expect(content.getAttribute("aria-atomic")).toBe("true");
      expect(content.getAttribute("aria-live")).toBe("polite");
    });

    it("does not set `inert` value in the DOM (background)", () => {
      const { getByTestId } = render(<TestComponent isOpen />);

      // `inert`는 DOM에 반영되지 않아야 한다.
      expect(getByTestId("toast-content").getAttribute("inert")).toBeNull();
      expect(getByTestId("outside-element").getAttribute("inert")).toBeNull();
      expect(document.body.getAttribute("inert")).toBeNull();
    });
  });
});
