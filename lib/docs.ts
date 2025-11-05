import { Icons } from "@/components/shared/icons"

export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
  label?: string
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[]
}

export interface DocsConfig {
  sidebarNav: NavItemWithChildren[]
}

export const docsConfig: DocsConfig = {
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/docs",
          items: [],
        },
        {
          title: "Installation",
          href: "/docs/installation",
          items: [],
        },
        {
          title: "Wallets",
          href: "/docs/wallets",
          items: [],
        },
        {
          title: "Components",
          href: "/docs/components",
          items: [],
        },
      ],
    },
    {
      title: "Network Setup",
      items: [
        {
          title: "Ethereum",
          href: "/docs/setup/ethereum",
          items: [],
        },
      ],
    },
    {
      title: "Components",
      items: [
        {
          title: "Button",
          href: "/docs/components/button",
          items: [],
        },
        {
          title: "Connectors",
          href: "/docs/components/connectors",
          items: [],
        },
      ],
    },
  ],
}
