import { useLayoutEffect } from "react";
import clsx from "clsx";

import { useInternalSidebar, useSidebar } from "../contexts/sidebar";
import { styles } from "./styles.css";

export interface SidebarMainProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  "role" | "id" | "children"
> {
  children: React.ReactNode; // 필수로 변경
}

export function SidebarMain({
  children,
  "aria-label": ariaLabel,
  className,
  ...rest
}: Readonly<SidebarMainProps>) {
  const { isExpanded, contentId } = useSidebar();
  const { mountSidebar, unmountSidebar } = useInternalSidebar();

  useLayoutEffect(() => {
    mountSidebar();
    return () => {
      unmountSidebar();
    };
  }, [mountSidebar, unmountSidebar]);

  return (
    <nav
      {...rest}
      id={contentId}
      role="navigation"
      className={clsx(styles.main, className)}
      aria-label={ariaLabel || "Sidebar Main Navigation"}
      data-expanded={isExpanded}
    >
      {children}
    </nav>
  );
}
