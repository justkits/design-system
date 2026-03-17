import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

export function prefersReducedMotion(): boolean {
  if (globalThis.window === undefined) return false;
  return globalThis.window.matchMedia(QUERY).matches;
}

/**
 * OS의 prefers-reduced-motion 설정을 반응형으로 구독하는 훅.
 * 설정이 변경되면 컴포넌트를 리렌더링한다.
 */
export function useReducedMotion(): boolean {
  const [matches, setMatches] = useState<boolean>(() => prefersReducedMotion());

  useEffect(() => {
    const mq = globalThis.window.matchMedia(QUERY);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener("change", handler);

    return () => mq.removeEventListener("change", handler);
  }, []);

  return matches;
}
