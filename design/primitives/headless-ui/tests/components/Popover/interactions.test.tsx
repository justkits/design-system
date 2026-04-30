import { act, fireEvent, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Popover } from "@/components/Popover";
import { TestComponent } from "./_setup";

describe("Popover - interactions", () => {
  describe("Clicks", () => {
    it("trigger click opens the popover", async () => {
      const { getByTestId } = render(<TestComponent />);

      const content = getByTestId("popover-content");
      // 초기에는 Popover.Content가 렌더링되지 않아야 한다.
      expect(content.dataset.state).toBe("closed");

      // 트리거를 클릭하면 Popover.Content가 열려야 한다.
      fireEvent.click(getByTestId("popover-trigger"));
      expect(content.dataset.state).toBe("open");
    });

    it("clicking outside closes the popover", async () => {
      const { getByTestId } = render(<TestComponent />);

      const content = getByTestId("popover-content");

      fireEvent.click(getByTestId("popover-trigger"));
      expect(content.dataset.state).toBe("open");

      // content를 클릭하면 닫히면 안 된다.
      fireEvent.pointerDown(content);
      fireEvent.pointerUp(content);
      expect(content.dataset.state).toBe("open");

      fireEvent.pointerDown(getByTestId("outside-element"));
      fireEvent.pointerUp(getByTestId("outside-element"));
      expect(content.dataset.state).toBe("closed");
    });

    it("Popover.Close click closes the popover", async () => {
      const { getByTestId } = render(<TestComponent />);

      const content = getByTestId("popover-content");

      fireEvent.click(getByTestId("popover-trigger"));
      expect(content.dataset.state).toBe("open");

      fireEvent.click(getByTestId("popover-button"));
      await waitFor(() => expect(content.dataset.state).toBe("closed"));
    });
  });

  describe("Keyboard", () => {
    it("Escape key closes the popover", async () => {
      const { getByTestId } = render(<TestComponent />);

      const content = getByTestId("popover-content");

      fireEvent.click(getByTestId("popover-trigger"));
      expect(content).toBeTruthy();

      fireEvent.keyDown(content, { key: "Escape" });
      expect(content.dataset.state).toBe("closed");
    });

    it("Tab/Shift+Tab cycles focus within Popover.Content and cannot escape", async () => {
      const user = userEvent.setup();
      const { getByTestId } = render(
        <Popover>
          <Popover.Trigger data-testid="trigger">트리거</Popover.Trigger>
          <Popover.Content>
            <Popover.Close data-testid="btn-1">버튼 1</Popover.Close>
            <Popover.Close data-testid="btn-2">버튼 2</Popover.Close>
            <Popover.Close data-testid="btn-3">버튼 3</Popover.Close>
          </Popover.Content>
        </Popover>,
      );

      fireEvent.click(getByTestId("trigger"));

      // 마지막 버튼에서 Tab을 누르면 첫 번째 버튼으로 포커스가 이동한다.
      getByTestId("btn-3").focus();
      await user.tab();
      expect(document.activeElement).toBe(getByTestId("btn-1"));

      // 첫 번째 버튼에서 Shift+Tab을 누르면 마지막 버튼으로 포커스가 이동한다.
      getByTestId("btn-1").focus();
      await user.tab({ shift: true });
      expect(document.activeElement).toBe(getByTestId("btn-3"));

      // 첫 번째 버튼에서 Tab을 누르면 두 번째 버튼으로 포커스가 이동한다.
      getByTestId("btn-1").focus();
      await user.tab();
      expect(document.activeElement).toBe(getByTestId("btn-2"));

      // 마지막 버튼에서 Shift+Tab을 누르면 두 번째 버튼으로 포커스가 이동한다.
      getByTestId("btn-3").focus();
      await user.tab({ shift: true });
      expect(document.activeElement).toBe(getByTestId("btn-2"));
    });
  });

  describe("Focus", () => {
    describe("Initial Focus", () => {
      it("focuses the first focusable element when popover opens", async () => {
        const { getByTestId } = render(<TestComponent />);

        fireEvent.click(getByTestId("popover-trigger"));

        // Popover.Content 내의 첫 번째 focusable 요소에 포커스가 가야 한다. (Popover.Close)
        expect(document.activeElement).toBe(getByTestId("popover-button"));
      });

      it("focuses Popover.Content itself when there are no focusable elements", async () => {
        const { getByTestId } = render(
          <Popover>
            <Popover.Trigger data-testid="trigger">트리거</Popover.Trigger>
            <Popover.Content data-testid="content">
              <Popover.Title>제목</Popover.Title>
            </Popover.Content>
          </Popover>,
        );

        fireEvent.click(getByTestId("trigger"));

        // Popover.Content에 포커스가 가야 한다.
        expect(document.activeElement).toBe(getByTestId("content"));

        // 이 상태에서 Tab 키를 눌러도 포커스가 Popover.Content에 머물러야 한다.
        fireEvent.keyDown(getByTestId("content"), { key: "Tab" });
        expect(document.activeElement).toBe(getByTestId("content"));

        // Shift+Tab 키를 눌러도 포커스가 Popover.Content에 머물러야 한다.
        fireEvent.keyDown(getByTestId("content"), {
          key: "Tab",
          shiftKey: true,
        });
        expect(document.activeElement).toBe(getByTestId("content"));
      });
    });

    describe("Return Focus", () => {
      it("returns focus to Popover.Trigger when closed", async () => {
        const { getByTestId } = render(<TestComponent />);

        const trigger = getByTestId("popover-trigger");
        fireEvent.click(trigger);
        expect(getByTestId("popover-content")).toBeTruthy();

        // Escape로 닫았을 때, Popover.Trigger로 포커스가 돌아와야 한다.
        fireEvent.keyDown(getByTestId("popover-content"), { key: "Escape" });
        expect(document.activeElement).toBe(trigger);

        fireEvent.click(trigger);
        expect(getByTestId("popover-content")).toBeTruthy();

        // Popover.Close로 닫았을 때, Popover.Trigger로 포커스가 돌아와야 한다.
        fireEvent.click(getByTestId("popover-button"));
        await waitFor(() => expect(document.activeElement).toBe(trigger));

        fireEvent.click(trigger);
        expect(getByTestId("popover-content")).toBeTruthy();

        // 외부 클릭으로 닫았을 때, Popover.Trigger로 포커스가 돌아와야 한다.
        fireEvent.pointerDown(getByTestId("outside-element"));
        fireEvent.pointerUp(getByTestId("outside-element"));
        await waitFor(() => expect(document.activeElement).toBe(trigger));
      });
    });
  });

  describe("Async Button Actions", () => {
    it("stays open while pending and sets correct properties", async () => {
      let resolvePromise!: () => void;
      const onClose = () =>
        new Promise<void>((resolve) => {
          resolvePromise = resolve;
        });
      const { getByTestId } = render(<TestComponent onClose={onClose} />);

      const content = getByTestId("popover-content");

      fireEvent.click(getByTestId("popover-trigger"));
      expect(content.dataset.state).toBe("open");

      const button = getByTestId("popover-button");
      fireEvent.click(button);

      // 버튼이 pending 상태일 때, Popover.Content가 닫히면 안 된다.
      expect(content.dataset.state).toBe("open");

      // 버튼에 pending 속성이 true로 설정되어야 한다.
      expect(content.getAttribute("aria-busy")).toBe("true");

      await act(async () => {
        resolvePromise();
      });

      // Promise가 해결된 후, Popover.Content가 닫혀야 한다.
      await waitFor(() => expect(content.dataset.state).toBe("closed"));
    });

    it("closes on resolve", async () => {
      let resolveAction!: () => void;
      const onClose = () =>
        new Promise<void>((resolve) => {
          resolveAction = resolve;
        });
      const { getByTestId } = render(<TestComponent onClose={onClose} />);

      fireEvent.click(getByTestId("popover-trigger"));
      const content = getByTestId("popover-content");
      expect(content.dataset.state).toBe("open");

      fireEvent.click(getByTestId("popover-button"));

      await act(async () => {
        resolveAction();
      });

      await waitFor(() => expect(content.dataset.state).toBe("closed"));
    });

    it("stays open on reject", async () => {
      const onClose = () => Promise.reject(new Error("실패"));
      const { getByTestId } = render(<TestComponent onClose={onClose} />);

      const content = getByTestId("popover-content");

      fireEvent.click(getByTestId("popover-trigger"));
      expect(content.dataset.state).toBe("open");

      fireEvent.click(getByTestId("popover-button"));

      await waitFor(() => {
        // Promise가 거부된 후에도 Popover.Content가 닫히면 안 된다.
        expect(content.dataset.state).toBe("open");

        // Popover.Content에 pending 관련 속성이 올바르게 설정되어야 한다.
        expect(content.getAttribute("aria-busy")).toBe("false");
      });
    });
  });
});
