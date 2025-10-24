"use client"

import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Coins } from "lucide-react"

const recentTips = [
  {
    id: "1",
    user: "CryptoWhale",
    avatar: "/placeholder.svg",
    amount: "0.5 ETH",
    message: "Amazing content! Keep it up!",
    timestamp: "2 minutes ago",
  },
  {
    id: "2",
    user: "BlockchainFan",
    avatar: "/placeholder.svg",
    amount: "0.1 ETH",
    message: "Love your streams",
    timestamp: "15 minutes ago",
  },
  {
    id: "3",
    user: "DevSupporter",
    avatar: "/placeholder.svg",
    amount: "0.05 ETH",
    message: "Thanks for the tutorial!",
    timestamp: "1 hour ago",
  },
  {
    id: "4",
    user: "Web3Learner",
    avatar: "/placeholder.svg",
    amount: "0.02 ETH",
    message: "",
    timestamp: "2 hours ago",
  },
  {
    id: "5",
    user: "TechEnthusiast",
    avatar: "/placeholder.svg",
    amount: "0.15 ETH",
    message: "Great explanation of smart contracts!",
    timestamp: "3 hours ago",
  },
]

export function RecentTips() {
  return (
    <Card className="flex flex-col">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-2">
          <Coins className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Recent Tips</h3>
        </div>
      </div>

      <ScrollArea className="flex-1 p-6 max-h-[400px]">
        <div className="space-y-4">
          {recentTips.map((tip) => (
            <div key={tip.id} className="flex gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
              <Avatar className="h-10 w-10">
                <AvatarImage src={tip.avatar || "/placeholder.svg"} alt={tip.user} />
                <AvatarFallback>{tip.user[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm">{tip.user}</span>
                  <span className="text-sm font-medium text-primary">{tip.amount}</span>
                </div>
                {tip.message && <p className="text-sm text-muted-foreground">{tip.message}</p>}
                <p className="text-xs text-muted-foreground">{tip.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  )
}
