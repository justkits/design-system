import {
  Button as HeadlessButton,
  type ButtonProps,
} from "@justkits/headless-ui/Button";
import { clsx } from "clsx";

import { styles } from "./styles.css";

type Props = {
  variant?: "primary" | "subtle" | "outline" | "transparent";
  size?: "small" | "medium" | "large" | "fill";
} & ButtonProps;

export function Button({
  children,
  className,
  variant = "transparent",
  size = "medium",
  isLoading = false,
  ...rest
}: Readonly<Props>) {
  return (
    <HeadlessButton
      {...rest}
      className={clsx(styles.button({ variant, size }), className)}
    >
      {isLoading ? <div className={styles.spinner({ size })} /> : children}
    </HeadlessButton>
  );
}
