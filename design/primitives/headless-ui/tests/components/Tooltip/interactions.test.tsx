import { act, fireEvent, render } from "@testing-library/react";

import { setupTimer } from "../_setup";
import { TestComponent } from "./_setup";

describe("Tooltip - interactions", () => {
  describe("Pointers", () => {
    setupTimer();

    it("should not open the tooltip on clicks", () => {
      const { getByTestId } = render(
        <TestComponent>Tooltip Message</TestComponent>,
      );

      const trigger = getByTestId("tooltip-trigger");
      const content = getByTestId("tooltip-content");

      // 초기에는 보이지 않는다.
      expect(content.dataset.state).toBe("closed");

      // 클릭 시에도 보이지 않아야 한다.
      fireEvent.click(trigger);
      act(() => {
        vi.advanceTimersByTime(1000); // 충분한 시간이 지나도 보이지 않아야 한다.
      });
      expect(content.dataset.state).toBe("closed");
    });

    it("should close the tooltip on outside clicks when it's open", () => {
      const onOpenChangeMock = vi.fn();
      const { getByTestId } = render(
        <TestComponent isOpen onOpenChange={onOpenChangeMock}>
          Tooltip Message
        </TestComponent>,
      );

      const content = getByTestId("tooltip-content");

      // 초기에는 보인다.
      expect(content.dataset.state).toBe("open");

      // 외부 클릭 시 onOpenChange가 호출되어야 한다.
      fireEvent.pointerDown(document);
      fireEvent.pointerUp(document);
      expect(onOpenChangeMock).toHaveBeenCalledWith(false);
    });

    it("should open the tooltip on long press", () => {
      const { getByTestId } = render(
        <TestComponent>Tooltip Message</TestComponent>,
      );

      const trigger = getByTestId("tooltip-trigger");
      const content = getByTestId("tooltip-content");

      // 초기에는 보이지 않는다.
      expect(content.dataset.state).toBe("closed");

      // 트리거를 길게 누르면 툴팁이 열려야 한다. (기본값 500ms)
      fireEvent.touchStart(trigger);
      act(() => vi.advanceTimersByTime(500));
      expect(content.dataset.state).toBe("open");

      // 한번 열리면, 터치를 끝내도 바로 닫히지 않아야 한다.
      fireEvent.touchEnd(trigger);
      act(() => vi.advanceTimersByTime(1000)); // 충분한 시간이 지나도 보이지 않아야 한다.
      expect(content.dataset.state).toBe("open");
    });
  });

  describe("Hover", () => {
    setupTimer();

    it("shows the tooltip on mouse enter and hides it on mouse leave", () => {
      const { getByTestId } = render(
        <TestComponent>Tooltip Message</TestComponent>,
      );

      const trigger = getByTestId("tooltip-trigger");
      const content = getByTestId("tooltip-content");

      // 초기에는 Tooltip.Content가 렌더링되지 않아야 한다.
      expect(content.dataset.state).toBe("closed");

      // Tooltip.Trigger에 마우스를 올려 툴팁을 연다. (기본값 300ms)
      fireEvent.mouseEnter(trigger);
      act(() => vi.advanceTimersByTime(300));
      expect(content.dataset.state).toBe("open");

      // Tooltip.Trigger에서 마우스를 내리면 툴팁이 닫혀야 한다. (700ms delay)
      fireEvent.mouseLeave(trigger);
      act(() => vi.advanceTimersByTime(700));
      expect(content.dataset.state).toBe("closed");
    });

    it("does not hide the tooltip if mouse enters the tooltip content while it's open", () => {
      const { getByTestId } = render(
        <TestComponent>Tooltip Message</TestComponent>,
      );

      const trigger = getByTestId("tooltip-trigger");
      const content = getByTestId("tooltip-content");

      // Tooltip.Trigger에 마우스를 올려 툴팁을 연다. (500ms delay)
      fireEvent.mouseEnter(trigger);
      act(() => vi.advanceTimersByTime(500));
      expect(content.dataset.state).toBe("open");

      // Tooltip.Content에 마우스를 올려도 툴팁이 닫히지 않아야 한다.
      fireEvent.mouseLeave(trigger);
      fireEvent.mouseEnter(content);
      act(() => vi.advanceTimersByTime(1000)); // 충분한 시간을 보낸다.
      expect(content.dataset.state).toBe("open");

      // Tooltip.Content에서도 마우스를 내리면 툴팁이 닫혀야 한다. (700ms delay)
      fireEvent.mouseLeave(content);
      act(() => vi.advanceTimersByTime(700));
      expect(content.dataset.state).toBe("closed");
    });
  });

  describe("Focus", () => {
    it("shows the tooltip on focus and hides it on blur", () => {
      const { getByTestId } = render(
        <TestComponent>Tooltip Message</TestComponent>,
      );

      const trigger = getByTestId("tooltip-trigger");
      const content = getByTestId("tooltip-content");

      // 초기에는 Tooltip.Content가 렌더링되지 않아야 한다.
      expect(content.dataset.state).toBe("closed");

      // Tooltip.Trigger에 포커스하여 툴팁을 연다.
      act(() => trigger.focus());
      expect(content.dataset.state).toBe("open");
      expect(document.activeElement).toBe(trigger); // 포커스가 트리거에 남아 있어야 한다.
      expect(document.activeElement).not.toBe(content); // 포커스가 툴팁 콘텐츠로 이동하면 안 된다.

      // Tooltip.Trigger에서 포커스가 해제되면 툴팁이 닫혀야 한다.
      act(() => trigger.blur());
      expect(content.dataset.state).toBe("closed");
    });
  });

  describe("Keyboard", () => {
    it("closes the tooltip on Escape key press", () => {
      const onOpenChangeMock = vi.fn();
      const { getByTestId } = render(
        <TestComponent isOpen onOpenChange={onOpenChangeMock}>
          Tooltip Message
        </TestComponent>,
      );

      const content = getByTestId("tooltip-content");

      // 초기에는 보인다.
      expect(content.dataset.state).toBe("open");

      // 다른 키를 누르면 onOpenChange가 호출되지 않아야 한다.
      fireEvent.keyDown(document, { key: "Enter" });
      expect(onOpenChangeMock).not.toHaveBeenCalled();

      // Escape 키를 누르면 onOpenChange가 호출되어야 한다.
      fireEvent.keyDown(document, { key: "Escape" });
      expect(onOpenChangeMock).toHaveBeenCalledWith(false);
    });
  });
});
