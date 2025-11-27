'use client'

import { WagmiConfig } from 'wagmi'
import { config } from '../../lib/wallet'
import { ReactNode } from 'react'

interface Web3ProviderProps {
  children: ReactNode
}

export const Web3Provider = ({ children }: Web3ProviderProps) => {
  return (
    <WagmiConfig config={config}>
      {children}
    </WagmiConfig>
  )
}