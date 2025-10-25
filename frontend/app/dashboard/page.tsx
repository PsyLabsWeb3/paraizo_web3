import { Header } from '@/components/header'
import { StreamControls } from '@/components/stream-controls'
import { AnalyticsCards } from '@/components/analytics-cards'
import { RecentTips } from '@/components/recent-tips'
import { StreamSettings } from '@/components/stream-settings'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Creator Dashboard</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <StreamControls />
            <AnalyticsCards />
            <RecentTips />
          </div>
          <div>
            <StreamSettings />
          </div>
        </div>
      </main>
    </div>
  )
}