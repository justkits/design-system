import { act, fireEvent, render, waitFor } from "@testing-library/react";

import { TestComponent } from "./_setup";

describe("Modal - corner cases", () => {
  describe("Async Close Actions", () => {
    it("handles async close actions without crashing", async () => {
      let resolveClose!: () => void;
      const pendingClose = new Promise<void>((resolve) => {
        resolveClose = resolve;
      });
      const onClose = vi.fn().mockReturnValue(pendingClose);
      const { getByTestId, queryByTestId } = render(
        <TestComponent onClose={onClose} />,
      );

      // Modal.Trigger를 클릭하여 Modal을 연다.
      fireEvent.click(getByTestId("modal-trigger"));
      expect(getByTestId("modal-content")).toBeTruthy();

      // Modal.Close 버튼을 클릭하여 Modal을 닫는다.
      fireEvent.click(getByTestId("modal-close-button"));

      // onClose가 호출되어야 한다.
      expect(onClose).toHaveBeenCalled();

      // Modal.Content가 즉시 닫히면 안 된다.
      expect(queryByTestId("modal-content")).toBeTruthy();

      // async close action이 pending 상태일 때, Modal.Content에 aria-busy 속성이 true로 설정되어야 한다.
      expect(getByTestId("modal-content").getAttribute("aria-busy")).toBe(
        "true",
      );

      // async close action이 해결되면 Modal이 닫혀야 한다.
      await act(async () => {
        resolveClose();
      });
      await waitFor(() => expect(queryByTestId("modal-content")).toBeNull());
    });
  });
});
