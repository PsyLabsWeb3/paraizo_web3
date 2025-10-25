import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Send, Bot } from 'lucide-react'

export function ChatPanel() {
  const mockMessages = [
    { id: '1', user: 'CryptoGuru', message: 'Great explanation so far!', timestamp: '2:34 PM' },
    { id: '2', user: 'DeFiMaster', message: 'When will you cover yield farming?', timestamp: '2:35 PM' },
    { id: '3', user: 'NFTCollector', message: 'Amazing project! How do I get involved?', timestamp: '2:36 PM' },
    { id: '4', user: 'Web3Newbie', message: 'Can you slow down a bit? New to this', timestamp: '2:37 PM' },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Chat</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3 h-80 overflow-y-auto pr-2">
          {mockMessages.map((msg) => (
            <div key={msg.id} className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{msg.user}</span>
                <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
              </div>
              <p className="text-sm ml-6">{msg.message}</p>
            </div>
          ))}
        </div>
        
        <div className="flex gap-2">
          <Input placeholder="Type a message..." className="rounded-r-none" />
          <Button className="rounded-l-none">
            <Send className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="text-center text-xs text-muted-foreground">
          <p>Chat is powered by Web3 and may contain tips</p>
        </div>
      </CardContent>
    </Card>
  )
}