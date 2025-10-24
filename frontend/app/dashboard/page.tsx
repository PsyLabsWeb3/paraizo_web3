import { Header } from "@/components/header"
import { StreamControls } from "@/components/stream-controls"
import { AnalyticsCards } from "@/components/analytics-cards"
import { RecentTips } from "@/components/recent-tips"
import { StreamSettings } from "@/components/stream-settings"

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header isAuthenticated={true} walletBalance="2.3 ETH" userRole="creator" />

      <main className="flex-1 container px-4 py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Creator Dashboard</h1>
            <p className="text-muted-foreground">Manage your streams and track your earnings</p>
          </div>

          <StreamControls />

          <AnalyticsCards />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentTips />
            <StreamSettings />
          </div>
        </div>
      </main>
    </div>
  )
}
