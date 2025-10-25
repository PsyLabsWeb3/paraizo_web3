import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

interface Tip {
  id: string
  from: string
  amount: string
  timestamp: string
  currency: string
}

const mockTips: Tip[] = [
  { id: '1', from: '0x1234...5678', amount: '0.12', timestamp: '2 min ago', currency: 'ETH' },
  { id: '2', from: '0xabcd...efgh', amount: '45.50', timestamp: '5 min ago', currency: 'USDC' },
  { id: '3', from: '0x9876...5432', amount: '0.05', timestamp: '8 min ago', currency: 'ETH' },
  { id: '4', from: '0xdcba...hgf', amount: '20.00', timestamp: '12 min ago', currency: 'USDC' },
  { id: '5', from: '0x1111...2222', amount: '0.08', timestamp: '15 min ago', currency: 'ETH' },
]

export function RecentTips() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Tips</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockTips.map((tip) => (
            <div key={tip.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarFallback>{tip.from.substring(2, 4).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{tip.from}</p>
                  <p className="text-xs text-muted-foreground">{tip.timestamp}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">{tip.amount} {tip.currency}</p>
                <Badge variant="secondary" className="text-xs mt-1">
                  ${parseFloat(tip.amount) * 2500} USD
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}