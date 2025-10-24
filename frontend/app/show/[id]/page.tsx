import { Header } from "@/components/header"
import { VideoPlayer } from "@/components/video-player"
import { ChatPanel } from "@/components/chat-panel"
import { StreamInfo } from "@/components/stream-info"
import { TipPanel } from "@/components/tip-panel"

export default function ShowPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header isAuthenticated={true} walletBalance="0.5 ETH" userRole="viewer" />

      <main className="flex-1 container px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Video and Info */}
          <div className="lg:col-span-2 space-y-4">
            <VideoPlayer />
            <StreamInfo showId={params.id} />
          </div>

          {/* Sidebar - Chat and Tips */}
          <div className="lg:col-span-1 space-y-4">
            <TipPanel />
            <ChatPanel />
          </div>
        </div>
      </main>
    </div>
  )
}
