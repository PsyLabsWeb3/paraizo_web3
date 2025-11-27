'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Button as MTButton, Typography as MTTypography } from '@material-tailwind/react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'

// Cast to any to avoid type errors with React 19 and missing props like onPointerEnterCapture
const Button = MTButton as any
const Typography = MTTypography as any

export function WalletDropdown() {
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const { isConnected, address } = useAccount()
  const { connect, connectors, error } = useConnect()
  const { disconnect } = useDisconnect()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleConnect = async (connector: any) => {
    try {
      console.log('Attempting to connect to connector:', connector.name, connector.id)
      const result = await connect({ connector })
      console.log('Wallet connected successfully:', result)
      setIsOpen(false)
    } catch (error: any) {
      console.error('Wallet connection error:', error)
      // Show more user-friendly error messages
      let errorMessage = 'Failed to connect wallet'
      if (error?.message?.includes('User rejected')) {
        errorMessage = 'Connection rejected. Please try again.'
      } else if (error?.message?.includes('No Ethereum provider')) {
        errorMessage = 'No Ethereum wallet found. Please install MetaMask or use Coinbase Wallet.'
      } else if (error?.message) {
        errorMessage = error.message
      }
      
      // Show error in a more elegant way than alert
      const errorDiv = document.createElement('div')
      errorDiv.className = 'fixed top-4 right-4 bg-destructive text-destructive-foreground px-4 py-2 rounded-md shadow-lg z-50'
      errorDiv.textContent = errorMessage
      document.body.appendChild(errorDiv)
      
      // Remove error message after 4 seconds
      setTimeout(() => {
        if (document.body.contains(errorDiv)) {
          document.body.removeChild(errorDiv)
        }
      }, 4000)
    }
  }

  // Prevent server/client mismatch by only rendering after mount
  if (!mounted) {
    return (
      <Button
        className="flex items-center gap-2 bg-card text-foreground hover:bg-accent shadow-md border border-border"
      >
        <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
        </svg>
        Connect Wallet
      </Button>
    )
  }



  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-card text-foreground hover:bg-accent shadow-md border border-border"
      >
        <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
        </svg>
        {isConnected ? (address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Connected') : 'Connect Wallet'}
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-popover text-popover-foreground rounded-lg shadow-lg z-50 border border-border overflow-hidden">
          <div className="p-4 border-b border-border">
            <Typography
              variant="h5"
              color="blue-gray"
              className="font-semibold text-foreground"
            >
              Connect Wallet
            </Typography>
            <Typography
              color="gray"
              variant="small"
              className="text-muted-foreground"
            >
              Choose a wallet to connect
            </Typography>
          </div>

          <div className="p-2">
            <div className="mb-4">
              <Typography
                variant="small"
                color="gray"
                className="px-2 py-1 font-semibold uppercase text-xs text-muted-foreground"
              >
                Popular
              </Typography>
              <div className="mt-2 space-y-1">
                {connectors.filter(connector =>
                  connector.id === 'injected' ||
                  connector.id === 'coinbaseWallet'
                ).map((connector) => (
                  <button
                    key={connector.uid}
                    className="w-full flex items-center justify-center gap-3 py-3 px-4 shadow-sm rounded-lg hover:bg-accent transition-colors bg-card text-card-foreground border border-border"
                    onClick={() => handleConnect(connector)}
                  >
                    {connector.id === 'injected' && (
                      <img
                        src="https://docs.material-tailwind.com/icons/metamask.svg"
                        alt="metamask"
                        className="h-6 w-6"
                      />
                    )}
                    {connector.id === 'coinbaseWallet' && (
                      <img
                        src="https://docs.material-tailwind.com/icons/coinbase.svg"
                        alt="coinbase"
                        className="h-6 w-6 rounded-md"
                      />
                    )}
                    <Typography
                      className="uppercase text-sm text-foreground"
                      color="blue-gray"
                    >
                      {connector.id === 'injected' ? 'Metamask' : connector.name}
                    </Typography>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Typography
                variant="small"
                color="gray"
                className="px-2 py-1 font-semibold uppercase text-xs text-muted-foreground"
              >
                Other
              </Typography>
              <div className="mt-2 space-y-1">
                {connectors.filter(connector =>
                  connector.id !== 'injected' &&
                  connector.id !== 'coinbaseWallet'
                ).map((connector) => (
                  <button
                    key={connector.uid}
                    className="w-full flex items-center justify-center gap-3 py-3 px-4 shadow-sm rounded-lg hover:bg-accent transition-colors bg-card text-card-foreground border border-border"
                    onClick={() => handleConnect(connector)}
                  >
                    {connector.id === 'walletConnect' && (
                      <img
                        src="https://docs.material-tailwind.com/icons/walletconnect.svg"
                        alt={connector.name}
                        className="h-7 w-7 rounded-md border border-border"
                      />
                    )}
                    {connector.id !== 'walletConnect' && (
                      <div className="bg-muted border-2 border-dashed rounded-xl w-7 h-7 flex items-center justify-center">
                        <span className="text-xs font-bold text-foreground">{connector.name?.charAt(0) || '?'}</span>
                      </div>
                    )}
                    <Typography
                      className="uppercase text-sm text-foreground"
                      color="blue-gray"
                    >
                      {connector.name}
                    </Typography>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {isConnected ? (
            <div className="p-3 border-t border-border">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-foreground truncate">
                  {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Connected'}
                </div>
                <button
                  onClick={() => {
                    disconnect()
                    setIsOpen(false)
                  }}
                  className="text-destructive hover:text-destructive/80 text-sm font-medium"
                >
                  Disconnect
                </button>
              </div>
            </div>
          ) : (
            <div className="p-3 bg-destructive/20 text-destructive text-sm border-t border-border">
              {error && <span>{error.message || 'Connection error occurred'}</span>}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default WalletDropdown