'use client'

import { Header } from '@/components/header'
import { StreamKeyConfig } from '@/components/stream-key-config'
import { ProfileSettings } from '@/components/profile-settings'
import { useAccount } from 'wagmi'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useState, useEffect } from 'react'

export default function SettingsPage() {
  const { isConnected } = useAccount()
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return (
      <div className="min-h-screen bg-background px-4 md:px-8 lg:px-16">
        <Header />
        <main className="py-8">
          <div className="max-w-2xl mx-auto">
            <Card className="bg-gradient-to-r from-primary to-secondary text-primary-foreground border-0">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-bold mb-2">Loading Settings...</h3>
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
                <h3 className="text-xl font-bold mb-2">Connect Your Wallet</h3>
                <p className="mb-4 opacity-90">
                  Please connect your wallet to access your settings.
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
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground mb-8">Manage your stream configuration and API keys.</p>

          <div className="space-y-8">
            <ProfileSettings />
            <StreamKeyConfig />
          </div>
        </div>
      </main>
    </div>
  )
}