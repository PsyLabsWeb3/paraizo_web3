import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Coins, DollarSign, Gem, Zap } from 'lucide-react'

export function TipPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Send a Tip</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Coins className="h-4 w-4 mr-2" />
              ETH
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <DollarSign className="h-4 w-4 mr-2" />
              USDC
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <Gem className="h-4 w-4 mr-2" />
              DAI
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" className="flex-1">
              0.01 ETH
            </Button>
            <Button variant="secondary" size="sm" className="flex-1">
              0.05 ETH
            </Button>
            <Button variant="secondary" size="sm" className="flex-1">
              0.1 ETH
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="custom-amount">Custom Amount</Label>
          <div className="flex gap-2">
            <Input id="custom-amount" placeholder="0.00" />
            <Button size="sm">
              <Zap className="h-4 w-4 mr-2" />
              Tip
            </Button>
          </div>
        </div>
        
        <div className="pt-4 border-t">
          <div className="flex justify-between mb-2">
            <span className="text-sm">Total Tips:</span>
            <span className="font-medium">0.52 ETH</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">Value:</span>
            <span className="font-medium">$1,300.00</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}