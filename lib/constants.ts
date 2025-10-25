export const navItems = [
  {
    label: "Documentation",
    children: [
      {
        title: "Installation",
        href: "/docs",
        description: "How to install dependencies and structure your app.",
      },
    ],
  },
  {
    label: "Resources",
    children: [
      {
        title: "Components",
        href: "/",
        description: "Explore reusable components for your projects.",
      },
      {
        title: "Templates",
        href: "/",
        description: "Ready templates to start your project fast.",
      },
      {
        title: "Colors",
        href: "/colors",
        description: "Color palette reference for building UIs.",
      },
      {
        title: "Changelog",
        href: "/changelog",
        description: "Track new features and improvements.",
      },
    ],
  },
];

export const faqItems = [
  {
    question: "What is dApp/ui?",
    answer:
      "dApp/ui is a collection of Web3-ready components built on top of the shadcn/ui registry. It provides composable, customizable building blocks for decentralized apps — like wallet modals, transaction flows, and on-chain UIs.",
  },
  {
    question: "Do I need to install a package?",
    answer:
      "No. dApp/ui uses the shadcn registry system — you simply copy components directly into your project, giving you full ownership and flexibility without extra dependencies.",
  },
  {
    question: "Which blockchains does it support?",
    answer:
      "dApp/ui is designed to work across multiple networks, including Ethereum, Solana, Sui, Starknet, and other EVM-compatible chains.",
  },
  {
    question: "Can I customize the components?",
    answer:
      "Yes — every component is 100% customizable. Since you own the code, you can edit, extend, and style it however you like using your existing design system.",
  },
  {
    question: "Is dApp/ui open source?",
    answer:
      "Absolutely. dApp/ui is fully open source and community-driven. You can explore the code, contribute, or fork the components directly from GitHub.",
  },
];
