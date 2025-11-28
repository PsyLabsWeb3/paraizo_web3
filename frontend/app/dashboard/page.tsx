'use client'

import { Header } from '@/components/header'
import { StreamControls } from '@/components/stream-controls'
import { AnalyticsCards } from '@/components/analytics-cards'
import { RecentTips } from '@/components/recent-tips'
import { StreamSettings } from '@/components/stream-settings'
import { useAccount } from 'wagmi'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useState, useEffect } from 'react'

export default function DashboardPage() {
  const { isConnected, address } = useAccount()
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    // Render a placeholder during hydration to avoid mismatch
    return (
      <div className="min-h-screen bg-background px-4 md:px-8 lg:px-16">
        <Header />
        <main className="py-8">
          <div className="max-w-2xl mx-auto">
            <Card className="bg-gradient-to-r from-primary to-secondary text-primary-foreground border-0">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-bold mb-2">Loading Dashboard...</h3>
                <p className="mb-4 opacity-90">
                  Please wait while we load your dashboard
                </p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background px-4 md:px-8 lg:px-16">
        <Header />
        <main className="py-8">
          <div className="max-w-2xl mx-auto">
            <Card className="bg-gradient-to-r from-primary to-secondary text-primary-foreground border-0">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-bold mb-2">Connect Your Wallet to Access Creator Dashboard</h3>
                <p className="mb-4 opacity-90">
                  Connect your wallet to view your earnings, streaming analytics, and manage your settings
                </p>
                <Button variant="default" size="lg">
                  Connect Wallet
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background px-4 md:px-8 lg:px-16">
      <Header />
      <main className="py-8">
        <h1 className="text-3xl font-bold mb-2">Creator Dashboard</h1>
        <p className="text-muted-foreground mb-8">Connected as {address?.slice(0, 6)}...{address?.slice(-4)}</p>

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