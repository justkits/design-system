vi.mock("@justkits/ui", () => ({
  UIProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));
vi.mock("@justkits/ui/Badge", () => ({
  Badge: ({ label }: { label: string }) => <span>{label}</span>,
}));
vi.mock("@justkits/ui/Buttons", () => ({
  Button: ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
  }) => <button onClick={onClick}>{children}</button>,
}));
vi.mock("@justkits/ui/Collapsible", () => ({
  Collapsible: ({
    label,
    children,
  }: {
    label: string;
    children: React.ReactNode;
  }) => (
    <>
      <span>{label}</span>
      {children}
    </>
  ),
}));
vi.mock("@justkits/ui/Icons", () => ({
  AppIcon: ({ icon }: { icon: string }) => <span>{icon}-icon</span>,
}));
vi.mock("@justkits/ui/Texts", () => ({
  Text: ({ children }: { children: React.ReactNode }) => (
    <span>{children}</span>
  ),
}));
