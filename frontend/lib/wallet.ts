import { createConfig, http } from 'wagmi'
import { base, baseSepolia } from 'wagmi/chains'
import { coinbaseWallet, injected } from '@wagmi/connectors'

// Get environment variables
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID

export const config = createConfig({
  chains: [baseSepolia, base],
  transports: {
    [base.id]: http(process.env.NEXT_PUBLIC_BASE_RPC_URL || 'https://mainnet.base.org'),
    [baseSepolia.id]: http(process.env.NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL || 'https://sepolia.base.org'),
  },
  connectors: [
    injected(),
    coinbaseWallet({
      appName: 'Paraizo Web3 Streaming',
    }),
    ...(projectId ? [] : []), // Only add WalletConnect if projectId is available
  ],
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}