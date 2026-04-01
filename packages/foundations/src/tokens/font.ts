export interface FontTokens {
  // headings
  hero: string;
  titleLarge: string;
  titleMedium: string;
  titleSmall: string;
  // body
  bodyLarge: string;
  bodyMedium: string;
  bodySmall: string;
  description: string;
  // others
  code: string;
  quote: string;
}

export const fontVariables: FontTokens = {
  hero: "font-hero",
  titleLarge: "font-title-large",
  titleMedium: "font-title-medium",
  titleSmall: "font-title-small",
  bodyLarge: "font-body-large",
  bodyMedium: "font-body-medium",
  bodySmall: "font-body-small",
  description: "font-description",
  code: "font-code",
  quote: "font-quote",
};

export const fontCSSVariables: FontTokens = {
  hero: `var(--font-hero)`,
  titleLarge: `var(--font-title-large)`,
  titleMedium: `var(--font-title-medium)`,
  titleSmall: `var(--font-title-small)`,
  bodyLarge: `var(--font-body-large)`,
  bodyMedium: `var(--font-body-medium)`,
  bodySmall: `var(--font-body-small)`,
  description: `var(--font-description)`,
  code: `var(--font-code)`,
  quote: `var(--font-quote)`,
};
