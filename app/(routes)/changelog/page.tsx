import { Metadata } from "next";
import { Logs } from "./_components/logs";
import { siteConfig, siteMap } from "@/config/site.config";

export const metadata: Metadata = {
  title: siteMap.changelog.title,
  description: siteMap.changelog.description,
  openGraph: {
    title: siteMap.changelog.title,
    description: siteMap.changelog.description,
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

export default async function Changelog() {
  return (
    <section className="relative overflow-x-clip border-b border-dashed">
      <Logs />
    </section>
  );
}
