"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye } from "lucide-react"
import Link from "next/link"

const featuredShows = [
  {
    id: "1",
    title: "Late Night Coding Session",
    creator: "DevMaster",
    thumbnail: "/coding-setup-dark-theme.jpg",
    viewers: 1234,
    category: "Tech",
    isLive: true,
  },
  {
    id: "2",
    title: "Music Production Live",
    creator: "BeatMaker",
    thumbnail: "/music-studio-production.png",
    viewers: 856,
    category: "Music",
    isLive: true,
  },
]

export function FeaturedShows() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {featuredShows.map((show) => (
        <Link key={show.id} href={`/show/${show.id}`}>
          <Card className="group overflow-hidden border-border hover:border-primary transition-all duration-300 cursor-pointer">
            <div className="relative aspect-video overflow-hidden">
              <img
                src={show.thumbnail || "/placeholder.svg"}
                alt={show.title}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              />
              {show.isLive && (
                <Badge className="absolute top-3 left-3 bg-destructive text-destructive-foreground">
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                    LIVE
                  </span>
                </Badge>
              )}
              <div className="absolute bottom-3 right-3 flex items-center gap-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded">
                <Eye className="h-4 w-4" />
                <span className="text-sm font-medium">{show.viewers.toLocaleString()}</span>
              </div>
            </div>
            <div className="p-4 space-y-2">
              <h3 className="font-semibold text-lg text-balance group-hover:text-primary transition-colors">
                {show.title}
              </h3>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{show.creator}</p>
                <Badge variant="secondary">{show.category}</Badge>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
}
