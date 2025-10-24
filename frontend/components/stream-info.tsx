"use client"

import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Share2 } from "lucide-react"
import { useState } from "react"

interface StreamInfoProps {
  showId: string
}

export function StreamInfo({ showId }: StreamInfoProps) {
  const [isFollowing, setIsFollowing] = useState(false)

  // Mock data - in production this would come from an API
  const streamData = {
    title: "Late Night Coding Session - Building a Web3 DApp",
    creator: "DevMaster",
    avatar: "/developer-avatar.png",
    followers: "12.5K",
    category: "Tech",
    description:
      "Join me as we build a decentralized application from scratch using Solidity and React. We'll cover smart contract development, testing, and frontend integration. Feel free to ask questions in chat!",
    tags: ["Web3", "Solidity", "React", "DApp", "Blockchain"],
  }

  return (
    <Card className="p-6 space-y-4">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold text-balance">{streamData.title}</h1>

        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={streamData.avatar || "/placeholder.svg"} alt={streamData.creator} />
              <AvatarFallback>{streamData.creator[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{streamData.creator}</p>
              <p className="text-sm text-muted-foreground">{streamData.followers} followers</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={isFollowing ? "secondary" : "default"}
              onClick={() => setIsFollowing(!isFollowing)}
              className="gap-2"
            >
              <Heart className={`h-4 w-4 ${isFollowing ? "fill-current" : ""}`} />
              {isFollowing ? "Following" : "Follow"}
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <Badge variant="secondary">{streamData.category}</Badge>
        {streamData.tags.map((tag) => (
          <Badge key={tag} variant="outline">
            {tag}
          </Badge>
        ))}
      </div>

      <div className="pt-2 border-t border-border">
        <p className="text-sm text-muted-foreground leading-relaxed">{streamData.description}</p>
      </div>
    </Card>
  )
}
