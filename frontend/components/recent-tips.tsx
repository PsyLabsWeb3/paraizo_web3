'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { useAccount, usePublicClient, useWatchContractEvent } from 'wagmi'
import { useEffect, useState } from 'react'
import { formatEther, parseAbiItem } from 'viem'
import { CONTRACT_ADDRESSES } from '@/lib/constants'
import tipAbi from '@/lib/abis/tip.json'

interface Tip {
  id: string;
  from: string;
  amount: string;
  timestamp: string; // We might not get exact timestamp easily from logs without block fetching, so we'll use "Recent" or block number
  currency: string;
  message: string;
}

export function RecentTips() {
  const { isConnected, address } = useAccount();
  const publicClient = usePublicClient();
  const [tips, setTips] = useState<Tip[]>([]);
  const [loading, setLoading] = useState(true);

  // Load past tips on mount
  useEffect(() => {
    if (!isConnected || !address || !publicClient) return;

    const fetchPastTips = async () => {
      try {
        setLoading(true);
        const currentBlock = await publicClient.getBlockNumber();
        const fromBlock = currentBlock - BigInt(10000); // Look back ~10000 blocks (approx 1-2 days on Base)

        const logs = await publicClient.getLogs({
          address: CONTRACT_ADDRESSES.TIP_CONTRACT as `0x${string}`,
          event: parseAbiItem('event TipSent(address indexed from, address indexed to, uint256 amount, string message, bool isTokenTip)'),
          args: {
            to: address as `0x${string}`
          },
          fromBlock: fromBlock > BigInt(0) ? fromBlock : BigInt(0),
          toBlock: 'latest'
        });

        const formattedTips = logs.map((log) => ({
          id: log.transactionHash,
          from: log.args.from!,
          amount: formatEther(log.args.amount!),
          timestamp: `Block ${log.blockNumber}`,
          currency: log.args.isTokenTip ? 'TOKEN' : 'ETH',
          message: log.args.message || ''
        })).reverse(); // Newest first

        setTips(formattedTips);
      } catch (error) {
        console.error("Error fetching past tips:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPastTips();
  }, [isConnected, address, publicClient]);

  // Listen for new tips
  useWatchContractEvent({
    address: CONTRACT_ADDRESSES.TIP_CONTRACT as `0x${string}`,
    abi: tipAbi,
    eventName: 'TipSent',
    args: {
      to: address,
    },
    onLogs: (logs) => {
      const newTips = logs.map((log: any) => ({
        id: log.transactionHash,
        from: log.args.from,
        amount: formatEther(log.args.amount),
        timestamp: 'Just now',
        currency: log.args.isTokenTip ? 'TOKEN' : 'ETH',
        message: log.args.message
      }));
      setTips((prev) => [...newTips, ...prev]);
    },
  });

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-4">Connect wallet to view recent tips</p>
        </CardContent>
      </Card>
    );
  }

  if (loading && tips.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-muted"></div>
                  <div>
                    <div className="h-4 w-24 bg-muted rounded mb-1"></div>
                    <div className="h-3 w-16 bg-muted rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Tips</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tips.length > 0 ? (
            tips.map((tip) => (
              <div key={tip.id} className="flex items-center justify-between border-b pb-2 last:border-0">
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback>{tip.from.substring(2, 4).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">
                      {tip.from.substring(0, 6)}...{tip.from.substring(tip.from.length - 4)}
                    </p>
                    <p className="text-xs text-muted-foreground">{tip.timestamp}</p>
                    {tip.message && <p className="text-xs italic text-muted-foreground">"{tip.message}"</p>}
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{parseFloat(tip.amount).toFixed(4)} {tip.currency}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground text-center py-4">No recent tips found</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}