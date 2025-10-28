import React from "react"

type ConnectType = "evm" | "sol" | "sui" | "strk"

export const useConnect = (blockchain: ConnectType) => {
  const [selectedWallet, setSelectedWallet] =
    React.useState<EIP6963ProviderDetail>()
  const [userAccount, setUserAccount] = React.useState<string>("")

  const handleConnect = React.useCallback(
    async (providerWithInfo: EIP6963ProviderDetail) => {
      if (blockchain === "evm") {
        const accounts: string[] | undefined = (await providerWithInfo.provider
          .request({ method: "eth_requestAccounts" })
          .catch(console.error)) as string[] | undefined

        if (accounts?.[0]) {
          setSelectedWallet(providerWithInfo)
          setUserAccount(accounts?.[0])
        }
      }
      // no-op for other blockchains (extend here as needed)
    },
    [blockchain]
  )

  return { handleConnect, selectedWallet, userAccount }
}
