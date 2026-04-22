vi.mock("node:fs", () => ({
  existsSync: vi.fn().mockImplementation((path) => {
    if (path.toString().endsWith("01-Getting-Started/index.mdx")) {
      return false;
    }
    return true;
  }),
  mkdirSync: vi.fn(),
  readdirSync: vi.fn().mockImplementation((path) => {
    if (path.toString().endsWith("contents")) {
      return [{ name: "page", isDirectory: () => true }];
    }
    if (path.toString().endsWith("page")) {
      return [
        { name: "01-Getting-Started", isDirectory: () => true },
        { name: "02-Guides", isDirectory: () => true },
        { name: "03-API-Reference.mdx", isDirectory: () => false },
      ];
    }
    if (path.toString().endsWith("01-Getting-Started")) {
      return [{ name: "01-Installation.mdx", isDirectory: () => false }];
    }
    if (path.toString().endsWith("02-Guides")) {
      return [
        { name: "index.mdx", isDirectory: () => false },
        { name: "01-Guide-1.mdx", isDirectory: () => false },
      ];
    }
    return [
      { name: "index.mdx", isDirectory: () => false },
      { name: "01-Installation.mdx", isDirectory: () => false },
    ];
  }),
  readFileSync: vi.fn(),
  writeFileSync: vi.fn(),
}));
vi.mock("chokidar", () => ({
  __esModule: true,
  default: {
    watch: vi.fn().mockReturnValue({
      on: vi.fn().mockReturnThis(),
      close: vi.fn(),
    }),
  },
}));
vi.mock("gray-matter", () => ({
  __esModule: true,
  default: {
    read: vi.fn().mockReturnValue({
      data: { title: "Test Title" },
      content: "Test Content",
    }),
  },
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
