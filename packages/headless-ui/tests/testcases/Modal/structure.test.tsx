import { fireEvent, render } from "@testing-library/react";
import { renderToString } from "react-dom/server";

import { Modal } from "@/Modal";
import { setupConsoleSpy, setupSSR } from "../_setup";
import { TestComponent } from "./_setup";

describe("Modal - structure", () => {
  const { warnSpy } = setupConsoleSpy("development");

  describe("SSR environment", () => {
    setupSSR();

    it("renders in-place (portal bypassed before mount)", () => {
      // window/document가 없는 SSR 환경에서는 useSyncExternalStore가 서버 스냅샷(false)을 사용하므로
      const html = renderToString(<TestComponent />);

      expect(html).toContain('data-testid="modal-trigger"');
    });
  });

  it("always renders in portal mode", () => {
    // Modal은 portal 모드만 지원하므로, content가 document.body에 렌더링되어야 한다.
    const { getByTestId } = render(<TestComponent />);

    fireEvent.click(getByTestId("modal-trigger"));

    expect(getByTestId("modal-content").parentElement).toBe(document.body);
    expect(getByTestId("modal-overlay").parentElement).toBe(document.body);

    // trigger는 portal 안에 포함되지 않는다.
    expect(getByTestId("modal-trigger").parentElement).not.toBe(document.body);
  });

  describe("Modal.Content", () => {
    it("must be used within the Modal wrapper", () => {
      expect(() => render(<Modal.Content>Example</Modal.Content>)).toThrow(
        "Modal Components must be used within the Modal wrapper",
      );
    });
  });

  describe("Modal.Title", () => {
    it("must be used within Modal.Content", () => {
      expect(() =>
        render(
          <Modal>
            <Modal.Title>Title</Modal.Title>
          </Modal>,
        ),
      ).toThrow("Modal.Title must be used within Modal.Content");
    });

    it("supports asChild property", () => {
      const { getByTestId } = render(
        <Modal isOpen onOpenChange={() => {}}>
          <Modal.Content>
            <Modal.Title asChild>
              <h1 data-testid="custom-title">Custom Title</h1>
            </Modal.Title>
          </Modal.Content>
        </Modal>,
      );

      expect(getByTestId("custom-title")).toBeTruthy();
    });
  });

  describe("Modal.Close", () => {
    it("must be used within Modal.Content", () => {
      expect(() =>
        render(
          <Modal>
            <Modal.Close>Close</Modal.Close>
          </Modal>,
        ),
      ).toThrow("Modal.Close must be used within Modal.Content");
    });

    it("supports asChild property", () => {
      const { getByTestId } = render(
        <Modal isOpen onOpenChange={() => {}}>
          <Modal.Content>
            <Modal.Close asChild>
              <button data-testid="custom-close-button">Custom Close</button>
            </Modal.Close>
          </Modal.Content>
        </Modal>,
      );

      expect(getByTestId("custom-close-button")).toBeTruthy();
    });
  });

  describe("Modal.Overlay", () => {
    it("must be used within the Modal wrapper", () => {
      expect(() => render(<Modal.Overlay />)).toThrow(
        "Modal Components must be used within the Modal wrapper",
      );
    });

    it("should render outside Modal.Content", () => {
      // 그렇지 않으면 dev mode에서는 경고를 콘솔에 출력한다.
      render(
        <Modal isOpen onOpenChange={() => {}}>
          <Modal.Content data-testid="modal-content">
            <Modal.Overlay data-testid="modal-overlay" />
          </Modal.Content>
        </Modal>,
      );

      expect(warnSpy).toHaveBeenCalledWith(
        "Modal.Overlay should be rendered outside of Modal.Content. Please move Modal.Overlay outside of Modal.Content to avoid unexpected behavior.",
      );
    });
  });

  describe("Modal.Trigger", () => {
    it("must be used within the Modal wrapper", () => {
      expect(() => render(<Modal.Trigger>Trigger</Modal.Trigger>)).toThrow(
        "Modal Components must be used within the Modal wrapper",
      );
    });

    it("should render outside Modal.Content", () => {
      // 그렇지 않으면 dev mode에서는 경고를 콘솔에 출력한다.
      render(
        <Modal isOpen onOpenChange={() => {}}>
          <Modal.Content data-testid="modal-content">
            <Modal.Trigger data-testid="modal-trigger">Trigger</Modal.Trigger>
          </Modal.Content>
        </Modal>,
      );

      expect(warnSpy).toHaveBeenCalledWith(
        "Modal.Trigger should be rendered outside of Modal.Content. Please move Modal.Trigger outside of Modal.Content to avoid unexpected behavior.",
      );
    });

    it("supports asChild property", () => {
      const { getByTestId } = render(
        <Modal isOpen onOpenChange={() => {}}>
          <Modal.Content>
            <Modal.Trigger asChild>
              <button data-testid="custom-trigger">Custom Trigger</button>
            </Modal.Trigger>
          </Modal.Content>
        </Modal>,
      );

      expect(getByTestId("custom-trigger")).toBeTruthy();
    });
  });
});
