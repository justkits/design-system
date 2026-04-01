import { describe, it, expect } from "vitest";
import { colorVariables, colorCSSVariables } from "@/tokens/colors";
import {
  spacingVariables as sv,
  spacingCSSVariables as scv,
} from "@/tokens/spacing";
import { fontVariables as fv, fontCSSVariables as fcv } from "@/tokens/font";
import {
  radiusVariables as rv,
  radiusCSSVariables as rcv,
} from "@/tokens/radius";
import {
  elevationVariables as ev,
  elevationCSSVariables as ecv,
} from "@/tokens/elevation";

describe("color tokens", () => {
  it("colorVariables has all required keys", () => {
    const keys = [
      "primary",
      "primaryHover",
      "onPrimary",
      "secondary",
      "secondaryHover",
      "onSecondary",
      "error",
      "warning",
      "success",
      "info",
      "background",
      "surface",
      "overlay",
      "text",
      "textMuted",
      "textDisabled",
      "border",
      "borderMuted",
      "borderInverted",
    ] as const;
    for (const key of keys) {
      expect(colorVariables[key]).toBeDefined();
    }
  });

  it("colorVariables values are plain strings (no var())", () => {
    for (const value of Object.values(colorVariables)) {
      expect(value).not.toMatch(/^var\(/);
    }
  });

  it("colorCSSVariables values are wrapped in var()", () => {
    for (const value of Object.values(colorCSSVariables)) {
      expect(value).toMatch(/^var\(--/);
      expect(value).toMatch(/\)$/);
    }
  });

  it("colorVariables and colorCSSVariables have the same keys", () => {
    expect(
      Object.keys(colorVariables).sort((a, b) => a.localeCompare(b)),
    ).toEqual(
      Object.keys(colorCSSVariables).sort((a, b) => a.localeCompare(b)),
    );
  });

  it("colorCSSVariables wraps colorVariables with var(--...)", () => {
    for (const key of Object.keys(colorVariables) as Array<
      keyof typeof colorVariables
    >) {
      expect(colorCSSVariables[key]).toBe(`var(--${colorVariables[key]})`);
    }
  });
});

describe("spacing tokens", () => {
  it("spacingVariables has all required keys", () => {
    const keys = ["xs", "sm", "md", "lg", "xl"] as const;
    for (const key of keys) {
      expect(sv[key]).toBeDefined();
    }
  });

  it("spacingVariables values are plain strings (no var())", () => {
    for (const value of Object.values(sv)) {
      expect(value).not.toMatch(/^var\(/);
    }
  });

  it("spacingCSSVariables values are wrapped in var()", () => {
    for (const value of Object.values(scv)) {
      expect(value).toMatch(/^var\(--/);
    }
  });

  it("spacingCSSVariables wraps spacingVariables with var(--...)", () => {
    for (const key of Object.keys(sv) as Array<keyof typeof sv>) {
      expect(scv[key]).toBe(`var(--${sv[key]})`);
    }
  });
});

describe("font tokens", () => {
  it("fontVariables has all required keys", () => {
    const keys = [
      "hero",
      "titleLarge",
      "titleMedium",
      "titleSmall",
      "bodyLarge",
      "bodyMedium",
      "bodySmall",
      "description",
      "code",
      "quote",
    ] as const;
    for (const key of keys) {
      expect(fv[key]).toBeDefined();
    }
  });

  it("fontVariables values are plain strings (no var())", () => {
    for (const value of Object.values(fv)) {
      expect(value).not.toMatch(/^var\(/);
    }
  });

  it("fontCSSVariables values are wrapped in var()", () => {
    for (const value of Object.values(fcv)) {
      expect(value).toMatch(/^var\(--/);
    }
  });

  it("fontCSSVariables wraps fontVariables with var(--...)", () => {
    for (const key of Object.keys(fv) as Array<keyof typeof fv>) {
      expect(fcv[key]).toBe(`var(--${fv[key]})`);
    }
  });
});

describe("radius tokens", () => {
  it("radiusVariables has all required keys", () => {
    const keys = ["sm", "md", "lg", "full"] as const;
    for (const key of keys) {
      expect(rv[key]).toBeDefined();
    }
  });

  it("radiusVariables values are plain strings (no var())", () => {
    for (const value of Object.values(rv)) {
      expect(value).not.toMatch(/^var\(/);
    }
  });

  it("radiusCSSVariables values are wrapped in var()", () => {
    for (const value of Object.values(rcv)) {
      expect(value).toMatch(/^var\(--/);
    }
  });

  it("radiusCSSVariables wraps radiusVariables with var(--...)", () => {
    for (const key of Object.keys(rv) as Array<keyof typeof rv>) {
      expect(rcv[key]).toBe(`var(--${rv[key]})`);
    }
  });
});

describe("elevation tokens", () => {
  it("elevationVariables has all required keys", () => {
    const keys = ["lv1", "lv2", "lv3"] as const;
    for (const key of keys) {
      expect(ev[key]).toBeDefined();
    }
  });

  it("elevationVariables values are plain strings (no var())", () => {
    for (const value of Object.values(ev)) {
      expect(value).not.toMatch(/^var\(/);
    }
  });

  it("elevationCSSVariables values are wrapped in var()", () => {
    for (const value of Object.values(ecv)) {
      expect(value).toMatch(/^var\(--/);
    }
  });

  it("elevationCSSVariables wraps elevationVariables with var(--...)", () => {
    for (const key of Object.keys(ev) as Array<keyof typeof ev>) {
      expect(ecv[key]).toBe(`var(--${ev[key]})`);
    }
  });
});
