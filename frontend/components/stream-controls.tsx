"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Video, VideoOff, Mic, MicOff, Settings } from "lucide-react"
import { useState } from "react"

export function StreamControls() {
  const [isLive, setIsLive] = useState(false)
  const [isCameraOn, setIsCameraOn] = useState(true)
  const [isMicOn, setIsMicOn] = useState(true)

  return (
    <Card className="p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold">Stream Status</h2>
            <Badge variant={isLive ? "destructive" : "secondary"}>
              {isLive ? (
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                  LIVE
                </span>
              ) : (
                "OFFLINE"
              )}
            </Badge>
          </div>
          {isLive && (
            <p className="text-sm text-muted-foreground">
              You've been live for <span className="font-medium text-foreground">1h 23m</span>
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsCameraOn(!isCameraOn)}
            className={!isCameraOn ? "bg-destructive/10 text-destructive" : ""}
          >
            {isCameraOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsMicOn(!isMicOn)}
            className={!isMicOn ? "bg-destructive/10 text-destructive" : ""}
          >
            {isMicOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant={isLive ? "destructive" : "default"}
            onClick={() => setIsLive(!isLive)}
            className="ml-2"
          >
            {isLive ? "End Stream" : "Go Live"}
          </Button>
        </div>
      </div>
    </Card>
  )
}
