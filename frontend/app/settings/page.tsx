import { Header } from '@/components/header'
import { ProfileSettings } from '@/components/profile-settings'
import { WalletSettings } from '@/components/wallet-settings'
import { NotificationSettings } from '@/components/notification-settings'

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>
        
        <div className="grid grid-cols-1 gap-8">
          <ProfileSettings />
          <WalletSettings />
          <NotificationSettings />
        </div>
      </main>
    </div>
  )
}