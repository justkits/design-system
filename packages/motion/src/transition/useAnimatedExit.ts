import { useCallback, useRef, useState } from "react";

import { AnimationDuration } from "@/tokens/duration";
import { useReducedMotion } from "@/utils/reduced-motion";
import { resolveDuration } from "./lib";

export function useAnimatedExit(
  duration: AnimationDuration,
  onClose?: () => void | Promise<void>,
) {
  const [exiting, setExiting] = useState<boolean>(false);
  const exitingRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reducedMotion = useReducedMotion();

  const clearTimer = () => {
    if (timerRef.current) {
      globalThis.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const startClosing = useCallback(() => {
    if (exitingRef.current) return;

    exitingRef.current = true;
    setExiting(true);
    clearTimer();

    const durationMs = reducedMotion ? 0 : resolveDuration(duration);

    timerRef.current = globalThis.setTimeout(async () => {
      await onClose?.();
      exitingRef.current = false;
      setExiting(false);
      clearTimer();
    }, durationMs);
  }, [onClose, duration, reducedMotion]);

  return { exiting, startClosing };
}
