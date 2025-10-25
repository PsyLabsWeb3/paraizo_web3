'use client';

import { useState, useEffect } from 'react';
import { useWriteContract, useReadContract, useWatchContractEvent } from 'wagmi';
import { CONTRACT_ADDRESSES } from '@/lib/constants';
import subscriptionAbi from '@/lib/abis/subscription.json';
import tipAbi from '@/lib/abis/tip.json';
import paraizoTokenAbi from '@/lib/abis/paraizotoken.json';
import paraizoEcosystemAbi from '@/lib/abis/paraizoecosystem.json';

export function useSubscriptionContract() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionInfo, setSubscriptionInfo] = useState<any>(null);

  const { writeContract: subscribeEth, isPending: isSubscribingEth } = useWriteContract();
  const { writeContract: subscribeToken, isPending: isSubscribingToken } = useWriteContract();
  const { writeContract: renewSubscriptionEth, isPending: isRenewingEth } = useWriteContract();
  const { writeContract: renewSubscriptionToken, isPending: isRenewingToken } = useWriteContract();
  const { writeContract: cancelSubscription, isPending: isCancelling } = useWriteContract();

  const subscribeWithEth = (streamerAddress: string, duration: number, value: bigint) => {
    subscribeEth({
      address: CONTRACT_ADDRESSES.SUBSCRIPTION_CONTRACT,
      abi: subscriptionAbi,
      functionName: 'subscribeWithEth',
      args: [streamerAddress, duration],
      value: value,
    });
  };

  const subscribeWithTokens = (streamerAddress: string, duration: number, tokenAddress: string, amount: bigint) => {
    subscribeToken({
      address: CONTRACT_ADDRESSES.SUBSCRIPTION_CONTRACT,
      abi: subscriptionAbi,
      functionName: 'subscribeWithTokens',
      args: [streamerAddress, duration, tokenAddress, amount],
    });
  };

  const renewSubscriptionWithEth = (streamerAddress: string, duration: number, value: bigint) => {
    renewSubscriptionEth({
      address: CONTRACT_ADDRESSES.SUBSCRIPTION_CONTRACT,
      abi: subscriptionAbi,
      functionName: 'renewSubscriptionWithEth',
      args: [streamerAddress, duration],
      value: value,
    });
  };

  const renewSubscriptionWithTokens = (streamerAddress: string, duration: number, tokenAddress: string, amount: bigint) => {
    renewSubscriptionToken({
      address: CONTRACT_ADDRESSES.SUBSCRIPTION_CONTRACT,
      abi: subscriptionAbi,
      functionName: 'renewSubscriptionWithTokens',
      args: [streamerAddress, duration, tokenAddress, amount],
    });
  };

  const cancelSubscriptionToStreamer = (streamerAddress: string) => {
    cancelSubscription({
      address: CONTRACT_ADDRESSES.SUBSCRIPTION_CONTRACT,
      abi: subscriptionAbi,
      functionName: 'cancelSubscription',
      args: [streamerAddress],
    });
  };

  // Watch for subscription events
  useWatchContractEvent({
    address: CONTRACT_ADDRESSES.SUBSCRIPTION_CONTRACT,
    abi: subscriptionAbi,
    eventName: 'Subscribed',
    onLogs: (logs) => {
      console.log('New subscription:', logs);
    },
  });

  return {
    subscribeWithEth,
    subscribeWithTokens,
    renewSubscriptionWithEth,
    renewSubscriptionWithTokens,
    cancelSubscriptionToStreamer,
    isSubscribingEth,
    isSubscribingToken,
    isRenewingEth,
    isRenewingToken,
    isCancelling,
    isSubscribed,
    subscriptionInfo,
  };
}

export function useTipContract() {
  const { writeContract: sendEthTip, isPending: isTippingEth } = useWriteContract();
  const { writeContract: sendTokenTip, isPending: isTippingToken } = useWriteContract();
  const { writeContract: withdrawEthTips, isPending: isWithdrawingEth } = useWriteContract();
  const { writeContract: withdrawTokenTips, isPending: isWithdrawingToken } = useWriteContract();

  const tipStreamerWithEth = (streamerAddress: string, message: string, value: bigint) => {
    sendEthTip({
      address: CONTRACT_ADDRESSES.TIP_CONTRACT,
      abi: tipAbi,
      functionName: 'sendEthTip',
      args: [streamerAddress, message],
      value: value,
    });
  };

  const tipStreamerWithToken = (streamerAddress: string, tokenAddress: string, amount: bigint, message: string) => {
    sendTokenTip({
      address: CONTRACT_ADDRESSES.TIP_CONTRACT,
      abi: tipAbi,
      functionName: 'sendTokenTip',
      args: [streamerAddress, tokenAddress, amount, message],
    });
  };

  const withdrawEthEarnings = () => {
    withdrawEthTips({
      address: CONTRACT_ADDRESSES.TIP_CONTRACT,
      abi: tipAbi,
      functionName: 'withdrawEthTips',
    });
  };

  const withdrawTokenEarnings = (tokenAddress: string) => {
    withdrawTokenTips({
      address: CONTRACT_ADDRESSES.TIP_CONTRACT,
      abi: tipAbi,
      functionName: 'withdrawTokenTips',
      args: [tokenAddress],
    });
  };

  // Watch for tip events
  useWatchContractEvent({
    address: CONTRACT_ADDRESSES.TIP_CONTRACT,
    abi: tipAbi,
    eventName: 'TipSent',
    onLogs: (logs) => {
      console.log('New tip:', logs);
    },
  });

  return {
    tipStreamerWithEth,
    tipStreamerWithToken,
    withdrawEthEarnings,
    withdrawTokenEarnings,
    isTippingEth,
    isTippingToken,
    isWithdrawingEth,
    isWithdrawingToken,
  };
}

export function useParaizoTokenContract() {
  const { writeContract, isPending } = useWriteContract();

  const approve = (spender: string, amount: bigint) => {
    writeContract({
      address: CONTRACT_ADDRESSES.PARAIZO_TOKEN,
      abi: paraizoTokenAbi,
      functionName: 'approve',
      args: [spender, amount],
    });
  };

  const transfer = (to: string, amount: bigint) => {
    writeContract({
      address: CONTRACT_ADDRESSES.PARAIZO_TOKEN,
      abi: paraizoTokenAbi,
      functionName: 'transfer',
      args: [to, amount],
    });
  };

  const balanceOf = (address: string) => {
    // This would use useReadContract in a real implementation
  };

  return {
    approve,
    transfer,
    balanceOf,
    isPending,
  };
}

export function useParaizoEcosystemContract() {
  const { writeContract, isPending } = useWriteContract();
  const { readContract } = useReadContract();

  const stake = (amount: bigint) => {
    writeContract({
      address: CONTRACT_ADDRESSES.PARAIZO_ECOSYSTEM,
      abi: paraizoEcosystemAbi,
      functionName: 'stake',
      args: [amount],
    });
  };

  const unstake = (amount: bigint) => {
    writeContract({
      address: CONTRACT_ADDRESSES.PARAIZO_ECOSYSTEM,
      abi: paraizoEcosystemAbi,
      functionName: 'unstake',
      args: [amount],
    });
  };

  const claimRewards = () => {
    writeContract({
      address: CONTRACT_ADDRESSES.PARAIZO_ECOSYSTEM,
      abi: paraizoEcosystemAbi,
      functionName: 'claimRewards',
    });
  };

  const getStake = (userAddress: string) => {
    return readContract({
      address: CONTRACT_ADDRESSES.PARAIZO_ECOSYSTEM,
      abi: paraizoEcosystemAbi,
      functionName: 'stakes',
      args: [userAddress],
    });
  };

  const getTotalRewards = (userAddress: string) => {
    return readContract({
      address: CONTRACT_ADDRESSES.PARAIZO_ECOSYSTEM,
      abi: paraizoEcosystemAbi,
      functionName: 'getTotalRewards',
      args: [userAddress],
    });
  };

  return {
    stake,
    unstake,
    claimRewards,
    getStake,
    getTotalRewards,
    isStaking: isPending,
  };
}