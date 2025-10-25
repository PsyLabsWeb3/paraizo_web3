import { Header } from '@/components/header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Coins, Users, Eye, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default function CreatorsPage() {
  // Mock data - en producción vendrá del backend/smart contracts
  const creators = [
    {
      id: 1,
      username: "cryptogamer",
      avatar: "/avatars/01.png",
      followers: 15420,
      totalTips: "12.5 ETH",
      liveViewers: 234,
      category: "Gaming",
      isLive: true,
      walletAddress: "0x1234...5678"
    },
    {
      id: 2,
      username: "defiexplainer",
      avatar: "/avatars/02.png", 
      followers: 8930,
      totalTips: "8.2 ETH",
      liveViewers: 0,
      category: "Education",
      isLive: false,
      walletAddress: "0x8765...4321"
    },
    {
      id: 3,
      username: "nftartist",
      avatar: "/avatars/03.png",
      followers: 22100,
      totalTips: "18.7 ETH",
      liveViewers: 156,
      category: "Art",
      isLive: true,
      walletAddress: "0x9876...1234"
    },
    {
      id: 4,
      username: "web3dev",
      avatar: "/avatars/04.png",
      followers: 6750,
      totalTips: "5.3 ETH",
      liveViewers: 0,
      category: "Tech",
      isLive: false,
      walletAddress: "0x4567...8901"
    },
    {
      id: 5,
      username: "tradingpro",
      avatar: "/avatars/05.png",
      followers: 31200,
      totalTips: "25.1 ETH",
      liveViewers: 445,
      category: "Finance",
      isLive: true,
      walletAddress: "0x2345...6789"
    },
    {
      id: 6,
      username: "musicdao",
      avatar: "/avatars/06.png",
      followers: 12800,
      totalTips: "9.8 ETH",
      liveViewers: 0,
      category: "Music",
      isLive: false,
      walletAddress: "0x3456...7890"
    }
  ]

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
          <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-200 dark:border-purple-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-purple-500" />
                <span>Platform Stats - Base Network</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">156</div>
                  <div className="text-sm text-muted-foreground">Active Creators</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">127.3 ETH</div>
                  <div className="text-sm text-muted-foreground">Total Tips Sent</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">12,450</div>
                  <div className="text-sm text-muted-foreground">Total Viewers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">Base</div>
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
                      <Avatar className="h-12 w-12 ring-2 ring-purple-500/20">
                        <AvatarImage src={creator.avatar} alt={`${creator.username} avatar`} />
                        <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white">
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
                        <Coins className="h-4 w-4 text-yellow-500" />
                        <span className="font-semibold text-yellow-600 dark:text-yellow-400">
                          {creator.totalTips}
                        </span>
                      </div>
                      <span className="text-muted-foreground">earned</span>
                    </div>
                    
                    {creator.isLive && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Eye className="h-4 w-4 text-red-500" />
                          <span className="text-red-600 dark:text-red-400 font-semibold">
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
                      className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
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
                      className="hover:bg-yellow-50 hover:border-yellow-400 dark:hover:bg-yellow-950"
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
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              Live Now
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {creators.filter(creator => creator.isLive).map((creator) => (
                <Card key={`live-${creator.id}`} className="border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/20">
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
                        <div className="flex items-center text-sm text-red-600 dark:text-red-400">
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

          {/* Connect Wallet CTA */}
          <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-bold mb-2">Start Supporting Creators</h3>
              <p className="mb-4 text-purple-100">
                Connect your wallet to send tips and join the Web3 streaming revolution
              </p>
              <Button variant="secondary" size="lg" className="bg-white text-purple-600 hover:bg-purple-50">
                Connect Wallet
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}