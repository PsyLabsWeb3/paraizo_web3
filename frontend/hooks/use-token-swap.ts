// hooks/use-token-swap.ts
'use client';

import { useWriteContract, useReadContract } from 'wagmi';
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

export function useTokenSwapContract() {
  const { writeContract, isPending } = useWriteContract();

  const buyTokens = (value: bigint) => {
    writeContract({
      address: CONTRACT_ADDRESSES.TOKEN_SWAP as `0x${string}`,
      abi: tokenSwapAbi,
      functionName: 'buyTokens',
      value: value,
    });
  };

  const availableTokens = () => {
    return useReadContract({
      address: CONTRACT_ADDRESSES.TOKEN_SWAP as `0x${string}`,
      abi: tokenSwapAbi,
      functionName: 'availableTokens',
    });
  };

  const rate = () => {
    return useReadContract({
      address: CONTRACT_ADDRESSES.TOKEN_SWAP as `0x${string}`,
      abi: tokenSwapAbi,
      functionName: 'rate',
    });
  };

  const minPurchase = () => {
    return useReadContract({
      address: CONTRACT_ADDRESSES.TOKEN_SWAP as `0x${string}`,
      abi: tokenSwapAbi,
      functionName: 'minPurchase',
    });
  };

  const maxPurchase = () => {
    return useReadContract({
      address: CONTRACT_ADDRESSES.TOKEN_SWAP as `0x${string}`,
      abi: tokenSwapAbi,
      functionName: 'maxPurchase',
    });
  };

  return {
    buyTokens,
    availableTokens,
    rate,
    minPurchase,
    maxPurchase,
    isPending,
  };
}