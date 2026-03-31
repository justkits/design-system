import { act, fireEvent, render, waitFor } from "@testing-library/react";

import { setupTimer, setupUnhandledRejection } from "../_setup";
import { swipe, TestComponent } from "./_setup";

describe("Toast - corner cases", () => {
  describe("Async Close Actions", () => {
    setupUnhandledRejection();

    it("stays open while pending and sets correct properties and closes on resolve", async () => {
      let resolvePromise!: () => void;
      const onClose = () =>
        new Promise<void>((resolve) => {
          resolvePromise = resolve;
        });
      const { getByTestId, queryByTestId } = render(
        <TestComponent onClose={onClose} />,
      );

      fireEvent.click(getByTestId("toast-trigger"));
      expect(getByTestId("toast-content")).toBeTruthy();

      fireEvent.click(getByTestId("toast-close"));

      // 버튼이 pending 상태일 때, Toast.Content가 닫히면 안 된다.
      expect(queryByTestId("toast-content")).toBeTruthy();

      await act(async () => {
        resolvePromise();
      });

      // Promise가 해결된 후, Toast.Content가 닫혀야 한다.
      await waitFor(() => expect(queryByTestId("toast-content")).toBeNull());
    });

    it("stays open on reject", async () => {
      const onClose = vi
        .fn()
        .mockRejectedValue(new Error("onClose promise rejected"));
      const { getByTestId, queryByTestId } = render(
        <TestComponent onClose={onClose} />,
      );

      fireEvent.click(getByTestId("toast-trigger"));
      expect(getByTestId("toast-content")).toBeTruthy();

      await act(async () => {
        fireEvent.click(getByTestId("toast-close"));
      });

      expect(onClose).toHaveBeenCalled();

      // Promise가 거부된 후에도 Toast.Content가 닫히면 안 된다.
      expect(queryByTestId("toast-content")).toBeTruthy();
    });
  });

  describe("infinite duration", () => {
    setupTimer();

    it("does not pause or resume the timer on mouse enter/leave if duration is infinite", () => {
      const { getByTestId } = render(<TestComponent duration="infinite" />);

      act(() => fireEvent.click(getByTestId("toast-trigger")));
      expect(getByTestId("toast-content")).toBeTruthy();

      act(() => {
        fireEvent.mouseEnter(getByTestId("toast-content"));
        vi.advanceTimersByTime(5000);
      });

      // duration이 infinite이므로 마우스 엔터로 타이머가 일시정지되지 않아야 한다.
      expect(getByTestId("toast-content")).toBeTruthy();

      act(() => {
        fireEvent.mouseLeave(getByTestId("toast-content"));
        vi.advanceTimersByTime(5000);
      });

      // duration이 infinite이므로 마우스 리브로 타이머가 재개되지 않아야 한다.
      expect(getByTestId("toast-content")).toBeTruthy();
    });
  });

  describe("swipe", () => {
    it("handles swipe gestures correctly when enabled", () => {
      const { getByTestId, queryByTestId } = render(
        <TestComponent swipeDirection={["left", "right", "up", "down"]} />,
      );

      act(() => fireEvent.click(getByTestId("toast-trigger")));
      expect(getByTestId("toast-content")).toBeTruthy();

      // swipe를 왼쪽/오른쪽/위쪽/아래로 충분히 하면 토스트가 닫혀야 한다.
      act(() => swipe(getByTestId("toast-content"), "left", 60));
      expect(queryByTestId("toast-content")).toBeNull();

      act(() => fireEvent.click(getByTestId("toast-trigger")));
      act(() => swipe(getByTestId("toast-content"), "right", 60));
      expect(queryByTestId("toast-content")).toBeNull();

      act(() => fireEvent.click(getByTestId("toast-trigger")));
      act(() => swipe(getByTestId("toast-content"), "up", 60));
      expect(queryByTestId("toast-content")).toBeNull();

      act(() => fireEvent.click(getByTestId("toast-trigger")));
      act(() => swipe(getByTestId("toast-content"), "down", 60));
      expect(queryByTestId("toast-content")).toBeNull();
    });

    it("does not close the toast on swipe gestures when disabled", () => {
      const { getByTestId } = render(<TestComponent swipeDirection={[]} />);

      act(() => fireEvent.click(getByTestId("toast-trigger")));
      expect(getByTestId("toast-content")).toBeTruthy();

      // swipe를 왼쪽/오른쪽/위쪽/아래로 충분히 하더라도 토스트가 닫히면 안 된다.
      act(() => swipe(getByTestId("toast-content"), "left", 100));
      expect(getByTestId("toast-content")).toBeTruthy();
      act(() => swipe(getByTestId("toast-content"), "right", 100));
      expect(getByTestId("toast-content")).toBeTruthy();
      act(() => swipe(getByTestId("toast-content"), "up", 100));
      expect(getByTestId("toast-content")).toBeTruthy();
      act(() => swipe(getByTestId("toast-content"), "down", 100));
      expect(getByTestId("toast-content")).toBeTruthy();
    });
  });
});
