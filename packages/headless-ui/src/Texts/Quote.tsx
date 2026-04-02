import { type HTMLAttributes, type JSX } from "react";

type TagOptions = Pick<JSX.IntrinsicElements, "blockquote" | "q" | "cite">;

type QuoteVariants = "block" | "inline" | "citation";

const tagMap: Record<QuoteVariants, keyof TagOptions> = {
  block: "blockquote",
  inline: "q",
  citation: "cite",
};

type QuoteProps = {
  variant: QuoteVariants;
} & HTMLAttributes<HTMLElement>;

export function Quote({ variant, children, ...rest }: Readonly<QuoteProps>) {
  const Component = tagMap[variant];

  return <Component {...rest}>{children}</Component>;
}
