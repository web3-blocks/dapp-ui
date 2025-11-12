"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { useEthereum } from "@web3-blocks/dapp-ui"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader } from "lucide-react"
import { toast } from "sonner"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-0 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2 has-[>svg]:px-4",
        sm: "h-9 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-11 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-10",
        "icon-sm": "size-9",
        "icon-lg": "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  isLoading = false,
  loadingTxt,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    isLoading?: boolean
    loadingTxt?: string
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader className="animate-spin" />{" "}
          {loadingTxt && <span>{loadingTxt}</span>}
        </>
      ) : (
        props.children
      )}
    </Comp>
  )
}

function Connect({
  className,
  variant,
  size,
  asChild = false,
  isLoading = false,
  loadingTxt,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    isLoading?: boolean
    loadingTxt?: string
  }) {
  const Comp = asChild ? Slot : "button"
  const {
    connect: { fn, loading, isWalletAvailable, error },
  } = useEthereum()

  React.useEffect(() => {
    if (error) toast.error(error.message)
  }, [error])

  const isDisabled =
    loading || isLoading || props.disabled || !isWalletAvailable

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={isDisabled}
      {...props}
      onClick={() => fn()}
      title={!isWalletAvailable ? "No wallet detected" : props.title}
    >
      {loading || isLoading ? (
        <>
          <Loader className="animate-spin" />{" "}
          {loadingTxt && <span>{loadingTxt}</span>}
        </>
      ) : (
        props.children
      )}
    </Comp>
  )
}

function Disconnect({
  className,
  variant,
  size,
  asChild = false,
  isLoading = false,
  loadingTxt,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    isLoading?: boolean
    loadingTxt?: string
  }) {
  const Comp = asChild ? Slot : "button"
  const {
    disconnect: { fn, loading },
  } = useEthereum()

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
      disabled={loading || isLoading || props.disabled}
      onClick={() => fn()}
    >
      {loading || isLoading ? (
        <>
          <Loader className="animate-spin" />{" "}
          {loadingTxt && <span>{loadingTxt}</span>}
        </>
      ) : (
        props.children
      )}
    </Comp>
  )
}

export { Button, Connect, Disconnect, buttonVariants }
