import { Metadata } from "next"

import { FAQs } from "./_components/faqs"
import { Features } from "./_components/features"
import { HomeHero } from "./_components/hero"
import { Integrations } from "./_components/integrate"

const title = "Web3 UI toolkit"
const description =
  "The production-ready Web3 components built using shadcn/ui. Accessible. Customizable. Open Source."

export const dynamic = "force-static"
export const revalidate = false

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    images: [
      {
        url: `/og?title=${encodeURIComponent(
          title
        )}&description=${encodeURIComponent(description)}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: `/og?title=${encodeURIComponent(
          title
        )}&description=${encodeURIComponent(description)}`,
      },
    ],
  },
}

export default function IndexPage() {
  return (
    <section className="relative overflow-x-clip border-b border-dashed">
      <HomeHero />
      <Integrations />
      <Features />
      <FAQs />
    </section>
  )
}
