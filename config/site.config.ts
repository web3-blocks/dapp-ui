import { env } from "@/lib/env";

export const siteConfig = {
  name: "dApp/ui",
  default: {
    title: "UI Toolkit for Dapps - dApp/ui",
    description:
      "dApp/ui is a collection of Web3-ready components built directly on the shadcn registry — providing developers with wallet connections, transaction modals, and on-chain UI patterns without requiring further installations.",
  },
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
