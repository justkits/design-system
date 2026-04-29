vi.mock("@justkits/navigation", () => ({
  SidebarProvider: Fragment,
  SidebarToggle: Fragment,
  SidebarContent: Fragment,
  SidebarMain: Fragment,
  SidebarLink: ({
    left,
    children,
    right,
  }: {
    left?: React.ReactNode;
    right?: React.ReactNode;
    children: React.ReactNode;
  }) => (
    <>
      {left}
      {children}
      {right}
    </>
  ),
  SectionLinkProvider: Fragment,
  SectionLinkContent: Fragment,
  SectionLinkToggle: Fragment,
}));

function Fragment({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
