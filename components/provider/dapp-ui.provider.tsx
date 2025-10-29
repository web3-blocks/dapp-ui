"use client"

import React from "react"
import { DappUiProvider } from "@web3-blocks/dapp-ui"
import { mainnet, sepolia } from "wagmi/chains"

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <DappUiProvider supportedChains={[mainnet, sepolia]}>
      {children}
    </DappUiProvider>
  )
}
