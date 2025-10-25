import { Metadata } from "next";
import { ColorSection } from "./_components/color-section";
import { siteConfig, siteMap } from "@/config/site.config";

export const metadata: Metadata = {
  title: siteMap.colors.title,
  description: siteMap.colors.description,
  openGraph: {
    title: siteMap.colors.title,
    description: siteMap.colors.description,
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

export default function ColorsPage() {
  return (
    <section className="relative overflow-x-clip border-b border-dashed">
      <ColorSection />
    </section>
  );
}
