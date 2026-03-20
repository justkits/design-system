import { type RefObject, useEffect } from "react";

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
