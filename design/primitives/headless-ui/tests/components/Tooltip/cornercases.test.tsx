import { act, fireEvent, render } from "@testing-library/react";

import { Tooltip } from "@/components/Tooltip";
import { setupTimer } from "../_setup";
import { TestComponent } from "./_setup";

describe("Tooltip - corner cases", () => {
  setupTimer();

  it("should not close the tooltip on clicking the trigger when it's open", () => {
    // click outside가 이 케이스도 성공적으로 처리해야 한다.
    const onOpenChangeMock = vi.fn();
    const { getByTestId } = render(
      <TestComponent isOpen onOpenChange={onOpenChangeMock}>
        Tooltip Message
      </TestComponent>,
    );

    const trigger = getByTestId("tooltip-trigger");
    const content = getByTestId("tooltip-content");

    expect(content.dataset.state).toBe("open");

    // 트리거 클릭 시 onOpenChange가 호출되지 않아야 한다.
    fireEvent.pointerDown(trigger);
    fireEvent.pointerUp(trigger);
    expect(onOpenChangeMock).not.toHaveBeenCalled();
  });

  it("should reset timer when rapidly hovering in and out", () => {
    const { getByTestId } = render(
      <TestComponent>Tooltip Message</TestComponent>,
    );

    const trigger = getByTestId("tooltip-trigger");
    const content = getByTestId("tooltip-content");

    // 초기에는 보이지 않는다.
    expect(content.dataset.state).toBe("closed");

    // 트리거에 마우스를 올려, 일단 타이머를 시작한다.
    fireEvent.mouseEnter(trigger);
    // 충분한 시간이 지나지 않고, 마우스를 내린다. (기본값 open 300ms, hide 700ms)
    act(() => vi.advanceTimersByTime(250));
    fireEvent.mouseLeave(trigger);
    // 타이머가 리셋되었기 때문에 700 - 250 = 450ms 후에도 보이지 않아야 한다.
    act(() => vi.advanceTimersByTime(450));
    expect(content.dataset.state).toBe("closed");

    // 마찬가지로, 내리는 과정에서도 확인한다.
    // 일단 툴팁을 연다.
    fireEvent.mouseEnter(trigger);
    act(() => vi.advanceTimersByTime(300));
    expect(content.dataset.state).toBe("open");

    // 트리거에서 마우스를 내려 일단 타이머를 시작한다.
    fireEvent.mouseLeave(trigger);
    // 충분한 시간이 지나지 않고, 마우스를 올린다. (기본값 open 300ms, hide 700ms)
    act(() => vi.advanceTimersByTime(250));
    fireEvent.mouseEnter(trigger);
    // 타이머가 리셋되었기 때문에 700 - 250 = 450ms 후에도 보여야 한다.
    act(() => vi.advanceTimersByTime(450));
    expect(content.dataset.state).toBe("open");
  });

  describe("aschild - isValidElement warning", () => {
    it("should warn on console if asChild is used without a valid React element child", () => {
      const consoleWarnMock = vi
        .spyOn(console, "warn")
        .mockImplementation(() => {});

      render(
        <TestComponent isOpen>
          <Tooltip.Trigger asChild>Invalid Trigger</Tooltip.Trigger>
        </TestComponent>,
      );

      expect(consoleWarnMock).toHaveBeenCalledWith(
        "[AsChild] asChild requires a single valid React element as child.",
      );

      consoleWarnMock.mockRestore();
    });

    it("should not warn on console if production environment", () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = "production";

      const consoleWarnMock = vi
        .spyOn(console, "warn")
        .mockImplementation(() => {});

      render(
        <TestComponent isOpen>
          <Tooltip.Trigger asChild>Invalid Trigger</Tooltip.Trigger>
        </TestComponent>,
      );

      expect(consoleWarnMock).not.toHaveBeenCalled();

      consoleWarnMock.mockRestore();
      process.env.NODE_ENV = originalEnv;
    });
  });
});
