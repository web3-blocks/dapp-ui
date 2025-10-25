import { env } from "@/lib/env";

export const siteConfig = {
  name: "dApp/ui",
  icons: [
    {
      url: "/assets/svg/logo-dark.svg",
      media: "(prefers-color-scheme: light)",
    },
    {
      url: "/assets/svg/logo-light.svg",
      media: "(prefers-color-scheme: dark)",
    },
  ],
  authors: [{ name: "Holiday", url: "https://linktr.ee/thelastofinusa" }],

  handle: env.NEXT_PUBLIC_HANDLE,
  creator: env.NEXT_PUBLIC_CREATOR,
  github: env.NEXT_PUBLIC_GITHUB_URL,
  siteUrl: env.NEXT_PUBLIC_SITE_URL,
};

export const siteMap = {
  default: {
    title: "UI Toolkit for Dapps - dApp/ui",
    description:
      "dApp/ui is a collection of Web3-ready components built directly on the shadcn registry — providing developers with wallet connections, transaction modals, and on-chain UI patterns without requiring further installations.",
  },
  doc: {
    title: "Installation",
    description:
      "The dApp/ui Registry lets you install production‑ready shadcn/UI marketing blocks directly into your dapp project using the shadcn CLI. Add the registry once and then pull blocks by name, no rigid templates, just flexible, composable components you can customize and scale across marketing sites.",
  },
  colors: {
    title: "Tailwind Colors in Every Format",
    description:
      "The complete Tailwind color palette in HEX, RGB, HSL, CSS variables, and classes. Ready to copy and paste into your project.",
  },
  changelog: {
    title: "Changelog",
    description:
      "Stay updated with the latest changes, improvements, and fixes in dApp/ui by checking out our detailed changelog.",
  },
};
