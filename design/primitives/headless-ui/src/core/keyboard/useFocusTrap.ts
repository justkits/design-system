import { useEffect } from "react";

import { getFocusableElements } from "./utils";

/**
 * 주어진 target 요소 내부로 Focus를 가두는 훅.
 *  - target 내부에서 Tab 키를 이용한 포커스 이동이 무한 루프를 돌도록 한다.
 * @param targetRef Focus Trap을 적용할 대상 요소의 Ref
 * @param enabled Focus Trap의 활성화 여부
 */
export function useFocusTrap(
  targetRef: React.RefObject<HTMLElement | null>,
  enabled: boolean,
) {
  useEffect(() => {
    if (!enabled || !targetRef.current) return;

    const handler = (event: KeyboardEvent) => {
      if (
        event.key !== "Tab" ||
        !targetRef.current?.contains(document.activeElement)
      ) {
        return;
      }

      const focusables = getFocusableElements(targetRef.current);

      if (focusables.length === 0) {
        event.preventDefault();
        targetRef.current.focus();
        return;
      }

      const firstElement = focusables[0];
      const lastElement = focusables.at(-1);

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }

      // 나머지는 기본 동작으로 처리가 된다
    };

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [enabled, targetRef]);
}
