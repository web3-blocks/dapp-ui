"use client"

import * as React from "react"
import { useEthereum } from "@web3-blocks/dapp-ui"
import { PlugZap } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ConnectorsModal } from "@/registry/new-york/ui/connectors"

export default function ConnectorsDemo() {
  const {
    account,
    connect: { loading, error, isWalletAvailable },
  } = useEthereum()

  const [open, setOpen] = React.useState(false)

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          className="gap-2"
          onClick={() => setOpen(true)}
          disabled={loading}
        >
          <span>Open Connectors</span>
          <PlugZap className="size-4" />
        </Button>
        {account?.isConnected ? (
          <Badge variant="secondary">Connected</Badge>
        ) : (
          <Badge variant="outline">Not connected</Badge>
        )}
        {!isWalletAvailable && <Badge variant="destructive">No wallet</Badge>}
      </div>

      {error && <div className="text-destructive text-sm">{error.message}</div>}

      <div className="text-muted-foreground text-sm">
        {loading ? (
          <span>Connecting…</span>
        ) : account?.isConnected ? (
          <span>
            Connected to <code className="font-mono">{account.address}</code>
          </span>
        ) : (
          <span>Click the button to choose a wallet.</span>
        )}
      </div>

      <ConnectorsModal
        open={open}
        onOpenChange={setOpen}
        title="Choose a Wallet"
        description="Select a connector to authenticate and start using your account."
        triggerText="Connect"
      />
    </div>
  )
}
