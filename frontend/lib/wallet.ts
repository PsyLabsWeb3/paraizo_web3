import { createConfig, http } from 'wagmi'
import { base } from 'wagmi/chains'
import { coinbaseWallet, injected, walletConnect } from '@wagmi/connectors'

// Get environment variables
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || ''

export const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
  connectors: [
    coinbaseWallet({
      appName: 'Paraizo Web3 Streaming',
    }),
    injected(),
    walletConnect({
      projectId,
      metadata: {
        name: 'Paraizo Web3 Streaming',
        description: 'Web3 Streaming Platform',
        url: typeof window !== 'undefined' ? window.location.origin : 'https://paraizo.com',
        icons: ['/favicon.ico'],
      },
    }),
  ],
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}