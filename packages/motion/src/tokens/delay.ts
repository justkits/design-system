export type AnimationDelay = number | "none" | "short" | "medium" | "long";

export function resolveDelay(delay: AnimationDelay): string {
  if (delay === "none") {
    return "0ms";
  }
  if (delay === "short") {
    return "100ms";
  }
  if (delay === "medium") {
    return "300ms";
  }
  if (delay === "long") {
    return "500ms";
  }

  return delay + "ms";
}
