import { fireEvent, render } from "@testing-library/react";

import { setupConsoleSpy } from "../_setup";
import { TestComponent } from "./_setup";

describe("Modal - interactions", () => {
  setupConsoleSpy("development");

  describe("Clicks", () => {
    it("trigger click opens the modal and clicking outside closes it", async () => {
      const { getByTestId, queryByTestId } = render(<TestComponent />);

      // 초기에는 Modal.Content가 렌더링되지 않아야 한다.
      expect(queryByTestId("modal-content")).toBeNull();

      // Modal.Trigger를 클릭하여 Modal을 연다.
      fireEvent.click(getByTestId("modal-trigger"));
      expect(getByTestId("modal-content")).toBeTruthy();

      // Modal.Overlay를 클릭하여 Modal을 닫는다.
      fireEvent.mouseDown(getByTestId("modal-overlay"));
      expect(queryByTestId("modal-content")).toBeNull();
    });

    it("closes the modal when close button is clicked", async () => {
      const { getByTestId, queryByTestId } = render(<TestComponent />);

      // Modal.Trigger를 클릭하여 Modal을 연다.
      fireEvent.click(getByTestId("modal-trigger"));
      expect(getByTestId("modal-content")).toBeTruthy();

      // Modal.Close 버튼을 클릭하여 Modal을 닫는다.
      fireEvent.click(getByTestId("modal-close-button"));
      expect(queryByTestId("modal-content")).toBeNull();
    });

    it("closes out outside click when overlay is not rendered", async () => {
      const { getByTestId, queryByTestId } = render(
        <TestComponent omit="overlay" />,
      );

      // Modal.Trigger를 클릭하여 Modal을 연다.
      fireEvent.click(getByTestId("modal-trigger"));
      expect(getByTestId("modal-content")).toBeTruthy();

      // Modal.Content 외부를 클릭하여 Modal을 닫는다.
      fireEvent.mouseDown(document.body);
      expect(queryByTestId("modal-content")).toBeNull();
    });
  });
});
