import { useEffect, useRef } from "react";

import { getFocusableElements } from "./utils";

/**
 * 주어진 target 요소 내부로 자동으로 Focus를 이동시키는 훅.
 *  - enabled flag가 true가 되면 곧바로 target 내 적절한 요소로 Focus를 이동시킨다.
 *  - enabled flag가 false가 되면, returnRef 혹은 이전 Focus 요소로 Focus를 복귀시킨다.
 */
export function useAutoFocus(
  targetRef: React.RefObject<HTMLElement | null>,
  enabled: boolean,
  returnRef?: React.RefObject<HTMLElement | null>,
) {
  const returnFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!enabled || !targetRef.current) return;

    if (returnRef) {
      returnFocusRef.current = returnRef.current;
    } else {
      returnFocusRef.current = document.activeElement as HTMLElement;
    }

    const focusables = getFocusableElements(targetRef.current);

    if (focusables.length > 0) {
      // focusable이 있다면, 그 첫번째 요소로 Focus 이동
      focusables[0].focus();
    } else {
      // 없다면, target 요소 자체로 Focus 이동
      targetRef.current.focus();
    }

    // cleanup function: Focus 복귀
    return () => {
      if (returnFocusRef.current) {
        returnFocusRef.current.focus();
      }
    };
  }, [enabled, targetRef, returnRef]);
}
