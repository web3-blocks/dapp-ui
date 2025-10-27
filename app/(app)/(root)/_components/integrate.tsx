import * as React from "react"
import Image from "next/image"

import { siteConfig } from "@/lib/config"
import { cn } from "@/lib/utils"
import { LogoIcon } from "@/components/shared/logo"
import { Wrapper } from "@/components/shared/wrapper"
import { Button } from "@/registry/new-york/ui/button"

type PositionType =
  | "left-top"
  | "left-middle"
  | "left-bottom"
  | "right-top"
  | "right-middle"
  | "right-bottom"

const blockchains: Array<{
  name: string
  symbol: string
  position: PositionType
}> = [
  {
    name: "Ethereum",
    symbol: "eth",
    position: "left-top",
  },
  {
    name: "Bitcoin",
    symbol: "btc",
    position: "left-middle",
  },
  {
    name: "Starknet",
    symbol: "strk",
    position: "left-bottom",
  },
  {
    name: "Solana",
    symbol: "sol",
    position: "right-top",
  },
  {
    name: "Sui",
    symbol: "sui",
    position: "right-middle",
  },
  {
    name: "The Graph",
    symbol: "grt",
    position: "right-bottom",
  },
]

export const Integrations = () => {
  return (
    <section className="border-b border-dashed">
      <Wrapper className="border-dashed md:border-x">
        <Wrapper size="sm" className="px-0! py-16 md:py-32">
          <div className="relative">
            <div className="relative mx-auto flex max-w-sm items-center justify-between">
              <div className="space-y-6">
                {blockchains.slice(0, 3).map(({ symbol, position, name }) => (
                  <IntegrationCard key={symbol} position={position}>
                    <Image
                      src={`/assets/svg/blockchain/${symbol}.svg`}
                      alt={name}
                      width={64}
                      height={64}
                      priority
                      quality={100}
                    />
                  </IntegrationCard>
                ))}
              </div>
              <div className="mx-auto my-2 flex w-fit justify-center gap-2">
                <div className="bg-muted relative z-20 rounded-2xl border p-1">
                  <IntegrationCard
                    className="shadow-black-950/10 dark:bg-background size-16 border-black/25 shadow-xl dark:border-white/25 dark:shadow-white/10"
                    isCenter={true}
                  >
                    <LogoIcon
                      src="light"
                      alt={siteConfig.name}
                      width={64}
                      height={64}
                      type="icon"
                    />
                  </IntegrationCard>
                </div>
              </div>
              <div
                role="presentation"
                className="absolute inset-1/3 bg-[radial-gradient(var(--dots-color)_1px,transparent_1px)] mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] bg-size-[16px_16px] opacity-50 [--dots-color:black] dark:[--dots-color:white]"
              ></div>

              <div className="space-y-6">
                {blockchains
                  .slice(3, blockchains.length)
                  .map(({ symbol, position, name }) => (
                    <IntegrationCard key={symbol} position={position}>
                      <Image
                        src={`/assets/svg/blockchain/${symbol}.svg`}
                        alt={name}
                        width={64}
                        height={64}
                        priority
                        quality={100}
                      />
                    </IntegrationCard>
                  ))}
              </div>
            </div>
            <div className="from-background relative z-20 mt-12 flex flex-col items-center justify-center gap-6 bg-linear-to-t from-55%">
              <div className="flex max-w-md flex-col gap-6 text-center">
                <h2 className="text-3xl font-bold text-balance md:text-4xl">
                  Built to Work Seamlessly Across Chains
                </h2>
                <p className="text-muted-foreground">
                  Multi-chain ready components for Ethereum, Solana, Sui,
                  Starknet, and beyond.
                </p>
              </div>

              <Button variant="outline" size="lg" className="w-full sm:w-max">
                <span>View Components</span>
              </Button>
            </div>
          </div>
        </Wrapper>
      </Wrapper>
    </section>
  )
}

const IntegrationCard = ({
  children,
  className,
  position,
  isCenter = false,
}: {
  children: React.ReactNode
  className?: string
  position?: PositionType
  isCenter?: boolean
}) => {
  return (
    <div
      className={cn(
        "bg-background relative flex size-12 rounded-xl border dark:bg-transparent",
        className
      )}
    >
      <div
        className={cn(
          "relative z-20 m-auto size-fit *:size-6",
          isCenter && "*:size-8"
        )}
      >
        {children}
      </div>
      {position && !isCenter && (
        <div
          className={cn(
            "to-muted-foreground/25 absolute z-10 h-px bg-linear-to-r",
            position === "left-top" &&
              "top-1/2 left-full w-[130px] origin-left rotate-25",
            position === "left-middle" &&
              "top-1/2 left-full w-[120px] origin-left",
            position === "left-bottom" &&
              "top-1/2 left-full w-[130px] origin-left rotate-[-25deg]",
            position === "right-top" &&
              "top-1/2 right-full w-[130px] origin-right rotate-[-25deg] bg-linear-to-l",
            position === "right-middle" &&
              "top-1/2 right-full w-[120px] origin-right bg-linear-to-l",
            position === "right-bottom" &&
              "top-1/2 right-full w-[130px] origin-right rotate-25 bg-linear-to-l"
          )}
        />
      )}
    </div>
  )
}
