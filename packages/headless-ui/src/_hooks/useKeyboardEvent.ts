import { useEffect } from "react";

export function useKeyboardEvent(
  key: string,
  callback: () => void,
  isActive: boolean = true,
) {
  useEffect(() => {
    if (!isActive) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === key) callback();
    };

    globalThis.addEventListener("keydown", onKeyDown);

    return () => globalThis.removeEventListener("keydown", onKeyDown);
  }, [key, callback, isActive]);
}
