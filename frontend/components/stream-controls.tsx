import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Play, Square, Copy, Settings } from 'lucide-react'

export function StreamControls() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold">Current Stream</h3>
            <p className="text-sm text-muted-foreground">Not currently streaming</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Play className="h-4 w-4 mr-2" />
              Start Stream
            </Button>
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Stream Key</h3>
          <div className="flex">
            <input
              type="text"
              value="live_123456789_abcdefghijklmnopqrstuvwxyz"
              readOnly
              className="flex-1 bg-muted rounded-l px-3 py-2 text-sm"
            />
            <Button variant="outline" className="rounded-l-none rounded-r">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Use this stream key in your broadcasting software
          </p>
        </div>
      </CardContent>
    </Card>
  )
}