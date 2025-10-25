import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function StreamSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Stream Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Stream Title</Label>
          <Input id="title" placeholder="Enter stream title" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" placeholder="Describe your stream" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select>
            <SelectTrigger id="category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gaming">Gaming</SelectItem>
              <SelectItem value="tech">Technology</SelectItem>
              <SelectItem value="music">Music</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="tags">Tags</Label>
          <Input id="tags" placeholder="Add tags separated by commas" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="youtube">YouTube Live URL</Label>
          <Input id="youtube" placeholder="https://youtube.com/live/..." />
        </div>
        
        <Button className="w-full mt-4">Save Settings</Button>
      </CardContent>
    </Card>
  )
}