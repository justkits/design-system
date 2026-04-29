vi.mock("@justkits/docs/next", () => ({
  getSidebarItems: (page: string) => [
    {
      type: "leaf",
      order: 1,
      label: "Introduction",
      href: `/${page}/introduction`,
      fields: {
        title: "Introduction",
        description: "Welcome to the documentation!",
        status: "coming-soon",
      },
    },
    {
      type: "group",
      order: 2,
      label: "Getting Started",
      children: [
        {
          type: "leaf",
          order: 1,
          label: "Installation",
          href: `/${page}/getting-started/installation`,
          fields: {
            title: "Installation",
            description: "Learn how to install the library.",
            status: "active",
          },
        },
        {
          type: "branch",
          order: 2,
          label: "Usage Subbranch",
          href: `/${page}/getting-started/usage/subbranch`,
          fields: {
            title: "Usage Subbranch",
            description: "Learn how to use the library in depth.",
            status: "active",
          },
          children: [
            {
              type: "leaf",
              order: 1,
              label: "Usage Subbranch Item 1",
              href: `/${page}/getting-started/usage/subbranch/item-1`,
              fields: {
                title: "Usage Subbranch Item 1",
                description: "Learn how to use the library in depth.",
                status: "active",
              },
            },
          ],
        },
      ],
    },
    {
      type: "branch",
      order: 3,
      label: "API Reference",
      href: `/${page}/api-reference`,
      fields: {
        title: "API Reference",
        description: "Explore the API reference for all components and hooks.",
        status: "active",
      },
      children: [
        {
          type: "leaf",
          order: 1,
          label: "Component A",
          href: `/${page}/api-reference/component-a`,
          fields: {
            title: "Component A",
            description: "Learn about Component A.",
            status: "active",
          },
        },
      ],
    },
  ],
}));
