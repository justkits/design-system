import { fireEvent, render } from "@testing-library/react";
import { renderToString } from "react-dom/server";

import { Tooltip } from "@/components/Tooltip";
import { setupSSR } from "../_setup";
import { TestComponent } from "./_setup";

describe("Tooltip - structure", () => {
  describe("SSR", () => {
    setupSSR();

    it("renders in-place when portal prop is set (portal bypassed before mount)", () => {
      // window/document가 없는 SSR 환경에서는 useSyncExternalStore가 서버 스냅샷(false)을 사용하므로
      // portal 모드이더라도 children이 인라인으로 렌더링되어 hydration mismatch를 방지한다.
      const html = renderToString(
        <TestComponent portal>Tooltip Message</TestComponent>,
      );

      expect(html).toContain('data-testid="tooltip-trigger"');
      expect(html).toContain('data-testid="tooltip-content"');
      expect(html).toContain('data-testid="tooltip-message"');
      expect(html).toContain('data-testid="tooltip-arrow"');
    });
  });

  describe("Tooltip.Trigger", () => {
    it("must be used within the Tooltip wrapper", () => {
      expect(() => render(<Tooltip.Trigger>Trigger</Tooltip.Trigger>)).toThrow(
        "Tooltip.Trigger must be used inside the Tooltip wrapper",
      );
    });

    it("should support `asChild` property", () => {
      const onClickMock = vi.fn();
      const innerClickMock = vi.fn();

      const { container, getByText } = render(
        <Tooltip isOpen>
          <Tooltip.Trigger
            asChild
            onClick={onClickMock}
            className="custom-trigger-outer"
            style={{ color: "red" }}
          >
            <button
              onClick={innerClickMock}
              className="custom-trigger-inner"
              style={{ backgroundColor: "blue" }}
            >
              Custom Trigger
            </button>
          </Tooltip.Trigger>
        </Tooltip>,
      );

      const customTrigger = getByText("Custom Trigger");
      expect(customTrigger).toBeTruthy();
      expect(customTrigger.tagName).toBe("BUTTON");
      expect(container.querySelectorAll("button")).toHaveLength(1);

      // 이벤트 핸들러가 제대로 merge되는지 확인
      fireEvent.click(customTrigger);
      expect(onClickMock).toHaveBeenCalled();
      expect(innerClickMock).toHaveBeenCalled();

      // 나머지 props도 제대로 전달되는지 확인
      expect(customTrigger.className).toContain("custom-trigger-inner");
      expect(customTrigger.className).toContain("custom-trigger-outer");
      expect(customTrigger.style.color).toBe("red");
      expect(customTrigger.style.backgroundColor).toBe("blue");
    });
  });

  it("Tooltip.Content must be used within the Tooltip wrapper", () => {
    expect(() => render(<Tooltip.Content>Content</Tooltip.Content>)).toThrow(
      "Tooltip.Content must be used inside the Tooltip wrapper",
    );
  });

  describe("Tooltip.Message", () => {
    it("must be used within the Tooltip wrapper", () => {
      expect(() => render(<Tooltip.Message>Message</Tooltip.Message>)).toThrow(
        "Tooltip.Message must be used inside the Tooltip wrapper",
      );
    });

    it("must be used within Tooltip.Content", () => {
      expect(() =>
        render(
          <Tooltip>
            <Tooltip.Message>Message</Tooltip.Message>
          </Tooltip>,
        ),
      ).toThrow("Tooltip.Message must be used inside Tooltip.Content");
    });

    it("should support `asChild` property", () => {
      const { container, getByText } = render(
        <Tooltip isOpen>
          <Tooltip.Content>
            <Tooltip.Message asChild>
              <span>Custom Message</span>
            </Tooltip.Message>
          </Tooltip.Content>
        </Tooltip>,
      );

      const customMessage = getByText("Custom Message");
      expect(customMessage).toBeTruthy();
      expect(customMessage.tagName).toBe("SPAN");
      expect(container.querySelector("p")).toBeNull();
    });
  });

  describe("Tooltip.Arrow", () => {
    it("must be used within the Tooltip wrapper", () => {
      expect(() => render(<Tooltip.Arrow />)).toThrow(
        "Tooltip.Arrow must be used inside the Tooltip wrapper",
      );
    });

    it("Tooltip.Arrow must be used within Tooltip.Content", () => {
      expect(() =>
        render(
          <Tooltip>
            <Tooltip.Arrow />
          </Tooltip>,
        ),
      ).toThrow("Tooltip.Arrow must be used inside Tooltip.Content");
    });
  });
});
