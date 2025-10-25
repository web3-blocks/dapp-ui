import Link from "next/link";

import CodeBlock from "@/components/code-block";
import { Wrapper } from "@/components/shared/wrapper";
import { siteConfig, siteMap } from "@/config/site.config";
import { env } from "@/lib/env";
import { Metadata } from "next";

export const revalidate = false;
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: siteMap.doc.title,
  description: siteMap.doc.description,
  openGraph: {
    title: siteMap.doc.title,
    description: siteMap.doc.description,
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

export default function Docs() {
  return (
    <section className="relative overflow-x-clip border-b border-dashed">
      <Wrapper className="border-dashed py-16 md:border-x md:py-32">
        <div className="relative mx-auto max-w-2xl">
          <h2 className="mb-6 text-3xl font-bold text-balance md:text-4xl">
            {siteMap.doc.title}
          </h2>

          <div className="text-muted-foreground mt-6 space-y-12">
            <p className="text-sm leading-6 sm:text-base">
              {siteMap.doc.description}
            </p>

            {/* STEP 1: New Next.js Project */}
            <div className="space-y-3">
              <h2 className="text-foreground text-lg font-medium">
                Create a new Next.js project
              </h2>
              <p className="text-sm leading-6 sm:text-base">
                Start with a fresh Next.js 15 project using your preferred
                package manager.
              </p>

              <CodeBlock
                code="pnpm create next-app@latest my-app --yes"
                lang="bash"
                className="my-3 *:rounded-lg *:border-l-0! **:h-auto! **:min-h-auto!"
              />

              <p className="text-sm leading-6 sm:text-base">
                Move into your project directory.
              </p>
              <CodeBlock
                code="cd my-app"
                lang="bash"
                className="my-3 *:rounded-lg *:border-l-0! **:h-auto! **:min-h-auto!"
              />
            </div>

            {/* STEP 3: Initialize shadcn/ui */}
            <div className="space-y-3">
              <h2 className="text-foreground text-lg font-medium">
                Initialize shadcn/ui
              </h2>
              <p className="text-sm leading-6 sm:text-base">
                Install and configure the shadcn/ui system in your new project.
              </p>

              <CodeBlock
                code="pnpm dlx shadcn@latest init"
                lang="bash"
                className="my-3 *:rounded-lg *:border-l-0! **:h-auto! **:min-h-auto!"
              />

              <p className="text-sm leading-6 sm:text-base">
                Follow the prompts to generate the <code>components.json</code>{" "}
                file and add the initial setup.
              </p>
            </div>

            {/* STEP 4: Add Registry */}
            <div className="space-y-3">
              <h2 className="text-foreground text-lg font-medium">
                Add registry
              </h2>
              <p className="text-sm leading-6 sm:text-base">
                Add the{" "}
                <span className="text-foreground font-medium">
                  {siteConfig.name}
                </span>{" "}
                registry namespace to your <code>components.json</code>.
              </p>

              <CodeBlock
                code={`{
  "registries": {
    "@dappui": "${env.NEXT_PUBLIC_SITE_URL}/r/{name}.json"
  }
}`}
                lang="json"
                className="my-3 *:rounded-lg *:border-l-0! **:h-auto! **:min-h-auto!"
              />

              <p className="text-sm leading-6 sm:text-base">
                Learn more about registry configuration from{" "}
                <Link
                  href="https://ui.shadcn.com/docs/registry/namespace"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  Shadcn UI docs
                </Link>
                .
              </p>
            </div>

            {/* STEP 5: Usage */}
            <div className="space-y-3">
              <h2 className="text-foreground text-lg font-medium">Usage</h2>
              <p className="text-sm leading-6 sm:text-base">
                Install blocks via the shadcn CLI using the{" "}
                <span className="text-primary">@dappui/{"{name}"}</span> syntax.
              </p>

              <CodeBlock
                code="pnpm dlx shadcn add @dappui/connect-wallet-button"
                lang="bash"
                className="my-3 *:rounded-lg *:border-l-0! **:h-auto! **:min-h-auto!"
              />

              <p className="text-sm leading-6 sm:text-base">
                Each block’s page contains a copyable CLI command. Use that
                instead of guessing block names.
              </p>
            </div>
          </div>
        </div>
      </Wrapper>
    </section>
  );
}
