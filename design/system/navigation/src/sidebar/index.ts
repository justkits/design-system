import { SidebarHeader } from "./Header";
import { SidebarItem } from "./Item";
import { SidebarMain } from "./Main";
import { SidebarToggle } from "./Toggle";
import { SidebarSection } from "./section/Section";
import { SidebarSectionChildren } from "./section/Children";
import { SidebarSectionToggle } from "./section/Toggle";
import { SidebarProvider } from "./Provider";

export const Sidebar = Object.assign(SidebarProvider, {
  Header: SidebarHeader,
  Main: SidebarMain,
  Item: SidebarItem,
  Toggle: SidebarToggle,
  Section: SidebarSection,
  SectionChildren: SidebarSectionChildren,
  SectionToggle: SidebarSectionToggle,
});

export { SidebarProvider } from "./Provider";
export { SidebarHeader } from "./Header";
export { SidebarItem } from "./Item";
export { SidebarMain } from "./Main";
export { SidebarToggle } from "./Toggle";
export { SidebarSection } from "./section/Section";
export { SidebarSectionChildren } from "./section/Children";
export { SidebarSectionToggle } from "./section/Toggle";
