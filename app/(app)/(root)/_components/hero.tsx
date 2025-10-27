import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Wrapper } from "@/components/shared/wrapper"
import { buttonVariants } from "@/registry/new-york/ui/button"

export const HomeHero = () => {
  return (
    <section className="border-b border-dashed">
      <Wrapper className="border-dashed md:border-x">
        <Wrapper size="sm" className="px-0! pt-16 sm:pb-16 md:py-32">
          <div className="relative overflow-hidden">
            <div className="lg:flex lg:items-center lg:gap-12">
              <div className="relative z-10 mx-auto max-w-xl text-center lg:ml-0 lg:w-1/2 lg:text-left">
                <Link
                  target="_blank"
                  href="https://ui.shadcn.com/"
                  className="dark:hover:bg-background dark:hover:border-t-border group dark:bg-muted group mx-auto flex w-fit items-center gap-4 rounded-full border p-1 pl-4 transition-colors duration-300 lg:ml-0 dark:border-t-white/5 dark:shadow-md dark:shadow-zinc-950"
                >
                  <span className="text-foreground text-sm">
                    Powered by the shadcn
                  </span>
                  <span className="dark:group-hover:border-muted block h-4 w-0.5 border transition-colors duration-300"></span>

                  <div className="bg-background group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500">
                    <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                      <span className="flex size-6">
                        <ArrowRight className="m-auto size-3" />
                      </span>
                      <span className="flex size-6">
                        <ArrowRight className="m-auto size-3" />
                      </span>
                    </div>
                  </div>
                </Link>

                <h1 className="mt-6 text-4xl leading-[1.1] font-bold sm:text-5xl">
                  Web3 UI Toolkit for Modern Dapps
                </h1>
                <p className="mt-4">
                  The production-ready Web3 components built directly on top of
                  the shadcn/ui registry.
                </p>

                <div className="my-12 flex flex-row items-center justify-center gap-2 lg:justify-start">
                  <Link
                    href="/"
                    className={buttonVariants({
                      size: "lg",
                      className: "flex-1 sm:flex-initial",
                    })}
                  >
                    <span className="text-nowrap">Get Started</span>
                  </Link>
                  <Link
                    href="/"
                    className={buttonVariants({
                      size: "lg",
                      variant: "ghost",
                      className: "flex-1 sm:flex-initial",
                    })}
                  >
                    <span className="text-nowrap">View Components</span>
                  </Link>
                </div>

                <ul className="hidden list-inside list-disc space-y-2 sm:block">
                  <li>Accessible.</li>
                  <li>100% Customizable.</li>
                  <li>Open Source.</li>
                </ul>
              </div>
            </div>

            <div className="absolute inset-0 -ml-4 hidden sm:block">
              <div className="relative">
                <div className="to-background absolute -inset-10 z-1 bg-radial-[at_75%_25%] from-transparent to-40%"></div>
                <Image
                  className="hidden brightness-50 lg:brightness-100 dark:block"
                  src="/assets/images/shadcn-dark.png"
                  alt="app illustration"
                  width={2796}
                  height={2008}
                  priority
                  quality={100}
                />
                <Image
                  className="opacity-50 lg:opacity-100 dark:hidden"
                  src="/assets/images/shadcn-light.png"
                  alt="app illustration"
                  width={2796}
                  height={2008}
                />
              </div>
            </div>
          </div>
        </Wrapper>
      </Wrapper>
    </section>
  )
}
