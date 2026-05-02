import { useEffect, useRef } from "react";

/**
 * 주어진 ref 요소를 길게 터치하면 callback이 호출되는 훅.
 *  - enabled가 false인 경우, 길게 터치해도 callback이 호출되지 않음.
 * @param ref 길게 터치할 요소의 ref
 * @param callback 길게 터치했을 때 호출되는 콜백 함수
 * @param enabled 길게 터치 기능 활성화 여부 (기본값: true)
 * @param threshold 길게 터치로 간주되는 시간 (기본값: 500ms)
 */
export function useLongTouch(
  ref: React.RefObject<HTMLElement | null>,
  callback: () => void,
  enabled = true,
  threshold = 500,
) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || !enabled) return;

    const clear = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    const onTouchStart = () => {
      timerRef.current = setTimeout(() => {
        callback();
      }, threshold);
    };

    element.addEventListener("touchstart", onTouchStart);
    element.addEventListener("touchend", clear);
    element.addEventListener("touchmove", clear);
    element.addEventListener("touchcancel", clear);

    return () => {
      clear(); // 타이머 정리
      element.removeEventListener("touchstart", onTouchStart);
      element.removeEventListener("touchend", clear);
      element.removeEventListener("touchmove", clear);
      element.removeEventListener("touchcancel", clear);
    };
  }, [ref, callback, enabled, threshold]);
}
