'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useChainId } from 'wagmi'
import { useTokenBalance } from '../../src/hooks/useTokenBalance'
import { formatEther } from 'viem'
import { useEffect, useState } from 'react'

export default function WalletTest() {
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const { data: balance, isLoading, error } = useTokenBalance(address)
  const [metamaskDetected, setMetamaskDetected] = useState(false)
  const [ethereumObject, setEthereumObject] = useState<any>(null)

  useEffect(() => {
    // Verificar si MetaMask está disponible
    if (typeof window !== 'undefined') {
      const ethereum = (window as any).ethereum
      setEthereumObject(ethereum)

      if (ethereum) {
        setMetamaskDetected(true)
        console.log('✅ MetaMask detected:', ethereum.isMetaMask)
        console.log('Provider details:', {
          isMetaMask: ethereum.isMetaMask,
          isConnected: ethereum.isConnected?.(),
          chainId: ethereum.chainId,
          selectedAddress: ethereum.selectedAddress
        })
      } else {
        console.log('❌ No ethereum object found')
        setMetamaskDetected(false)
      }
    }
  }, [])

  console.log('Debug info:', { address, isConnected, chainId, balance, error, metamaskDetected })

  return (
    <div className="p-8 min-h-screen bg-black text-white">
      <h1 className="text-2xl font-bold mb-4">🧪 Wallet Connection Test</h1>

      {/* MetaMask Detection */}
      <div className="mb-4 p-4 border border-gray-700 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">🦊 MetaMask Detection</h2>
        <div className="space-y-2 text-sm">
          <p><strong>MetaMask Detected:</strong> {metamaskDetected ? '✅ Yes' : '❌ No'}</p>
          <p><strong>Ethereum Object:</strong> {ethereumObject ? '✅ Available' : '❌ Not found'}</p>
          {ethereumObject && (
            <>
              <p><strong>Is MetaMask:</strong> {ethereumObject.isMetaMask ? '✅ Yes' : '❌ No'}</p>
              <p><strong>Provider Connected:</strong> {ethereumObject.isConnected?.() ? '✅ Yes' : '❌ No'}</p>
              <p><strong>Chain ID:</strong> {ethereumObject.chainId || 'Unknown'}</p>
            </>
          )}
        </div>

        {!metamaskDetected && (
          <div className="mt-4 p-3 bg-red-900/20 border border-red-500 rounded">
            <p className="text-red-400">⚠️ MetaMask not detected. Please:</p>
            <ul className="list-disc list-inside mt-2 text-sm">
              <li>Install MetaMask extension</li>
              <li>Refresh the page after installation</li>
              <li>Make sure MetaMask is unlocked</li>
            </ul>
          </div>
        )}
      </div>

      <div className="mb-8 p-4 border border-gray-700 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Step 1: Connect Wallet</h2>
        <ConnectButton />
      </div>

      <div className="mb-4 p-4 border border-gray-700 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Debug Information</h2>
        <div className="space-y-2 text-sm">
          <p><strong>Connected:</strong> {isConnected ? '✅ Yes' : '❌ No'}</p>
          <p><strong>Address:</strong> {address || 'Not connected'}</p>
          <p><strong>Current Chain ID:</strong> {chainId || 'Unknown'}</p>
          <p><strong>Expected Chain:</strong> Base Sepolia (ID: 84532)</p>
          <p><strong>Chain Match:</strong> {chainId === 84532 ? '✅ Correct' : '❌ Wrong network'}</p>
        </div>
      </div>

      {isConnected && (
        <div className="p-4 border border-gray-700 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Step 2: Token Balance</h2>
          <div className="space-y-2">
            {isLoading && <p className="text-yellow-500">🔄 Loading balance...</p>}
            {error && <p className="text-red-500">❌ Error: {(error as Error).message}</p>}
            {balance && typeof balance === 'bigint' ? (
              <p className="text-green-500">
                💰 Balance: {formatEther(balance as bigint)} PARAIZO
              </p>
            ) : !isLoading && !error && (
              <p className="text-gray-400">No balance data available</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}