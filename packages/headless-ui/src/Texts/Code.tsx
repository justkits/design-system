import { type HTMLAttributes, type JSX } from "react";

type TagOptions = Pick<JSX.IntrinsicElements, "code" | "pre" | "kbd" | "samp">;

type CodeVariants = "inline" | "block" | "keyboard" | "sample";

const tagMap: Record<CodeVariants, keyof TagOptions> = {
  inline: "code",
  block: "pre",
  keyboard: "kbd",
  sample: "samp",
};

type CodeProps = {
  variant: CodeVariants;
} & HTMLAttributes<HTMLElement>;

export function Code({ variant, children, ...rest }: Readonly<CodeProps>) {
  const Component = tagMap[variant];

  return <Component {...rest}>{children}</Component>;
}
