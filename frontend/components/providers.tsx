'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import { config } from '@/lib/wallet'
import { darkTheme } from '@rainbow-me/rainbowkit'
import { ThemeProvider } from 'next-themes'

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange enableColorScheme={false}>
          <RainbowKitProvider 
            theme={darkTheme({
              accentColor: 'hsl(280, 75%, 55%)', // Primary purple from globals.css
              accentColorForeground: 'hsl(0, 0%, 98%)',
              borderRadius: 'small',
              fontStack: 'system',
              overlayBlur: 'small',
            })}
          >
            {children}
          </RainbowKitProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}