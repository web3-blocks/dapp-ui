import { Icons } from "@/components/icons"

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
          title: "Wallet",
          href: "/docs/wallet",
          items: [],
        },
      ],
    },
    {
      title: "Web3 Setup",
      items: [
        {
          title: "Ethereum",
          href: "/docs/ethereum",
          items: [],
        },
      ],
    },
    // {
    //   title: "Components",
    //   items: [
    //     {
    //       title: "Connect Button",
    //       href: "/docs/connect-button",
    //       items: [],
    //     },
    //   ],
    // },
    // {
    //   title: "Hooks",
    //   items: [
    //     {
    //       title: "useConnect",
    //       href: "/docs/use-connect",
    //       items: [],
    //     },
    //   ],
    // },
  ],
}
