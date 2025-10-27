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
        {
          title: "Solana",
          href: "/docs/setup/solana",
          items: [],
        },
        {
          title: "Sui Network",
          href: "/docs/setup/sui",
          items: [],
        },
        {
          title: "Starknet",
          href: "/docs/setup/starknet",
          items: [],
        },
      ],
    },
    {
      title: "Components",
      items: [
        {
          title: "Connect",
          href: "/docs/components/connect",
          items: [],
        },
        {
          title: "Modal",
          href: "/docs/components/modal",
          items: [],
        },
      ],
    },
  ],
}
