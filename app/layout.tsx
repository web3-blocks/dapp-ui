import type { Metadata } from "next";
import { Albert_Sans, Inconsolata } from "next/font/google";

import "./globals.css";
import { cn } from "@/lib/utils";
import { siteConfig, siteMap } from "@/config/site.config";
import GlobalProvider from "@/components/provider/global.provider";

const fontSans = Albert_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const fontMono = Inconsolata({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: {
    template: `%s • ${siteConfig.name}`,
    default: siteMap.default.title,
  },
  description: siteMap.default.description,
  openGraph: {
    title: siteMap.default.title,
    description: siteMap.default.description,
    siteName: siteConfig.name,
    url: siteConfig.siteUrl,
    type: "website",
    images: "/assets/images/opengraph-image.png",
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.handle,
    creator: siteConfig.creator,
    images: "/assets/images/opengraph-image.png",
  },
  icons: {
    icon: siteConfig.icons,
  },
  authors: siteConfig.authors,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "flex flex-1 flex-col font-sans antialiased",
          fontSans.variable,
          fontMono.variable,
        )}
      >
        <GlobalProvider>{children}</GlobalProvider>
      </body>
    </html>
  );
}
