import clsx from "clsx";

import { useSidebar } from "../contexts/sidebar";
import { styles } from "./styles.css";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function SidebarContent({
  children,
  className,
  style,
  ...rest
}: Readonly<Props>) {
  const { scope, isExpanded, widthExpanded, headerHeight } = useSidebar();

  const HtmlTag = scope === "app" ? "aside" : "div";

  return (
    <HtmlTag
      {...rest}
      className={clsx(styles.contents, className)}
      style={{
        ...style,
        width: isExpanded ? widthExpanded : 0,
        height: `calc(100vh - ${headerHeight}px)`,
      }}
    >
      {children}
    </HtmlTag>
  );
}
