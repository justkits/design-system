import { useEffect, useRef } from "react";

/**
 * 주어진 ref 요소 밖을 클릭하면 callback이 호출되는 커스텀 훅. (모바일 터치도 지원한다)
 *  - enabled가 false인 경우에는 동작하지 않으며,
 *  - excludeRef가 주어진 경우, 해당 요소를 클릭해도 콜백이 호출되지 않는다.
 * @param ref 클릭 아웃사이드 이벤트를 감지할 요소의 ref
 * @param callback 클릭 아웃사이드 이벤트가 발생했을 때 호출될 콜백 함수
 * @param enabled 훅의 활성화 여부 (기본값: true)
 * @param excludeRef 클릭 아웃사이드 이벤트에서 제외할 요소의 ref
 */
export function useClickOutside(
  ref: React.RefObject<HTMLElement | null>,
  callback: () => void,
  enabled: boolean = true,
  excludeRef?: React.RefObject<HTMLElement | null>,
) {
  const downRef = useRef<boolean>(false);

  const activationQuery = (target: Node) => {
    return (
      ref.current?.contains(target) || excludeRef?.current?.contains(target)
    );
  };

  useEffect(() => {
    const handleDown = (event: Event) => {
      downRef.current = !activationQuery(event.target as Node);
    };

    const handleUp = (event: Event) => {
      if (downRef.current && !activationQuery(event.target as Node)) {
        callback();
      }

      // 초기화
      downRef.current = false;
    };

    if (!enabled) return;

    document.addEventListener("pointerdown", handleDown);
    document.addEventListener("pointerup", handleUp);

    return () => {
      document.removeEventListener("pointerdown", handleDown);
      document.removeEventListener("pointerup", handleUp);
    };
  }, [ref, callback, enabled, excludeRef]);
}
