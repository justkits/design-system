import "@justkits/docs";

declare module "@justkits/docs" {
  interface JustkitsDocsFrontmatter {
    title: string;
    description: string;
    status: "active" | "coming-soon";
  }
}
