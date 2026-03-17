import { resolveDelay } from "@/tokens/delay";
import { resolveEasing } from "@/tokens/easing";

describe("resolveDelay", () => {
  it("should return correct delay for predefined values", () => {
    expect(resolveDelay("none")).toBe("0ms");
    expect(resolveDelay("short")).toBe("100ms");
    expect(resolveDelay("medium")).toBe("300ms");
    expect(resolveDelay("long")).toBe("500ms");
  });

  it("should return correct delay for numeric values", () => {
    expect(resolveDelay(0)).toBe("0ms");
    expect(resolveDelay(150)).toBe("150ms");
    expect(resolveDelay(500)).toBe("500ms");
  });
});

describe("resolveEasing", () => {
  it("should return correct easing for predefined values", () => {
    expect(resolveEasing("justkits-1")).toBe("cubic-bezier(0.4, 0, 0.2, 1)");
    expect(resolveEasing("justkits-2")).toBe(
      "cubic-bezier(0.3, 0.8, 0.2, 1.3)",
    );
  });

  it("should return the same value for standard easing options", () => {
    expect(resolveEasing("linear")).toBe("linear");
    expect(resolveEasing("ease")).toBe("ease");
    expect(resolveEasing("ease-in")).toBe("ease-in");
    expect(resolveEasing("ease-out")).toBe("ease-out");
    expect(resolveEasing("ease-in-out")).toBe("ease-in-out");
  });
});
