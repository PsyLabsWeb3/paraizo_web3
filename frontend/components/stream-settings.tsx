"use client"

import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings } from "lucide-react"
import { useState } from "react"

export function StreamSettings() {
  const [title, setTitle] = useState("Late Night Coding Session")
  const [category, setCategory] = useState("tech")
  const [description, setDescription] = useState("Building cool Web3 projects")

  return (
    <Card className="flex flex-col">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Stream Settings</h3>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="stream-title">Stream Title</Label>
          <Input
            id="stream-title"
            placeholder="Enter stream title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="stream-category">Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger id="stream-category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gaming">Gaming</SelectItem>
              <SelectItem value="music">Music</SelectItem>
              <SelectItem value="tech">Tech</SelectItem>
              <SelectItem value="art">Art</SelectItem>
              <SelectItem value="talk">Talk Shows</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="stream-description">Description</Label>
          <Textarea
            id="stream-description"
            placeholder="Describe your stream"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </div>

        <Button className="w-full">Save Settings</Button>
      </div>
    </Card>
  )
}
