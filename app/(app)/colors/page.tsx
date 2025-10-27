import { Metadata } from "next"

import { ColorSection } from "./_components/color-section"

const title = "Tailwind Colors in Every Format"
const description =
  "The complete Tailwind color palette in HEX, RGB, HSL, CSS variables, and classes. Ready to copy and paste into your project."

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

export default function ColorsPage() {
  return (
    <section className="relative overflow-x-clip border-b border-dashed">
      <ColorSection title={title} description={description} />
    </section>
  )
}
