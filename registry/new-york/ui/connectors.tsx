"use client"

import * as React from "react"
import Link from "next/link"
import { ConnectState, useEthereum } from "@web3-blocks/dapp-ui"
import { AlertCircle, Check, Loader2, Wallet } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Callout } from "@/components/shared/callout"

type ConnectorItem = {
  id?: string | number
  name?: string
  ready?: boolean
  installed?: boolean
  icon?: React.ReactNode
}

type ConnectorsModalProps = {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title?: string
  description?: string
  triggerText?: string
  className?: string
}

export function ConnectorsModal({
  open,
  onOpenChange,
  title = "Connect a Wallet",
  description = "Choose a wallet connector to start using your account.",
  triggerText = "Connect",
  className,
}: ConnectorsModalProps) {
  const {
    account,
    connect: { fn, loading, isWalletAvailable, error, connectors },
  } = useEthereum()

  // Derived states
  const isConnected = account?.isConnected
  const list: ConnectorItem[] = Array.isArray(connectors) ? connectors : []
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null)
  const itemsRef = React.useRef<Array<HTMLButtonElement | null>>([])

  const handleConnect = async (connector?: unknown) => {
    try {
      await fn(connector as ConnectState["connectors"][number])
    } catch {
      // Error is surfaced via hook; keep local catch for safety
      // no-op
    }
  }

  const onSelect = (idx: number, connector: ConnectorItem) => {
    setSelectedIndex(idx)
    handleConnect(connector)
  }

  const handleKeyNav: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (!list.length) return
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault()
      const current = selectedIndex ?? 0
      const next = e.key === "ArrowDown" ? current + 1 : current - 1
      const clamped = Math.max(0, Math.min(list.length - 1, next))
      setSelectedIndex(clamped)
      const el = itemsRef.current[clamped]
      el?.focus()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant={isConnected ? "ghost" : "outline"} className="gap-2">
          {!isConnected ? (
            <>
              <span>{triggerText}</span>
              <Wallet className="size-4" />
            </>
          ) : (
            <>
              <span>Wallet Connected</span>
              <Check className="size-4" />
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className={cn("sm:max-w-3xl", className)}>
        <div className="grid grid-cols-1 gap-0 sm:grid-cols-[280px,1fr]">
          {/* Left panel */}
          <aside
            className="bg-muted/40 border-muted relative flex min-h-[340px] flex-col gap-3 border-r p-4"
            role="region"
            aria-label="Wallet connectors"
            onKeyDownCapture={handleKeyNav}
          >
            <div className="mb-2">
              <h3 className="text-xl font-semibold">Connect a Wallet</h3>
              <p className="text-muted-foreground text-sm">
                Choose a wallet to continue
              </p>
            </div>

            <ScrollArea className="pr-2">
              {list.length ? (
                <div
                  className="flex flex-col gap-2"
                  role="listbox"
                  aria-label="Available wallets"
                >
                  {list.map((connector, idx) => {
                    const disabled = loading || connector?.ready === false
                    const label = connector?.name ?? `Connector ${idx + 1}`
                    const selected = selectedIndex === idx
                    return (
                      <button
                        key={String(connector?.id ?? idx)}
                        ref={(el) => (itemsRef.current[idx] = el)}
                        className={cn(
                          "ring-offset-background focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
                          "hover:bg-background bg-card text-card-foreground flex items-center justify-between gap-2 rounded-md border p-3",
                          selected && "border-primary"
                        )}
                        onClick={() => onSelect(idx, connector)}
                        disabled={disabled}
                        aria-disabled={disabled}
                        role="option"
                        aria-selected={selected}
                        tabIndex={selected ? 0 : -1}
                        title={
                          connector?.ready === false
                            ? "Connector not ready"
                            : undefined
                        }
                      >
                        <div className="flex items-center gap-2">
                          {connector?.icon ? (
                            typeof connector.icon === "string" ? (
                              <img
                                src={connector.icon}
                                alt=""
                                width={20}
                                height={20}
                                className="rounded"
                              />
                            ) : (
                              connector.icon
                            )
                          ) : (
                            <Wallet className="size-4" />
                          )}
                          <span className="truncate">{label}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {loading && (
                            <Loader2
                              className="size-4 animate-spin"
                              aria-hidden="true"
                            />
                          )}
                          {connector?.installed && (
                            <Badge variant="secondary">Installed</Badge>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>
              ) : (
                <div className="text-muted-foreground space-y-3 text-sm">
                  <p>No wallets detected.</p>
                  <p>
                    Install a compatible wallet to continue. See the setup
                    guide:
                  </p>
                  <Button asChild variant="outline" className="w-fit">
                    <Link href="/docs/wallets">View Wallets</Link>
                  </Button>
                </div>
              )}
            </ScrollArea>
          </aside>

          {/* Right panel */}
          <section className="flex min-h-[340px] flex-col items-center justify-center gap-2 p-6">
            {!isWalletAvailable && (
              <Callout
                variant="destructive"
                icon={<AlertCircle className="size-4" />}
              >
                No Ethereum provider detected. Install a wallet extension.
              </Callout>
            )}

            {loading ? (
              <div className="text-center">
                <Loader2
                  className="mx-auto mb-3 size-10 animate-spin"
                  aria-live="polite"
                />
                <h4 className="text-xl font-semibold">
                  {selectedIndex != null
                    ? `Opening ${list[selectedIndex]?.name ?? "Wallet"}`
                    : "Opening Wallet"}
                </h4>
                <p className="text-muted-foreground">
                  Confirm connection in the wallet…
                </p>
              </div>
            ) : error ? (
              <div className="text-center">
                <Wallet className="mx-auto mb-3 size-10" />
                <h4 className="text-xl font-semibold">Opening Wallet</h4>
                <p className="text-destructive">
                  {error.message || "Connection failed"}
                </p>
                {selectedIndex != null && (
                  <Button
                    className="mt-4"
                    variant="outline"
                    onClick={() =>
                      onSelect(selectedIndex!, list[selectedIndex!]!)
                    }
                  >
                    Retry Connection
                  </Button>
                )}
              </div>
            ) : isConnected ? (
              <div className="text-center">
                <Check className="mx-auto mb-3 size-10" />
                <h4 className="text-xl font-semibold">Wallet Connected</h4>
                {account?.address && (
                  <p className="text-muted-foreground">
                    Connected as{" "}
                    <code className="font-mono">{account.address}</code>
                  </p>
                )}
              </div>
            ) : (
              <div className="mx-auto max-w-md">
                <h4 className="mb-3 text-center text-xl font-semibold">
                  What is a Wallet
                </h4>
                <div className="space-y-4 text-center">
                  <div>
                    <p className="text-foreground font-medium">Easy Login</p>
                    <p className="text-muted-foreground">
                      No need to create new accounts and passwords for every
                      website. Just connect your wallet and get going.
                    </p>
                  </div>
                  <div>
                    <p className="text-foreground font-medium">
                      Store your Digital Assets
                    </p>
                    <p className="text-muted-foreground">
                      Send, receive, store, and display your digital assets like
                      NFTs & coins.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export type { ConnectorsModalProps }
