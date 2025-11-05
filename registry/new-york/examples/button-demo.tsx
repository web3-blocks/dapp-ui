"use client"

import { useEthereum } from "@web3-blocks/dapp-ui"
import { Wallet } from "lucide-react"

import { Connect, Disconnect } from "@/registry/new-york/ui/button"

export default function ButtonDemo() {
  const {
    account: { isConnected },
  } = useEthereum()

  return (
    <div className="flex flex-wrap items-center gap-2 md:flex-row">
      {isConnected ? (
        <Disconnect variant="outline" loadingTxt="Disconnecting...">
          <span>Disconnect</span>
        </Disconnect>
      ) : (
        <Connect variant="outline" loadingTxt="Connecting...">
          <span>Connect Wallet</span>
          <Wallet />
        </Connect>
      )}
    </div>
  )
}
