import { type RefObject, useEffect, useRef } from "react";

type UseLongTouchOptions = {
  delay?: number;
  isActive?: boolean;
};

export function useLongTouch(
  ref: RefObject<HTMLElement | null>,
  callback: () => void,
  { delay = 500, isActive = true }: UseLongTouchOptions = {},
) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !isActive) return;

    const clear = () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    const onTouchStart = () => {
      timerRef.current = setTimeout(callback, delay);
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", clear);
    el.addEventListener("touchmove", clear);
    el.addEventListener("touchcancel", clear);

    return () => {
      clear();
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", clear);
      el.removeEventListener("touchmove", clear);
      el.removeEventListener("touchcancel", clear);
    };
  }, [ref, callback, delay, isActive]);
}
