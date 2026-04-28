import { Button, type ButtonProps } from "@justkits/headless-ui/Button";

import { useInternalSidebar, useSidebar } from "../contexts/sidebar";

export function SidebarToggle({
  children,
  ...rest
}: Readonly<Omit<ButtonProps, "onClick" | "aria-controls" | "aria-expanded">>) {
  const { isExpanded, toggleSidebar, contentId } = useSidebar();
  const { isMounted } = useInternalSidebar();

  if (!isMounted) return null;

  return (
    <Button
      {...rest}
      onClick={toggleSidebar}
      aria-controls={contentId}
      aria-expanded={isExpanded}
      data-expanded={isExpanded}
    >
      {children}
    </Button>
  );
}
