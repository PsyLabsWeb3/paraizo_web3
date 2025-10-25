import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Play, Users, Coins } from 'lucide-react'

interface Show {
  id: string
  title: string
  creator: string
  viewers: number
  category: string
  thumbnail: string
  isLive: boolean
}

const mockShows: Show[] = [
  {
    id: '1',
    title: 'Live Coding with Web3',
    creator: 'DevWithNoName',
    viewers: 1242,
    category: 'Tech',
    thumbnail: 'https://placehold.co/400x225',
    isLive: true
  },
  {
    id: '2',
    title: 'Crypto Market Analysis',
    creator: 'CryptoGuru',
    viewers: 3567,
    category: 'Finance',
    thumbnail: 'https://placehold.co/400x225',
    isLive: true
  },
  {
    id: '3',
    title: 'Gaming with the Community',
    creator: 'ProGamer',
    viewers: 2109,
    category: 'Gaming',
    thumbnail: 'https://placehold.co/400x225',
    isLive: true
  },
  {
    id: '4',
    title: 'Web3 AMA Session',
    creator: 'BlockchainExpert',
    viewers: 876,
    category: 'Education',
    thumbnail: 'https://placehold.co/400x225',
    isLive: true
  },
  {
    id: '5',
    title: 'Music Production Live',
    creator: 'BeatsByAI',
    viewers: 1567,
    category: 'Music',
    thumbnail: 'https://placehold.co/400x225',
    isLive: true
  },
  {
    id: '6',
    title: 'DeFi Workshop',
    creator: 'DeFiMaster',
    viewers: 2345,
    category: 'Finance',
    thumbnail: 'https://placehold.co/400x225',
    isLive: true
  }
]

export function LiveShowGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockShows.map((show) => (
        <Card key={show.id} className="overflow-hidden group">
          <div className="relative">
            <img 
              src={show.thumbnail} 
              alt={show.title}
              className="w-full h-40 object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute top-2 left-2">
              <Badge variant="secondary" className="bg-destructive text-destructive-foreground">
                LIVE
              </Badge>
            </div>
            <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs flex items-center gap-1">
              <Users className="h-3 w-3" />
              {show.viewers.toLocaleString()}
            </div>
          </div>
          <CardHeader className="p-4">
            <CardTitle className="text-lg line-clamp-1">{show.title}</CardTitle>
            <p className="text-sm text-muted-foreground">@{show.creator}</p>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className="text-xs">
                {show.category}
              </Badge>
            </div>
          </CardHeader>
          <CardFooter className="p-4 pt-0">
            <Button className="w-full">
              <Play className="h-4 w-4 mr-2" />
              Watch
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}