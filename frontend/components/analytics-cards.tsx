'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, Coins, Users, Eye } from 'lucide-react'
import { useAccount, useReadContract } from 'wagmi'
import { formatEther } from 'viem'
import { CONTRACT_ADDRESSES } from '@/lib/constants'
import tipAbi from '@/lib/abis/tip.json'
import subscriptionAbi from '@/lib/abis/subscription.json'

export function AnalyticsCards() {
  const { isConnected, address } = useAccount();

  // Read Total Tips Received (ETH)
  const { data: ethTipsReceived } = useReadContract({
    address: CONTRACT_ADDRESSES.TIP_CONTRACT,
    abi: tipAbi,
    functionName: 'ethTipsReceived',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    }
  });

  // Read Total Subscription Earnings (ETH)
  const { data: ethSubEarnings } = useReadContract({
    address: CONTRACT_ADDRESSES.SUBSCRIPTION_CONTRACT,
    abi: subscriptionAbi,
    functionName: 'ethEarnings',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    }
  });

  // Calculate Total Earnings (Tips + Subs)
  const totalTipsEth = ethTipsReceived ? formatEther(ethTipsReceived as bigint) : '0';
  const totalSubsEth = ethSubEarnings ? formatEther(ethSubEarnings as bigint) : '0';
  const totalEarningsEth = (parseFloat(totalTipsEth) + parseFloat(totalSubsEth)).toFixed(4);

  if (!isConnected) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Connect Wallet</div>
            <p className="text-xs text-muted-foreground">to view earnings</p>
          </CardContent>
        </Card>
        {/* Placeholders for other cards */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tips Received</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Viewers</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subscribers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Earnings Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
          <Coins className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalEarningsEth} ETH</div>
          <p className="text-xs text-muted-foreground">
            {totalTipsEth} ETH from Tips + {totalSubsEth} ETH from Subs
          </p>
        </CardContent>
      </Card>

      {/* Tips Received Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tips Received</CardTitle>
          <TrendingUp className="h-4 w-4 text-secondary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalTipsEth} ETH</div>
          <p className="text-xs text-muted-foreground">Lifetime received</p>
        </CardContent>
      </Card>

      {/* Total Viewers Card (Placeholder for Livepeer) */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Viewers</CardTitle>
          <Eye className="h-4 w-4 text-accent" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">0</div>
          <p className="text-xs text-muted-foreground">Livepeer integration pending</p>
        </CardContent>
      </Card>

      {/* Subscribers Card (Placeholder) */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Subscribers</CardTitle>
          <Users className="h-4 w-4 text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">0</div>
          <p className="text-xs text-muted-foreground">Requires Indexer</p>
        </CardContent>
      </Card>
    </div>
  );
}