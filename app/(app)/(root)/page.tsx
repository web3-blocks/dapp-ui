import { Metadata } from "next"

import { siteConfig } from "@/lib/config"

import { FAQs } from "./_components/faqs"
import { Features } from "./_components/features"
import { HomeHero } from "./_components/hero"

export const dynamic = "force-static"
export const revalidate = false

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  openGraph: {
    images: [
      {
        url: `/og?title=${encodeURIComponent(
          siteConfig.title
        )}&description=${encodeURIComponent(siteConfig.description)}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: `/og?title=${encodeURIComponent(
          siteConfig.title
        )}&description=${encodeURIComponent(siteConfig.description)}`,
      },
    ],
  },
}

export default function IndexPage() {
  return (
    <section className="relative overflow-x-clip border-b border-dashed">
      <HomeHero />
      <Features />
      <FAQs />
    </section>
  )
}
