import type { ComponentType } from "react";
import type { IconProps } from "@justkits/svg2tsx";

import { ChevronDown } from "./components/ChevronDown";
import { ChevronRight } from "./components/ChevronRight";
import { SidebarClose } from "./components/SidebarClose";
import { SidebarOpen } from "./components/SidebarOpen";

export type IconName =
  | "chevron-down"
  | "chevron-right"
  | "sidebar-close"
  | "sidebar-open";

export const iconMap: Record<IconName, ComponentType<IconProps>> = {
  "chevron-down": ChevronDown,
  "chevron-right": ChevronRight,
  "sidebar-close": SidebarClose,
  "sidebar-open": SidebarOpen,
};
