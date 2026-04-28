import {
  SectionLinkContent,
  SectionLinkProvider,
  SectionLinkToggle,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarLink,
  SidebarMain,
  SidebarProvider,
  SidebarToggle,
} from "@/sidebar";
import { SectionLinkProviderProps } from "@/sidebar/section-link/properties";

export function TestSidebar() {
  return (
    <SidebarProvider>
      <SidebarToggle>Toggle Sidebar</SidebarToggle>
      <Content />
    </SidebarProvider>
  );
}

export function TestPageSidebar() {
  return (
    <SidebarProvider scope="page" headerHeight={60}>
      <Content />
    </SidebarProvider>
  );
}

export function TestSectionLink(
  props: Readonly<Omit<SectionLinkProviderProps, "children">>,
) {
  return (
    <SidebarProvider>
      <SidebarContent>
        <SidebarMain data-testid="sidebar-main">
          <SidebarLink href="./other-link">Other Link</SidebarLink>
          <SectionLinkProvider {...props}>
            <SidebarLink href="./link">
              <span>Link</span>
              <SectionLinkToggle>Expand Sublinks</SectionLinkToggle>
            </SidebarLink>
            <SectionLinkContent data-testid="section-link-content">
              <SidebarLink href="./link/sublink1">Sub Link 1</SidebarLink>
              <SidebarLink href="./link/sublink2">Sub Link 2</SidebarLink>
            </SectionLinkContent>
          </SectionLinkProvider>
        </SidebarMain>
      </SidebarContent>
    </SidebarProvider>
  );
}

function Content() {
  return (
    <SidebarContent data-testid="sidebar-content">
      <SidebarHeader>
        <span>Header</span>
      </SidebarHeader>
      <SidebarMain data-testid="sidebar-main">
        <SidebarLink href="./test1" isActive>
          Link 1
        </SidebarLink>
        <SidebarLink href="./test2">Link 2</SidebarLink>
        <SectionLinkProvider>
          <SidebarLink href="./test3">
            <span>Link 3</span>
            <SectionLinkToggle>Expand Sublinks</SectionLinkToggle>
          </SidebarLink>
          <SectionLinkContent data-testid="section-link-content">
            <SidebarLink href="./test3/sub1">Sub Link 1</SidebarLink>
            <SidebarLink href="./test3/sub2">Sub Link 2</SidebarLink>
          </SectionLinkContent>
        </SectionLinkProvider>
      </SidebarMain>
      <SidebarFooter>
        <span>Footer</span>
      </SidebarFooter>
    </SidebarContent>
  );
}
