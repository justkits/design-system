import { useCallback, useLayoutEffect, useState } from "react";

import { computeFloatingPosition, arrowStyle } from "./utils";
import type { FloatingPlacement } from "./types";

/**
 * Trigger 요소를 기준으로 렌더링되는 Floating 요소의 위치를 계산하는 훅.
 *  - 화면을 벗어날 것 같으면 자동으로 위치를 반전시키고, 화면 가장자리와 겹치지 않도록 shift 값을 계산한다.
 *  - Trigger나 Floating 요소의 크기가 변경되거나, 화면이 리사이즈 되거나 스크롤될 때 위치를 자동으로 재계산한다.
 * @returns container와 arrow 요소에 적용할 style
 */
export function useFloatingPosition(
  triggerRef: React.RefObject<HTMLElement | null>,
  floatingRef: React.RefObject<HTMLElement | null>,
  defaultPlacement: FloatingPlacement,
  isOpen: boolean = false,
): { container: React.CSSProperties; arrow: React.CSSProperties } {
  const [pos, setPos] = useState({
    placement: defaultPlacement,
    x: 0,
    y: 0,
    shiftX: 0,
    shiftY: 0,
  });

  const updatePosition = useCallback(() => {
    if (!triggerRef.current || !floatingRef.current) return;

    setPos(
      computeFloatingPosition(
        triggerRef.current.getBoundingClientRect(),
        floatingRef.current.getBoundingClientRect(),
        defaultPlacement,
      ),
    );
  }, [defaultPlacement, triggerRef, floatingRef]);

  useLayoutEffect(() => {
    if (!isOpen || !triggerRef.current || !floatingRef.current) return;

    // Trigger나 Floating 요소의 크기가 변경될 때 위치를 업데이트
    const observer = new ResizeObserver(updatePosition);

    observer.observe(triggerRef.current);
    observer.observe(floatingRef.current);

    return () => observer.disconnect();
  }, [isOpen, updatePosition, triggerRef, floatingRef]);

  useLayoutEffect(() => {
    if (!isOpen) return;

    // 열릴 때 초기 위치 계산
    updatePosition();

    // 리사이즈와 스크롤 이벤트에 위치 업데이트 핸들러 등록
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    // 컴포넌트 언마운트 시 이벤트 핸들러 제거
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isOpen, updatePosition]);

  return {
    container: { position: "fixed", top: pos.y, left: pos.x },
    arrow: {
      position: "absolute",
      width: 8,
      height: 8,
      backgroundColor: "inherit",
      ...arrowStyle(pos.placement, pos.shiftX, pos.shiftY),
    },
  };
}
