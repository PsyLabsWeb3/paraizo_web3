import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Users, Heart, Share, ExternalLink } from 'lucide-react'

export function StreamInfo() {
  return (
    <Card className="mt-4">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Stream Title</CardTitle>
            <p className="text-muted-foreground">@creator</p>
          </div>
          <Badge variant="secondary">Tech</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>0 viewers</span>
          </div>
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            <span>0 followers</span>
          </div>
        </div>
        
        <p className="text-muted-foreground mb-4">
          Stream description will appear here.
        </p>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Heart className="h-4 w-4 mr-2" />
            Follow
          </Button>
          <Button variant="outline" size="sm">
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm" className="ml-auto">
            <ExternalLink className="h-4 w-4 mr-2" />
            YouTube
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}