'use client'

import { Header } from '@/components/header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Coins, Users, Eye, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { useAccount } from 'wagmi'

export default function CreatorsPage() {
  const { isConnected } = useAccount()
  
  // Mock data - en producción vendrá del backend/smart contracts
  const creators: Array<{
    id: number;
    username: string;
    avatar: string;
    followers: number;
    totalTips: string;
    liveViewers: number;
    category: string;
    isLive: boolean;
    walletAddress: string;
  }> = []

  return (
    <div className="min-h-screen bg-background px-4 md:px-8 lg:px-16">
      <Header />
      <main className="py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Featured Creators</h1>
            <p className="text-muted-foreground mt-2">
              Support your favorite Web3 creators with crypto tips on Base network
            </p>
          </div>

          {/* Web3 Platform Stats */}
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span>Platform Stats - Base Network</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">0</div>
                  <div className="text-sm text-muted-foreground">Active Creators</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">0 ETH</div>
                  <div className="text-sm text-muted-foreground">Total Tips Sent</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">0</div>
                  <div className="text-sm text-muted-foreground">Total Viewers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">Base</div>
                  <div className="text-sm text-muted-foreground">Network</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Creators Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {creators.map((creator) => (
              <Card key={creator.id} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardHeader className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                        <AvatarImage src={creator.avatar} alt={`${creator.username} avatar`} />
                        <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground">
                          {creator.username[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{creator.username}</CardTitle>
                        <p className="text-xs text-muted-foreground font-mono">
                          {creator.walletAddress}
                        </p>
                      </div>
                    </div>
                    {creator.isLive && (
                      <Badge variant="destructive" className="animate-pulse">
                        LIVE
                      </Badge>
                    )}
                  </div>
                  <Badge variant="secondary" className="w-fit">{creator.category}</Badge>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-3 text-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{creator.followers.toLocaleString()}</span>
                      </div>
                      <span className="text-muted-foreground">followers</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Coins className="h-4 w-4 text-accent" />
                        <span className="font-semibold text-accent">
                          {creator.totalTips}
                        </span>
                      </div>
                      <span className="text-muted-foreground">earned</span>
                    </div>

                    {creator.isLive && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Eye className="h-4 w-4 text-destructive" />
                          <span className="text-destructive font-semibold">
                            {creator.liveViewers}
                          </span>
                        </div>
                        <span className="text-muted-foreground">watching</span>
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button
                      variant="default"
                      className="flex-1"
                      asChild
                    >
                      <Link href={`/show/${creator.id}`}>
                        {creator.isLive ? 'Watch Live' : 'View Profile'}
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      title="Send Tip"
                      className="hover:bg-accent/10 hover:border-accent"
                    >
                      <Coins className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Live Creators Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <div className="w-3 h-3 bg-destructive rounded-full animate-pulse"></div>
              Live Now
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {creators.filter(creator => creator.isLive).map((creator) => (
                <Card key={`live-${creator.id}`} className="border-destructive/20 bg-destructive/5">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={creator.avatar} alt={`${creator.username} avatar`} />
                        <AvatarFallback>{creator.username[0].toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold truncate">{creator.username}</p>
                        <p className="text-sm text-muted-foreground">{creator.category}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-sm text-destructive">
                          <Eye className="h-3 w-3 mr-1" />
                          {creator.liveViewers}
                        </div>
                        <Badge variant="destructive" className="text-xs">LIVE</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Connect Wallet CTA - Hidden when wallet is connected */}
          {!isConnected && (
            <Card className="bg-gradient-to-r from-primary to-secondary text-primary-foreground border-0">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-bold mb-2">Start Supporting Creators</h3>
                <p className="mb-4 opacity-90">
                  Connect your wallet to send tips and join the Web3 streaming revolution
                </p>
                <Button variant="default" size="lg">
                  Connect Wallet
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}