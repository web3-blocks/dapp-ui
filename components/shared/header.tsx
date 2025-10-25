import Link from "next/link";
import { TbMenu } from "react-icons/tb";
import { IoLogoGithub } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LogoIcon } from "./logo";

import { env } from "@/lib/env";
import { Wrapper } from "./wrapper";
import { ThemeSwitcher } from "./theme-switcher";
import { siteConfig } from "@/config/site.config";
import { Separator } from "@/components/ui/separator";
import { navItems } from "@/lib/constants";
import { useIsMobile } from "@/hooks/mobile";
import { Button, buttonVariants } from "@/components/ui/button";

export const Header = () => {
  const isMobile = useIsMobile();

  return (
    <header className="bg-background/80 sticky top-0 left-0 z-50 h-16 border-b border-solid backdrop-blur-xl md:border-dashed">
      <nav className="size-full">
        <Wrapper className="flex size-full items-center gap-6">
          <div className="flex items-center">
            <Link href="/">
              <LogoIcon
                src="light"
                alt={siteConfig.name}
                width={100}
                height={0}
                className="h-auto w-24 sm:w-[100px]"
              />
            </Link>

            <Separator
              orientation="vertical"
              className="mr-2 ml-4 hidden h-4! w-px md:block"
            />

            <NavigationMenu
              viewport={isMobile}
              className="hidden items-center gap-px md:flex"
            >
              <NavigationMenuList>
                {navItems.map((nav) => (
                  <NavigationMenuItem key={nav.label}>
                    <NavigationMenuTrigger>{nav.label}</NavigationMenuTrigger>
                    <NavigationMenuContent className="z-50">
                      {nav.label === "Documentation" ? (
                        <ul className="grid gap-2 md:w-[450px] md:grid-cols-[.75fr_1fr] lg:w-[550px]">
                          <li className="row-span-3">
                            <NavigationMenuLink asChild>
                              <div className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-4 no-underline outline-hidden transition-all duration-200 select-none focus:shadow-md">
                                <div className="text-base font-medium">
                                  {siteConfig.name}
                                </div>
                                <p className="text-muted-foreground text-sm leading-tight">
                                  Beautifully designed components built with
                                  Tailwind CSS.
                                </p>
                              </div>
                            </NavigationMenuLink>
                          </li>
                          {nav.children.map((child) => (
                            <ListItem
                              key={child.title}
                              title={child.title}
                              href={child.href}
                            >
                              {child.description}
                            </ListItem>
                          ))}
                        </ul>
                      ) : (
                        <ul className="grid gap-2 md:w-[300px] lg:w-[500px] lg:grid-cols-2">
                          {nav.children.map((child) => (
                            <ListItem
                              key={child.title}
                              title={child.title}
                              href={child.href}
                            >
                              {child.description}
                            </ListItem>
                          ))}
                        </ul>
                      )}
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex flex-1 items-center justify-end">
            <Link
              target="_blank"
              href={env.NEXT_PUBLIC_GITHUB_URL}
              className={buttonVariants({ size: "sm", variant: "ghost" })}
            >
              <IoLogoGithub className="size-4" />
              <span>GitHub</span>
            </Link>
            <Link
              target="_blank"
              href={env.NEXT_PUBLIC_TWITTER_URL}
              className={buttonVariants({ size: "icon-sm", variant: "ghost" })}
            >
              <RiTwitterXLine className="size-4" />
            </Link>

            <Separator
              orientation="vertical"
              className="mx-1 h-4! w-px sm:mx-2"
            />
            <ThemeSwitcher className="lg:-mr-2" />

            <div className="flex items-center md:hidden">
              <Separator
                orientation="vertical"
                className="mx-1 h-4! w-px sm:mx-2"
              />
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    role="button"
                    size="icon-sm"
                    variant="ghost"
                    className="-mr-2"
                  >
                    <TbMenu className="size-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <VisuallyHidden>
                    <SheetHeader>
                      <SheetTitle />
                      <SheetDescription />
                    </SheetHeader>
                  </VisuallyHidden>

                  <div className="flex h-full flex-col justify-between">
                    <div className="flex flex-col gap-6 py-6">
                      {navItems.map((nav) => (
                        <div key={nav.label} className="flex flex-col gap-3">
                          <span className="text-muted-foreground text-sm font-semibold uppercase">
                            {nav.label}
                          </span>
                          {nav.children.map((child) => (
                            <SheetClose asChild key={child.title}>
                              <Link
                                href={child.href}
                                className="text-foreground text-base hover:underline"
                              >
                                {child.title}
                              </Link>
                            </SheetClose>
                          ))}
                          <Separator />
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col gap-6">
                      <Separator />
                      <div className="flex gap-4">
                        <SheetClose asChild>
                          <Link
                            target="_blank"
                            href={env.NEXT_PUBLIC_GITHUB_URL}
                            className="flex items-center gap-2 text-sm hover:underline"
                          >
                            <IoLogoGithub className="size-4" />
                            GitHub
                          </Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Link
                            target="_blank"
                            href={env.NEXT_PUBLIC_TWITTER_URL}
                            className="flex items-center gap-2 text-sm hover:underline"
                          >
                            <RiTwitterXLine className="size-4" />
                            Twitter
                          </Link>
                        </SheetClose>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </Wrapper>
      </nav>
    </header>
  );
};

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          role="button"
          className="hover:bg-accent block space-y-1 rounded-md p-3 transition-colors select-none"
        >
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
