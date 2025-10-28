"use client"

import { Button } from "@/registry/new-york/ui/button"
import { useConnect } from "@/registry/new-york/web3/hooks/use-connect"
import { useSyncProviders } from "@/registry/new-york/web3/hooks/use-sync-providers"
import { formatAddress } from "@/registry/new-york/web3/lib/utils"

export function Connect() {
  const providers = useSyncProviders()
  const { handleConnect, userAccount, selectedWallet } = useConnect("evm")

  return (
    <>
      <h2>Wallets Detected:</h2>
      <div>
        {providers.length > 0 ? (
          providers?.map((provider: EIP6963ProviderDetail) => (
            <Button
              key={provider.info.uuid}
              onClick={() => handleConnect?.(provider)}
            >
              <img src={provider.info.icon} alt={provider.info.name} />
              <div>{provider.info.name}</div>
            </Button>
          ))
        ) : (
          <div>No Announced Wallet Providers</div>
        )}
      </div>
      <hr />
      <h2>{userAccount ? "" : "No "}Wallet Selected</h2>
      {userAccount && (
        <div>
          <div>
            <img
              src={selectedWallet?.info.icon}
              alt={selectedWallet?.info.name}
            />
            <div>{selectedWallet?.info.name}</div>
            <div>({formatAddress(userAccount)})</div>
          </div>
        </div>
      )}
    </>
  )
}
