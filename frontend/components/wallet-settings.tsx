import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export function WalletSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Wallet Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Connected Wallet</Label>
          <div className="flex items-center justify-between p-3 bg-muted rounded-md">
            <span>0x1234...5678</span>
            <Badge variant="outline">Connected</Badge>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Withdraw Tips</Label>
          <p className="text-sm text-muted-foreground">
            Withdraw your earned tips to your connected wallet
          </p>
          <Button variant="secondary" className="w-full">
            Withdraw All Tips
          </Button>
        </div>
        
        <div className="space-y-2">
          <Label>Secondary Wallet</Label>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Not set</span>
            <Button variant="outline" size="sm">
              Add Wallet
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}