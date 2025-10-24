"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Volume2, VolumeX, Maximize, Settings } from "lucide-react"
import { useState } from "react"

export function VideoPlayer() {
  const [isMuted, setIsMuted] = useState(false)
  const viewers = 1234

  return (
    <Card className="overflow-hidden border-border">
      <div className="relative aspect-video bg-black">
        {/* Video placeholder - in production this would be a real video stream */}
        <img src="/live-streaming-video-player.jpg" alt="Live stream" className="w-full h-full object-cover" />

        {/* Live indicator */}
        <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
            LIVE
          </span>
        </Badge>

        {/* Viewer count */}
        <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/70 backdrop-blur-sm px-3 py-2 rounded">
          <Eye className="h-4 w-4" />
          <span className="text-sm font-medium">{viewers.toLocaleString()}</span>
        </div>

        {/* Video controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-white hover:bg-white/20"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button size="icon" variant="ghost" className="h-8 w-8 text-white hover:bg-white/20">
                <Settings className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="h-8 w-8 text-white hover:bg-white/20">
                <Maximize className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
