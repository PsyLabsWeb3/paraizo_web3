"use client"

import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function NotificationSettings() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [newFollowers, setNewFollowers] = useState(true)
  const [tips, setTips] = useState(true)
  const [streamStart, setStreamStart] = useState(false)
  const [chatMessages, setChatMessages] = useState(true)

  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label htmlFor="email-notifications">Email Notifications</Label>
            <p className="text-sm text-muted-foreground">Receive notifications via email</p>
          </div>
          <Switch id="email-notifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
        </div>

        <div className="pt-4 border-t border-border space-y-4">
          <h3 className="font-semibold">Notification Preferences</h3>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="new-followers">New Followers</Label>
              <p className="text-sm text-muted-foreground">Get notified when someone follows you</p>
            </div>
            <Switch id="new-followers" checked={newFollowers} onCheckedChange={setNewFollowers} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="tips">Tips Received</Label>
              <p className="text-sm text-muted-foreground">Get notified when you receive tips</p>
            </div>
            <Switch id="tips" checked={tips} onCheckedChange={setTips} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="stream-start">Stream Start Reminders</Label>
              <p className="text-sm text-muted-foreground">Remind you when it's time to go live</p>
            </div>
            <Switch id="stream-start" checked={streamStart} onCheckedChange={setStreamStart} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="chat-messages">Chat Messages</Label>
              <p className="text-sm text-muted-foreground">Get notified of important chat messages</p>
            </div>
            <Switch id="chat-messages" checked={chatMessages} onCheckedChange={setChatMessages} />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4 border-t border-border">
        <Button variant="outline">Reset to Default</Button>
        <Button>Save Preferences</Button>
      </div>
    </Card>
  )
}
