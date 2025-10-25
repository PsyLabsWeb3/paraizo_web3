'use client';

import { useState } from 'react';
import { useAccount, useBalance } from 'wagmi';
import { 
  useSubscriptionContract, 
  useTipContract, 
  useParaizoTokenContract, 
  useParaizoEcosystemContract 
} from '@/hooks/use-contracts';
import { CONTRACT_ADDRESSES } from '@/lib/constants';

export default function ContractTestPage() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });
  const [streamerAddress, setStreamerAddress] = useState('');
  const [tipAmount, setTipAmount] = useState('');
  const [tipMessage, setTipMessage] = useState('');
  const [subDuration, setSubDuration] = useState('30'); // 30 days
  const [subAmount, setSubAmount] = useState('0.1'); // 0.1 ETH
  const [stakeAmount, setStakeAmount] = useState('100'); // 100 PARAIZO tokens
  const [unstakeAmount, setUnstakeAmount] = useState('10'); // 10 PARAIZO tokens
  const [spenderAddress, setSpenderAddress] = useState('');
  const [approveAmount, setApproveAmount] = useState('100'); // 100 PARAIZO tokens

  const {
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
  } = useSubscriptionContract();

  const { 
    tipStreamerWithEth, 
    tipStreamerWithToken, 
    withdrawEthEarnings, 
    withdrawTokenEarnings,
    isTippingEth,
    isTippingToken,
    isWithdrawingEth,
    isWithdrawingToken,
  } = useTipContract();

  const { approve, transfer, isPending: isTokenPending } = useParaizoTokenContract();

  const {
    stake,
    unstake,
    claimRewards,
    getStake,
    getTotalRewards,
    isStaking
  } = useParaizoEcosystemContract();

  const handleSubscribe = () => {
    const value = BigInt(parseFloat(subAmount) * 1e18); // Convert to wei
    const duration = parseInt(subDuration) * 24 * 60 * 60; // Convert days to seconds
    subscribeWithEth(streamerAddress, duration, value);
  };

  const handleSubscribeWithTokens = () => {
    const amount = BigInt(parseFloat(subAmount) * 1e18); // Convert to wei
    const duration = parseInt(subDuration) * 24 * 60 * 60; // Convert days to seconds
    subscribeWithTokens(streamerAddress, duration, CONTRACT_ADDRESSES.PARAIZO_TOKEN, amount);
  };

  const handleRenew = () => {
    const value = BigInt(parseFloat(subAmount) * 1e18); // Convert to wei
    const duration = parseInt(subDuration) * 24 * 60 * 60; // Convert days to seconds
    renewSubscriptionWithEth(streamerAddress, duration, value);
  };

  const handleRenewWithTokens = () => {
    const amount = BigInt(parseFloat(subAmount) * 1e18); // Convert to wei
    const duration = parseInt(subDuration) * 24 * 60 * 60; // Convert days to seconds
    renewSubscriptionWithTokens(streamerAddress, duration, CONTRACT_ADDRESSES.PARAIZO_TOKEN, amount);
  };

  const handleCancel = () => {
    cancelSubscriptionToStreamer(streamerAddress);
  };

  const handleTip = () => {
    const value = BigInt(parseFloat(tipAmount) * 1e18); // Convert to wei
    tipStreamerWithEth(streamerAddress, tipMessage, value);
  };

  const handleTipWithToken = () => {
    const amount = BigInt(parseFloat(tipAmount) * 1e18); // Convert to wei
    tipStreamerWithToken(streamerAddress, CONTRACT_ADDRESSES.PARAIZO_TOKEN, amount, tipMessage);
  };

  const handleWithdraw = () => {
    withdrawEthEarnings();
  };

  const handleWithdrawToken = () => {
    withdrawTokenEarnings(CONTRACT_ADDRESSES.PARAIZO_TOKEN);
  };

  const handleApprove = () => {
    const amount = BigInt(parseFloat(approveAmount) * 1e18); // Convert to wei (assuming 18 decimals)
    approve(spenderAddress, amount);
  };

  const handleTransfer = () => {
    const amount = BigInt(parseFloat(approveAmount) * 1e18); // Convert to wei (assuming 18 decimals)
    transfer(streamerAddress, amount);
  };

  const handleStake = () => {
    const amount = BigInt(parseFloat(stakeAmount) * 1e18); // Convert to wei (assuming 18 decimals)
    stake(amount);
  };

  const handleUnstake = () => {
    const amount = BigInt(parseFloat(unstakeAmount) * 1e18); // Convert to wei (assuming 18 decimals)
    unstake(amount);
  };

  const handleClaimRewards = () => {
    claimRewards();
  };

  if (!isConnected) {
    return (
      <div className="max-w-[95%] mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Contract Testing</h1>
        <p>Please connect your wallet to test the contracts.</p>
      </div>
    );
  }

  return (
    <div className="max-w-[95%] mx-auto p-4 text-black">
      <h1 className="text-2xl font-bold mb-4 text-black">Contract Testing</h1>
      
      <div className="mb-6 p-4 bg-gray-100 rounded-lg text-black">
        <h2 className="text-xl font-semibold mb-2 text-black">Wallet Info</h2>
        <p className="text-black">Address: {address}</p>
        <p className="text-black">Balance: {balance?.formatted} {balance?.symbol}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-black">
        {/* Subscription Section */}
        <div className="p-4 bg-blue-50 rounded-lg text-black">
          <h2 className="text-xl font-semibold mb-4 text-black">Subscription Contract</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-black">Streamer Address</label>
            <input
              type="text"
              value={streamerAddress}
              onChange={(e) => setStreamerAddress(e.target.value)}
              className="w-full p-2 border rounded text-black"
              placeholder="0x..."
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-black">Duration (days)</label>
            <input
              type="number"
              value={subDuration}
              onChange={(e) => setSubDuration(e.target.value)}
              className="w-full p-2 border rounded text-black"
              placeholder="30"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-black">Amount (ETH)</label>
            <input
              type="text"
              value={subAmount}
              onChange={(e) => setSubAmount(e.target.value)}
              className="w-full p-2 border rounded text-black"
              placeholder="0.1"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleSubscribe}
              disabled={isSubscribingEth}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
            >
              {isSubscribingEth ? 'Subscribing...' : 'Subscribe with ETH'}
            </button>
            
            <button
              onClick={handleSubscribeWithTokens}
              disabled={isSubscribingToken}
              className="px-4 py-2 bg-indigo-500 text-white rounded disabled:bg-indigo-300"
            >
              {isSubscribingToken ? 'Subscribing...' : 'Subscribe with PARAIZO'}
            </button>
            
            <button
              onClick={handleRenew}
              disabled={isRenewingEth}
              className="px-4 py-2 bg-green-500 text-white rounded disabled:bg-green-300"
            >
              {isRenewingEth ? 'Renewing...' : 'Renew with ETH'}
            </button>
            
            <button
              onClick={handleRenewWithTokens}
              disabled={isRenewingToken}
              className="px-4 py-2 bg-purple-500 text-white rounded disabled:bg-purple-300"
            >
              {isRenewingToken ? 'Renewing...' : 'Renew with PARAIZO'}
            </button>
            
            <button
              onClick={handleCancel}
              disabled={isCancelling}
              className="px-4 py-2 bg-red-500 text-white rounded disabled:bg-red-300"
            >
              {isCancelling ? 'Cancelling...' : 'Cancel'}
            </button>
          </div>
        </div>

        {/* Tip Section */}
        <div className="p-4 bg-purple-50 rounded-lg text-black">
          <h2 className="text-xl font-semibold mb-4 text-black">Tip Contract</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-black">Streamer Address</label>
            <input
              type="text"
              value={streamerAddress}
              onChange={(e) => setStreamerAddress(e.target.value)}
              className="w-full p-2 border rounded text-black"
              placeholder="0x..."
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-black">Amount (ETH)</label>
            <input
              type="text"
              value={tipAmount}
              onChange={(e) => setTipAmount(e.target.value)}
              className="w-full p-2 border rounded text-black"
              placeholder="0.01"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-black">Message</label>
            <input
              type="text"
              value={tipMessage}
              onChange={(e) => setTipMessage(e.target.value)}
              className="w-full p-2 border rounded text-black"
              placeholder="Thanks for the great stream!"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleTip}
              disabled={isTippingEth}
              className="px-4 py-2 bg-purple-500 text-white rounded disabled:bg-purple-300"
            >
              {isTippingEth ? 'Tipping...' : 'Send ETH Tip'}
            </button>
            
            <button
              onClick={handleTipWithToken}
              disabled={isTippingToken}
              className="px-4 py-2 bg-indigo-500 text-white rounded disabled:bg-indigo-300"
            >
              {isTippingToken ? 'Tipping...' : 'Send PARAIZO Tip'}
            </button>
            
            <button
              onClick={handleWithdraw}
              disabled={isWithdrawingEth}
              className="px-4 py-2 bg-yellow-500 text-white rounded disabled:bg-yellow-300"
            >
              {isWithdrawingEth ? 'Withdrawing...' : 'Withdraw ETH Tips'}
            </button>
            
            <button
              onClick={handleWithdrawToken}
              disabled={isWithdrawingToken}
              className="px-4 py-2 bg-green-500 text-white rounded disabled:bg-green-300"
            >
              {isWithdrawingToken ? 'Withdrawing...' : 'Withdraw PARAIZO Tips'}
            </button>
          </div>
        </div>

        {/* Paraizo Ecosystem Section */}
        <div className="p-4 bg-green-50 rounded-lg text-black">
          <h2 className="text-xl font-semibold mb-4 text-black">Paraizo Ecosystem Contract</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-black">Stake Amount (PARAIZO)</label>
            <input
              type="text"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
              className="w-full p-2 border rounded text-black"
              placeholder="100"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-black">Unstake Amount (PARAIZO)</label>
            <input
              type="text"
              value={unstakeAmount}
              onChange={(e) => setUnstakeAmount(e.target.value)}
              className="w-full p-2 border rounded text-black"
              placeholder="10"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleStake}
              disabled={isStaking}
              className="px-4 py-2 bg-green-500 text-white rounded disabled:bg-green-300"
            >
              {isStaking ? 'Staking...' : 'Stake PARAIZO'}
            </button>
            
            <button
              onClick={handleUnstake}
              disabled={isStaking}
              className="px-4 py-2 bg-yellow-500 text-white rounded disabled:bg-yellow-300"
            >
              {isStaking ? 'Unstaking...' : 'Unstake PARAIZO'}
            </button>
            
            <button
              onClick={handleClaimRewards}
              disabled={isStaking}
              className="px-4 py-2 bg-indigo-500 text-white rounded disabled:bg-indigo-300"
            >
              {isStaking ? 'Claiming...' : 'Claim Rewards'}
            </button>
          </div>
        </div>

        {/* Paraizo Token Section */}
        <div className="p-4 bg-yellow-50 rounded-lg text-black">
          <h2 className="text-xl font-semibold mb-4 text-black">Paraizo Token Contract</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-black">Spender Address</label>
            <input
              type="text"
              value={spenderAddress}
              onChange={(e) => setSpenderAddress(e.target.value)}
              className="w-full p-2 border rounded text-black"
              placeholder="0x..."
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-black">Amount (PARAIZO)</label>
            <input
              type="text"
              value={approveAmount}
              onChange={(e) => setApproveAmount(e.target.value)}
              className="w-full p-2 border rounded text-black"
              placeholder="100"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleApprove}
              disabled={isTokenPending}
              className="px-4 py-2 bg-yellow-500 text-white rounded disabled:bg-yellow-300"
            >
              {isTokenPending ? 'Approving...' : 'Approve Spender'}
            </button>
            
            <button
              onClick={handleTransfer}
              disabled={isTokenPending}
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-blue-300"
            >
              {isTokenPending ? 'Transferring...' : 'Transfer Tokens'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}