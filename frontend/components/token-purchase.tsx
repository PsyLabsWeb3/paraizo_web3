// components/token-purchase.tsx
'use client';

import { useState } from 'react';
import { useAccount, useBalance, useWriteContract, useReadContract, parseEther } from 'wagmi';
import { CONTRACT_ADDRESSES } from '@/lib/constants';

const tokenSwapAbi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_paraizoToken",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_rate",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_maxPurchase",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_minPurchase",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "depositTokens",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "buyTokens",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "availableTokens",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "rate",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "maxPurchase",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "minPurchase",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

export default function TokenPurchase() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });
  const [ethAmount, setEthAmount] = useState('');
  const [tokenAmount, setTokenAmount] = useState('0');

  const { writeContract, isPending } = useWriteContract();

  // You'll need to update this address after deployment
  const TOKEN_SWAP_CONTRACT_ADDRESS = "YOUR_DEPLOYED_SWAP_CONTRACT_ADDRESS";

  // Leer el rate y límites desde el contrato
  const { data: rate } = useReadContract({
    address: TOKEN_SWAP_CONTRACT_ADDRESS as `0x${string}`,
    abi: tokenSwapAbi,
    functionName: 'rate',
  });

  const { data: availableTokens } = useReadContract({
    address: TOKEN_SWAP_CONTRACT_ADDRESS as `0x${string}`,
    abi: tokenSwapAbi,
    functionName: 'availableTokens',
  });

  const { data: minPurchase } = useReadContract({
    address: TOKEN_SWAP_CONTRACT_ADDRESS as `0x${string}`,
    abi: tokenSwapAbi,
    functionName: 'minPurchase',
  });

  const { data: maxPurchase } = useReadContract({
    address: TOKEN_SWAP_CONTRACT_ADDRESS as `0x${string}`,
    abi: tokenSwapAbi,
    functionName: 'maxPurchase',
  });

  const handleEthAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = e.target.value;
    setEthAmount(amount);
    
    if (rate) {
      const tokens = parseFloat(amount) * Number(rate) / 1e18;
      setTokenAmount(tokens.toString());
    }
  };

  const handleBuyTokens = () => {
    if (!ethAmount || parseFloat(ethAmount) <= 0) {
      alert('Ingrese una cantidad válida de ETH');
      return;
    }

    // Convert ETH amount to BigInt (wei)
    const ethValue = parseEther(ethAmount);
    
    writeContract({
      address: TOKEN_SWAP_CONTRACT_ADDRESS as `0x${string}`,
      abi: tokenSwapAbi,
      functionName: 'buyTokens',
      value: ethValue,
    }, {
      onSuccess: (hash) => {
        alert('¡Tokens comprados exitosamente! Transaction: ' + hash);
        setEthAmount('');
        setTokenAmount('0');
      },
      onError: (error) => {
        console.error('Error al comprar tokens:', error);
        alert('Error al comprar tokens: ' + error.message);
      }
    });
  };

  if (!isConnected) {
    return (
      <div className="p-4 bg-gray-100 rounded-lg">
        <p>Por favor conecta tu wallet para comprar tokens.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">Comprar Paraízo Tokens</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Cantidad de ETH a gastar</label>
        <input
          type="number"
          value={ethAmount}
          onChange={handleEthAmountChange}
          placeholder="0.00"
          className="w-full p-2 border rounded"
          step="0.0001"
          min="0"
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Tokens que recibirás</label>
        <div className="w-full p-2 border rounded bg-gray-50">
          {tokenAmount} PARAIZO
        </div>
      </div>
      
      <div className="mb-4 text-sm">
        {rate && (
          <p className="text-gray-600">
            Tasa: {(Number(rate) / 1e18).toFixed(0)} PARAIZO por 1 ETH
          </p>
        )}
        {availableTokens && (
          <p className="text-gray-600">
            Tokens disponibles: {(Number(availableTokens) / 1e18).toFixed(2)} PARAIZO
          </p>
        )}
        {minPurchase && maxPurchase && (
          <p className="text-gray-600">
            Límites: Mínimo {(Number(minPurchase) / 1e18).toFixed(0)} - Máximo {(Number(maxPurchase) / 1e18).toFixed(0)} PARAIZO
          </p>
        )}
      </div>
      
      <button
        onClick={handleBuyTokens}
        disabled={isPending || !ethAmount || parseFloat(ethAmount) <= 0}
        className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? 'Procesando...' : 'Comprar Tokens'}
      </button>
      
      <div className="mt-4 text-sm text-gray-600">
        <p><strong>Saldo actual:</strong> {balance?.formatted ? `${balance.formatted} ${balance.symbol}` : 'Cargando...'}</p>
      </div>
    </div>
  );
}