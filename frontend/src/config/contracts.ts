export const contractAddresses = {
  baseSepolia: {
    chainId: 84532,
    ParaizoToken: "0xdc2a624dffc1f6343f62a02001906252e3ca8fd2" as `0x${string}`,
    TipContract: "0x6fd840cdb33fe6b6a9712a5d1fb812853b3f4946" as `0x${string}`,
    SubscriptionContract: "0x5f1f3b5ff3bc9dfe7aff8e10226b51f5e02bf5b8" as `0x${string}`,
    ParaizoEcosystem: "0xb1986b74e08134aff13fd2df8a150fe621279722" as `0x${string}`,
  }
}

export const getContractAddress = (contractName: keyof typeof contractAddresses.baseSepolia, chainId: number = 84532): `0x${string}` => {
  if (chainId === 84532) {
    const address = contractAddresses.baseSepolia[contractName]
    if (!address) {
      throw new Error(`Contract ${contractName} not found for chain ${chainId}`)
    }
    return address
  }
  throw new Error(`Unsupported chain ID: ${chainId}`)
}

export const networkConfig = {
  chainId: 84532,
  chainName: 'Base Sepolia',
  rpcUrl: process.env.NEXT_PUBLIC_RPC_URL!,
  blockExplorer: process.env.NEXT_PUBLIC_BLOCK_EXPLORER!,
}