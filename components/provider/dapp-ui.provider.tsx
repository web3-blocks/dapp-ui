"use client"

import React from "react"
import { DappUiProvider } from "@web3-blocks/dapp-ui"
import { sepolia } from "viem/chains"

export default function Provider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <DappUiProvider
      network="ethereum"
      chains={[sepolia]}
      contract={{
        abi: [],
        address: "0x123",
      }}
    >
      {children}
    </DappUiProvider>
  )
}
