import clsx from "clsx";

import { tagMap, type TextProps, type TextVariants } from "./types";
import { styles } from "./styles.css";

export function Text<T extends TextVariants>({
  variant,
  as,
  text,
  children,
  className,
  ...rest
}: Readonly<TextProps<T>>) {
  const Component = as || tagMap[variant];

  return (
    <Component {...rest} className={clsx(styles.text({ variant }), className)}>
      {text || children}
    </Component>
  );
}
