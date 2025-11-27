'use client'

import { WagmiConfig } from 'wagmi'
import { wagmiConfig } from '../config/wagmi'
import { ReactNode } from 'react'

interface Web3ProviderProps {
  children: ReactNode
}

export const Web3Provider = ({ children }: Web3ProviderProps) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      {children}
    </WagmiConfig>
  )
}