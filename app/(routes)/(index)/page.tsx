import { FAQs } from "./_components/faqs";
import { Features } from "./_components/features";
import { HomeHero } from "./_components/hero";
import { Integrations } from "./_components/integrate";

export default function Home() {
  return (
    <section className="relative overflow-x-clip border-b border-dashed">
      <HomeHero />
      <Integrations />
      <Features />
      <FAQs />
    </section>
  );
}
