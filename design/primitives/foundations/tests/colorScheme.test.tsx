import { act, fireEvent, render } from "@testing-library/react";

import { ColorSchemeScript } from "@/colors/scheme/script";
import { ColorSchemeProvider } from "@/colors/scheme";
import { TestComponent, mockMatchMedia } from "./_setup";

describe("color scheme", () => {
  describe("ColorSchemeScript", () => {
    it("should render children correctly (default)", () => {
      const { container } = render(<ColorSchemeScript />);
      expect(container).toBeTruthy();
    });
  });

  describe("ColorSchemeProvider", () => {
    const { simulateChange } = mockMatchMedia({ preferDark: false });

    it("should render children correctly (default)", () => {
      const { container, getByText } = render(
        <ColorSchemeProvider>
          <TestComponent />
        </ColorSchemeProvider>,
      );

      expect(getByText("Current Theme Mode: system")).toBeTruthy();
      expect(container.ownerDocument.documentElement.dataset.colorScheme).toBe(
        "light",
      );
      expect(container.ownerDocument.documentElement.style.colorScheme).toBe(
        "light",
      );
    });

    it("should handle mode change correctly", () => {
      const { container, getByText } = render(
        <ColorSchemeProvider>
          <TestComponent />
        </ColorSchemeProvider>,
      );

      // 초기에는 system 모드
      expect(getByText("Current Theme Mode: system")).toBeTruthy();

      fireEvent.click(getByText("Set Light Mode"));
      expect(getByText("Current Theme Mode: light")).toBeTruthy();
      expect(container.ownerDocument.documentElement.dataset.colorScheme).toBe(
        "light",
      );
      expect(container.ownerDocument.documentElement.style.colorScheme).toBe(
        "light",
      );

      fireEvent.click(getByText("Set Dark Mode"));
      expect(getByText("Current Theme Mode: dark")).toBeTruthy();
      expect(container.ownerDocument.documentElement.dataset.colorScheme).toBe(
        "dark",
      );
      expect(container.ownerDocument.documentElement.style.colorScheme).toBe(
        "dark",
      );
    });

    it("should handle system-preference correctly", async () => {
      const { container, getByText } = render(
        <ColorSchemeProvider>
          <TestComponent />
        </ColorSchemeProvider>,
      );

      // 초기에는 dark 모드 (앞선 테스트 때문에)
      expect(getByText("Current Theme Mode: dark")).toBeTruthy();

      // 시스템 설정으로 변경
      fireEvent.click(getByText("Set System Mode"));
      expect(getByText("Current Theme Mode: system")).toBeTruthy();

      // 시스템 초기 설정은 light
      expect(container.ownerDocument.documentElement.dataset.colorScheme).toBe(
        "light",
      );

      // 시스템 설정을 light에서 dark로 변경
      act(() => {
        simulateChange(true);
      });

      expect(container.ownerDocument.documentElement.dataset.colorScheme).toBe(
        "dark",
      );

      // 시스템 설정을 다시 dark에서 light로 변경
      act(() => {
        simulateChange(false);
      });

      expect(container.ownerDocument.documentElement.dataset.colorScheme).toBe(
        "light",
      );
    });
  });

  describe("corner case", () => {
    it("useColorScheme should throw an error when used outside ColorSchemeProvider", () => {
      const consoleErrorSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      expect(() => render(<TestComponent />)).toThrow(
        "useColorScheme must be used within a ColorSchemeProvider",
      );

      consoleErrorSpy.mockRestore();
    });

    it("should gracefully handle absence of window.matchMedia and localStorage", () => {
      const originalMatchMedia = globalThis.window.matchMedia;
      const originalLocalStorage = globalThis.localStorage;

      // @ts-expect-error simulate missing matchMedia (SSR guard)
      globalThis.window.matchMedia = undefined;
      // @ts-expect-error simulate missing localStorage (SSR guard)
      globalThis.localStorage = undefined;

      expect(() =>
        render(
          <ColorSchemeProvider>
            <TestComponent />
          </ColorSchemeProvider>,
        ),
      ).not.toThrow();

      // 원래 상태로 복원
      globalThis.window.matchMedia = originalMatchMedia;
      Object.defineProperty(globalThis, "localStorage", {
        value: originalLocalStorage,
        writable: true,
      });
    });
  });
});
