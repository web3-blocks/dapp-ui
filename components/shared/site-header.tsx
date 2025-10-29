import Link from "next/link"

import { getColors } from "@/lib/colors"
import { siteConfig } from "@/lib/config"
import { source } from "@/lib/source"
// import blocks from "@/registry/__blocks__.json"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CommandMenu } from "@/components/shared/command-menu"
import { GitHubLink } from "@/components/shared/github-link"
import { Icons } from "@/components/shared/icons"
import { MainNav } from "@/components/shared/main-nav"
import { MobileNav } from "@/components/shared/mobile-nav"
import { ModeSwitcher } from "@/components/shared/mode-switcher"
import { SiteConfig } from "@/components/shared/site-config"

export function SiteHeader() {
  const colors = getColors()
  const pageTree = source.pageTree

  return (
    <header className="bg-background/80 sticky top-0 z-50 w-full border-b border-dashed backdrop-blur-xl">
      <div className="3xl:fixed:px-0 container-wrapper px-6">
        <div className="3xl:fixed:container flex h-(--header-height) items-center gap-2 **:data-[slot=separator]:!h-4">
          <MobileNav
            tree={pageTree}
            items={siteConfig.navItems}
            className="flex lg:hidden"
          />
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="hidden size-8 lg:flex"
          >
            <Link href="/">
              <Icons.logo className="size-5" />
              <span className="sr-only">{siteConfig.name}</span>
            </Link>
          </Button>
          <MainNav items={siteConfig.navItems} className="hidden lg:flex" />
          <div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
            <div className="hidden w-full flex-1 md:flex md:w-auto md:flex-none">
              <CommandMenu
                tree={pageTree}
                colors={colors}
                navItems={siteConfig.navItems}
              />
            </div>
            <Separator
              orientation="vertical"
              className="ml-2 hidden lg:block"
            />
            <GitHubLink />
            <Separator orientation="vertical" className="3xl:flex hidden" />
            <SiteConfig className="3xl:flex hidden" />
            <Separator orientation="vertical" />
            <ModeSwitcher />
          </div>
        </div>
      </div>
    </header>
  )
}
