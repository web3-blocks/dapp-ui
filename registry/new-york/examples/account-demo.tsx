"use client"

import * as React from "react"
import { useEthereum } from "@web3-blocks/dapp-ui"

import { Badge } from "@/components/ui/badge"

export default function AccountDemo() {
  const { account } = useEthereum()

  if (!account.isConnected) {
    return (
      <div className="text-muted-foreground text-sm">
        Not connected. Use the Connect button.
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="text-muted-foreground text-sm">Connected:</span>
      <Badge variant="secondary">{account.address}</Badge>
    </div>
  )
}
