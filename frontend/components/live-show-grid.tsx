"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye } from "lucide-react"
import Link from "next/link"

const liveShows = [
  {
    id: "3",
    title: "Building a Web3 DApp",
    creator: "CryptoDevs",
    avatar: "/developer-avatar.png",
    thumbnail: "/web3-development.png",
    viewers: 432,
    category: "Tech",
  },
  {
    id: "4",
    title: "Digital Art Stream",
    creator: "ArtistPro",
    avatar: "/artist-avatar.png",
    thumbnail: "/digital-art-creation.png",
    viewers: 289,
    category: "Art",
  },
  {
    id: "5",
    title: "Gaming Tournament Finals",
    creator: "ProGamer",
    avatar: "/gamer-avatar.png",
    thumbnail: "/gaming-tournament.png",
    viewers: 2156,
    category: "Gaming",
  },
  {
    id: "6",
    title: "Live DJ Set",
    creator: "DJElectro",
    avatar: "/dj-avatar.png",
    thumbnail: "/dj-performance.jpg",
    viewers: 678,
    category: "Music",
  },
  {
    id: "7",
    title: "Crypto Market Analysis",
    creator: "TraderJoe",
    avatar: "/trader-avatar.jpg",
    thumbnail: "/crypto-trading-charts.jpg",
    viewers: 543,
    category: "Talk",
  },
  {
    id: "8",
    title: "3D Modeling Tutorial",
    creator: "3DCreator",
    avatar: "/3d-artist-avatar.png",
    thumbnail: "/3d-modeling-software.jpg",
    viewers: 321,
    category: "Art",
  },
]

export function LiveShowGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {liveShows.map((show) => (
        <Link key={show.id} href={`/show/${show.id}`}>
          <Card className="group overflow-hidden border-border hover:border-primary transition-all duration-300 cursor-pointer">
            <div className="relative aspect-video overflow-hidden">
              <img
                src={show.thumbnail || "/placeholder.svg"}
                alt={show.title}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              />
              <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground text-xs">
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                  LIVE
                </span>
              </Badge>
              <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-xs">
                <Eye className="h-3 w-3" />
                <span className="font-medium">{show.viewers.toLocaleString()}</span>
              </div>
            </div>
            <div className="p-3 space-y-2">
              <h3 className="font-semibold text-sm text-balance line-clamp-2 group-hover:text-primary transition-colors">
                {show.title}
              </h3>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={show.avatar || "/placeholder.svg"} alt={show.creator} />
                  <AvatarFallback>{show.creator[0]}</AvatarFallback>
                </Avatar>
                <p className="text-xs text-muted-foreground">{show.creator}</p>
              </div>
              <Badge variant="secondary" className="text-xs">
                {show.category}
              </Badge>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
}
