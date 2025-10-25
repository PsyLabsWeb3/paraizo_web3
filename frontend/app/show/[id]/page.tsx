import { Header } from '@/components/header'
import { VideoPlayer } from '@/components/video-player'
import { StreamInfo } from '@/components/stream-info'
import { TipPanel } from '@/components/tip-panel'
import { ChatPanel } from '@/components/chat-panel'

export default function ShowDetailPage() {
  return (
    <div className="min-h-screen bg-background px-4 md:px-8 lg:px-16">
      <Header />
      <main className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <VideoPlayer />
            <StreamInfo />
          </div>
          <div className="space-y-6">
            <TipPanel />
            <ChatPanel />
          </div>
        </div>
      </main>
    </div>
  )
}