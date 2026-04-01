import { describe, it, expect } from "vitest";
import { breakpointQueries } from "@/media/breakpoints";

const xs = 480;
const sm = 767;
const md = 1023;
const lg = 1279;
const xl = 1440;

describe("breakpointQueries.only", () => {
  it("mobilePortrait targets max-width 480px", () => {
    expect(breakpointQueries.only.mobilePortrait).toBe(
      `screen and (max-width: ${xs}px)`,
    );
  });

  it("mobileLandscape targets 481px - 767px", () => {
    expect(breakpointQueries.only.mobileLandscape).toBe(
      `screen and ((min-width: ${xs + 1}px) and (max-width: ${sm}px))`,
    );
  });

  it("tabletPortrait targets 768px - 1023px", () => {
    expect(breakpointQueries.only.tabletPortrait).toBe(
      `screen and ((min-width: ${sm + 1}px) and (max-width: ${md}px))`,
    );
  });

  it("tabletLandscape targets 1024px - 1279px", () => {
    expect(breakpointQueries.only.tabletLandscape).toBe(
      `screen and ((min-width: ${md + 1}px) and (max-width: ${lg}px))`,
    );
  });

  it("laptop targets 1280px - 1440px", () => {
    expect(breakpointQueries.only.laptop).toBe(
      `screen and (min-width: ${lg + 1}px) and (max-width: ${xl}px)`,
    );
  });

  it("desktop targets min-width 1441px", () => {
    expect(breakpointQueries.only.desktop).toBe(
      `screen and (min-width: ${xl + 1}px)`,
    );
  });
});

describe("breakpointQueries.below", () => {
  it("mobileLandscape targets max-width 767px", () => {
    expect(breakpointQueries.below.mobileLandscape).toBe(
      `screen and (max-width: ${sm}px)`,
    );
  });

  it("tabletPortrait targets max-width 1023px", () => {
    expect(breakpointQueries.below.tabletPortrait).toBe(
      `screen and (max-width: ${md}px)`,
    );
  });

  it("tabletLandscape targets max-width 1279px", () => {
    expect(breakpointQueries.below.tabletLandscape).toBe(
      `screen and (max-width: ${lg}px)`,
    );
  });

  it("laptop targets max-width 1440px", () => {
    expect(breakpointQueries.below.laptop).toBe(
      `screen and (max-width: ${xl}px)`,
    );
  });

  it("desktop targets max-width 1440px", () => {
    expect(breakpointQueries.below.desktop).toBe(
      `screen and (max-width: ${xl}px)`,
    );
  });
});

describe("breakpointQueries.above", () => {
  it("mobilePortrait targets min-width 481px", () => {
    expect(breakpointQueries.above.mobilePortrait).toBe(
      `screen and (min-width: ${xs + 1}px)`,
    );
  });

  it("mobileLandscape targets min-width 768px", () => {
    expect(breakpointQueries.above.mobileLandscape).toBe(
      `screen and (min-width: ${sm + 1}px)`,
    );
  });

  it("tabletPortrait targets min-width 1024px", () => {
    expect(breakpointQueries.above.tabletPortrait).toBe(
      `screen and (min-width: ${md + 1}px)`,
    );
  });

  it("tabletLandscape targets min-width 1280px", () => {
    expect(breakpointQueries.above.tabletLandscape).toBe(
      `screen and (min-width: ${lg + 1}px)`,
    );
  });

  it("laptop targets min-width 1441px", () => {
    expect(breakpointQueries.above.laptop).toBe(
      `screen and (min-width: ${xl + 1}px)`,
    );
  });
});

describe("breakpointQueries structure", () => {
  it("has only, below, above keys", () => {
    expect(breakpointQueries).toHaveProperty("only");
    expect(breakpointQueries).toHaveProperty("below");
    expect(breakpointQueries).toHaveProperty("above");
  });

  it("all queries start with 'screen and'", () => {
    for (const group of Object.values(breakpointQueries)) {
      for (const query of Object.values(group)) {
        expect(query).toMatch(/^screen and /);
      }
    }
  });
});
