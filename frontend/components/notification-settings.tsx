import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

export function NotificationSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="email-notifications" className="text-base">
              Email Notifications
            </Label>
            <p className="text-sm text-muted-foreground">
              Receive email notifications for new followers and tips
            </p>
          </div>
          <Switch id="email-notifications" />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="push-notifications" className="text-base">
              Push Notifications
            </Label>
            <p className="text-sm text-muted-foreground">
              Receive push notifications for important updates
            </p>
          </div>
          <Switch id="push-notifications" />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="stream-alerts" className="text-base">
              Stream Alerts
            </Label>
            <p className="text-sm text-muted-foreground">
              Get notified when your followed creators go live
            </p>
          </div>
          <Switch id="stream-alerts" defaultChecked />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="tip-notifications" className="text-base">
              Tip Notifications
            </Label>
            <p className="text-sm text-muted-foreground">
              Receive alerts when you receive tips
            </p>
          </div>
          <Switch id="tip-notifications" defaultChecked />
        </div>
      </CardContent>
    </Card>
  )
}