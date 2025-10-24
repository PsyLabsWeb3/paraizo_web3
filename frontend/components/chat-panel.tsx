"use client"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, MessageSquare } from "lucide-react"
import { useState } from "react"

const mockMessages = [
  {
    id: "1",
    user: "CryptoFan",
    avatar: "/placeholder.svg",
    message: "Great stream! Love the content",
    timestamp: "2m ago",
  },
  {
    id: "2",
    user: "DevLearner",
    avatar: "/placeholder.svg",
    message: "Can you explain that last part again?",
    timestamp: "1m ago",
  },
  {
    id: "3",
    user: "BlockchainPro",
    avatar: "/placeholder.svg",
    message: "Just sent a tip! Keep up the good work",
    timestamp: "30s ago",
    isTip: true,
  },
]

export function ChatPanel() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState(mockMessages)

  const handleSendMessage = () => {
    if (!message.trim()) return

    const newMessage = {
      id: Date.now().toString(),
      user: "You",
      avatar: "/placeholder.svg",
      message: message,
      timestamp: "Just now",
    }

    setMessages([...messages, newMessage])
    setMessage("")
  }

  return (
    <Card className="flex flex-col h-[500px]">
      <div className="p-4 border-b border-border flex items-center gap-2">
        <MessageSquare className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">Live Chat</h3>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="flex gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={msg.avatar || "/placeholder.svg"} alt={msg.user} />
                <AvatarFallback>{msg.user[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">{msg.user}</span>
                  <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                </div>
                <p className={`text-sm ${msg.isTip ? "text-primary font-medium" : ""}`}>{msg.message}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Input
            placeholder="Send a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <Button size="icon" onClick={handleSendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}
