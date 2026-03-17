import { CSSProperties } from "react";

import { AnimationDelay, resolveDelay } from "@/tokens/delay";
import { AnimationTimingFunction } from "@/tokens/easing";
import { AnimationIterations } from "@/tokens/iterations";
import { PresetKeyframesNames } from "@/tokens/name";
import { prefersReducedMotion } from "./reduced-motion";

export function generateStyleFromPreset(
  name: PresetKeyframesNames,
  easing: AnimationTimingFunction,
  duration: number,
  iterations: AnimationIterations,
  delay: AnimationDelay,
): CSSProperties {
  if (prefersReducedMotion()) return {};

  return {
    animationName: name,
    animationTimingFunction: easing,
    animationDuration: duration + "ms",
    animationIterationCount: iterations,
    animationDelay: resolveDelay(delay),
    animationFillMode: "both",
  };
}
