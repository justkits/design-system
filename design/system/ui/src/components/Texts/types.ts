type TagOptions = Pick<
  React.JSX.IntrinsicElements,
  "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span"
>;

export type TextVariants =
  | "hero"
  | "titleLarge"
  | "titleMedium"
  | "titleSmall"
  | "bodyLarge"
  | "bodyMedium"
  | "bodySmall"
  | "description";

export const tagMap: Record<TextVariants, keyof TagOptions> = {
  hero: "h1",
  titleLarge: "h2",
  titleMedium: "h3",
  titleSmall: "h4",
  bodyLarge: "p",
  bodyMedium: "p",
  bodySmall: "p",
  description: "p",
};

export type TextProps<T extends TextVariants> = {
  variant: T;
  as?: keyof TagOptions;
  className?: string;
} & (
  | {
      text: string;
      children?: never;
    }
  | {
      text?: never;
      children: React.ReactNode;
    }
);
