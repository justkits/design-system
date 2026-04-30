import { fireEvent, render } from "@testing-library/react";

import {
  AlwaysOpenTestComponent,
  TestComponent,
  checkArrowPosition,
} from "./_setup";

describe("Popover - corner cases", () => {
  describe("positions - flip and shift cases", () => {
    // options.test.tsx에서는 아래 4가지 경우만 테스트한다. 따라서, 나머지 케이스들을 전부 처리해야한다.
    // 1. top -> bottom flip
    // 2. left -> right flip
    // 3. top|bottom 일 때 왼쪽으로 shift
    // 4. left|right 일 때 아래로 shift

    beforeEach(() => {
      vi.spyOn(globalThis.window, "innerWidth", "get").mockReturnValue(800);
      vi.spyOn(globalThis.window, "innerHeight", "get").mockReturnValue(600);

      // 트리거가 뷰포트 모서리에 붙어있어 아래/오른쪽 공간이 없다.
      vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({
        top: 580,
        bottom: 600,
        left: 780,
        right: 800,
        width: 20,
        height: 20,
        x: 0,
        y: 0,
        toJSON: () => {},
      });
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("flips bottom -> top when there is no space below", () => {
      const { getByTestId } = render(
        <AlwaysOpenTestComponent position="bottom" />,
      );

      const trigger = getByTestId("popover-trigger");
      fireEvent.click(trigger);

      const content = getByTestId("popover-content");
      expect(content.style.top).toBe("560px");
      expect(content.style.left).toBe("780px");

      const arrow = getByTestId("popover-arrow");
      checkArrowPosition(arrow, "top");
    });

    it("flips right -> left when there is no space to the right", () => {
      const { getByTestId } = render(
        <AlwaysOpenTestComponent position="right" />,
      );

      const trigger = getByTestId("popover-trigger");
      fireEvent.click(trigger);

      const content = getByTestId("popover-content");
      expect(content.style.top).toBe("580px");
      expect(content.style.left).toBe("760px");

      const arrow = getByTestId("popover-arrow");
      checkArrowPosition(arrow, "left");
    });
  });

  describe("positions - no flip or shift needed", () => {
    beforeEach(() => {
      vi.spyOn(globalThis.window, "innerWidth", "get").mockReturnValue(800);
      vi.spyOn(globalThis.window, "innerHeight", "get").mockReturnValue(600);

      // 어느 방향으로 렌더링해도 충분한 공간이 있도록 세팅한다.
      vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({
        top: 200,
        bottom: 220,
        left: 200,
        right: 220,
        width: 20,
        height: 20,
        x: 0,
        y: 0,
        toJSON: () => {},
      });
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("renders bottom without shift (sufficient space)", () => {
      const { getByTestId } = render(
        <AlwaysOpenTestComponent position="bottom" />,
      );

      const trigger = getByTestId("popover-trigger");
      fireEvent.click(trigger);

      const content = getByTestId("popover-content");
      expect(content.style.top).toBe("220px");
      expect(content.style.left).toBe("200px");

      const arrow = getByTestId("popover-arrow");
      checkArrowPosition(arrow, "bottom");
    });
  });

  describe("positions - shift when floating is wider than trigger", () => {
    beforeEach(() => {
      vi.spyOn(globalThis.window, "innerWidth", "get").mockReturnValue(800);
      vi.spyOn(globalThis.window, "innerHeight", "get").mockReturnValue(600);
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("shifts right when floating overflows the left edge (natural < 0)", () => {
      // trigger: left=0, width=10 → naturalX = 0+5-15 = -10 → shiftX=10 → x=0, y=120
      vi.spyOn(
        HTMLElement.prototype,
        "getBoundingClientRect",
      ).mockImplementation(function (this: HTMLElement) {
        if (this.dataset.testid === "popover-trigger") {
          return {
            top: 100,
            bottom: 120,
            left: 0,
            right: 10,
            width: 10,
            height: 20,
            x: 0,
            y: 0,
            toJSON: () => {},
          } as DOMRect;
        }
        return {
          top: 0,
          bottom: 20,
          left: 0,
          right: 30,
          width: 30,
          height: 20,
          x: 0,
          y: 0,
          toJSON: () => {},
        } as DOMRect;
      });

      const { getByTestId } = render(
        <AlwaysOpenTestComponent position="bottom" />,
      );

      const content = getByTestId("popover-content");
      expect(content.style.left).toBe("0px");
      expect(content.style.top).toBe("120px");
    });

    it("shifts left when floating overflows the right edge (natural > max)", () => {
      // trigger: left=790, width=10 → naturalX=780, max=770 → shiftX=-10 → x=770, y=120
      vi.spyOn(
        HTMLElement.prototype,
        "getBoundingClientRect",
      ).mockImplementation(function (this: HTMLElement) {
        if (this.dataset.testid === "popover-trigger") {
          return {
            top: 100,
            bottom: 120,
            left: 790,
            right: 800,
            width: 10,
            height: 20,
            x: 0,
            y: 0,
            toJSON: () => {},
          } as DOMRect;
        }
        return {
          top: 0,
          bottom: 20,
          left: 0,
          right: 30,
          width: 30,
          height: 20,
          x: 0,
          y: 0,
          toJSON: () => {},
        } as DOMRect;
      });

      const { getByTestId } = render(
        <AlwaysOpenTestComponent position="bottom" />,
      );

      const content = getByTestId("popover-content");
      expect(content.style.left).toBe("770px");
      expect(content.style.top).toBe("120px");
    });
  });

  describe("unmountOnHide behavior", () => {
    it("does not render content when closed if unmountOnHide is true", () => {
      const { queryByTestId } = render(<TestComponent unmountOnHide />);

      expect(queryByTestId("popover-content")).toBeNull();
    });
  });
});
