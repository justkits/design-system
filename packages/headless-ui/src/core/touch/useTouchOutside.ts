import { type RefObject, useEffect } from "react";

/**
 * 주어진 ref 요소 밖을 터치하면 callback이 호출되는 훅. (모바일에서 클릭 대신 터치 이벤트를 감지하기 위해 사용)
 *  - isActive가 false인 경우, 훅이 비활성화되어 콜백이 호출되지 않는다.
 * @param ref - 감시할 요소의 ref
 * @param callback - 요소 밖이 터치되었을 때 호출되는 콜백 함수
 * @param isActive - 훅의 활성화 여부. 기본값 true
 * @return void
 */
export function useTouchOutside(
  ref: RefObject<HTMLElement | null>,
  callback: () => void,
  isActive: boolean = true,
) {
  useEffect(() => {
    const handleTouchOutside = (event: Event) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    if (!isActive) return;

    document.addEventListener("touchstart", handleTouchOutside);

    return () => {
      document.removeEventListener("touchstart", handleTouchOutside);
    };
  }, [ref, callback, isActive]);
}
