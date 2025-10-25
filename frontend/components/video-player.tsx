import { Card, CardContent } from '@/components/ui/card'

export function VideoPlayer() {
  return (
    <Card className="overflow-hidden">
      <div className="relative pt-[56.25%] bg-muted">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="bg-muted rounded-lg w-full h-full flex items-center justify-center">
              <div className="space-y-4">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64 md:h-96 flex items-center justify-center text-gray-500">
                  YouTube Live Player would appear here
                </div>
                <p className="text-sm text-muted-foreground">
                  This is where the YouTube Live stream would appear
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}