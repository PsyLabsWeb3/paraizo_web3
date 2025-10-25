import { createConfig, http } from 'wagmi'
import { base, baseSepolia } from 'wagmi/chains'
import { coinbaseWallet, injected, walletConnect } from '@wagmi/connectors'

// Define local development chain
const localChain = {
  id: 31337,
  name: 'Localhost',
  network: 'localhost',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: { http: ['http://127.0.0.1:8545'] },
    public: { http: ['http://127.0.0.1:8545'] },
  },
  blockExplorers: {
    default: { name: 'Local Explorer', url: 'http://localhost:8545' },
  },
  testnet: true,
} as const

// Get environment variables
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID

// Conditionally add walletConnect connector only if projectId is available
const connectors = [
  injected({ 
    target: ['metaMask'] // Only target MetaMask for the injected connector
  }),
  coinbaseWallet({
    appName: 'Paraizo Web3 Streaming',
  }),
]

if (projectId && projectId.trim() !== '') {
  connectors.push(
    walletConnect({
      projectId,
      metadata: {
        name: 'Paraizo Web3 Streaming',
        description: 'Web3 Streaming Platform',
        url: typeof window !== 'undefined' ? window.location.origin : 'https://paraizo.com',
        icons: ['/favicon.ico'],
      },
    })
  )
}

export const config = createConfig({
  chains: [localChain, base, baseSepolia],
  transports: {
    [localChain.id]: http(),
    [base.id]: http(process.env.NEXT_PUBLIC_BASE_RPC_URL),
    [baseSepolia.id]: http(process.env.NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL),
  },
  connectors,
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}