import { AnimationDelay } from "@/tokens/delay";
import { AnimationDuration } from "@/tokens/duration";
import { AnimationEasingOptions } from "@/tokens/easing";

export type TransitionAnimationNames =
  | "fade"
  | "pop"
  | "slide-up"
  | "slide-down"
  | "slide-left"
  | "slide-right";

export type TransitionAnimationOptions = {
  name: TransitionAnimationNames;
  easing?: AnimationEasingOptions;
  duration?: AnimationDuration;
  delay?: AnimationDelay;
  exiting?: boolean;
};

export function resolveDuration(duration: AnimationDuration): number {
  if (duration === "fast") {
    return 400;
  }
  if (duration === "normal") {
    return 600;
  }
  if (duration === "slow") {
    return 800;
  }

  return duration;
}
