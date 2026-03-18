export type AnimationEasingOptions =
  | "linear"
  | "ease"
  | "ease-in"
  | "ease-out"
  | "ease-in-out"
  | "justkits-1"
  | "justkits-2";

export type AnimationTimingFunction =
  | "linear"
  | "ease"
  | "ease-in"
  | "ease-out"
  | "ease-in-out"
  | "cubic-bezier(0.4, 0, 0.2, 1)"
  | "cubic-bezier(0.3, 0.8, 0.2, 1.3)";

export function resolveEasing(
  easing: AnimationEasingOptions,
): AnimationTimingFunction {
  if (easing === "justkits-1") return "cubic-bezier(0.4, 0, 0.2, 1)";
  if (easing === "justkits-2") return "cubic-bezier(0.3, 0.8, 0.2, 1.3)";
  return easing;
}
