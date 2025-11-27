'use client'

import { createConfig, configureChains } from 'wagmi'
import { baseSepolia } from './chains'
import { publicProvider } from 'wagmi/providers/public'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { InjectedConnector } from 'wagmi/connectors/injected'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [baseSepolia],
  [publicProvider()]
)

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
    // Uncomment when you have WalletConnect project ID
    // new WalletConnectConnector({
    //   chains,
    //   options: {
    //     projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    //   },
    // }),
  ],
  publicClient,
  webSocketPublicClient,
})

export { chains }