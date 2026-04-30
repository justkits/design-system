import { useEffect } from "react";

/**
 * Escape 키가 눌렸을 때 closeFn이 호출되는 커스텀 훅.
 * @param closeFn Escape 키가 눌렸을 때 호출되는 함수
 * @param enabled Escape 키 이벤트 리스너 활성화 여부 (기본값: true)
 */
export function useEscapeClose(closeFn: () => void, enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeFn();
      }
    };

    globalThis.window.addEventListener("keydown", handleKeyDown);

    return () => {
      globalThis.window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeFn, enabled]);
}
