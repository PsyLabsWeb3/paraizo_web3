import { Header } from "@/components/header"
import { ProfileSettings } from "@/components/profile-settings"
import { WalletSettings } from "@/components/wallet-settings"
import { NotificationSettings } from "@/components/notification-settings"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header isAuthenticated={true} walletBalance="2.3 ETH" userRole="creator" />

      <main className="flex-1 container px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground">Manage your account and preferences</p>
          </div>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="wallet">Wallet</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="mt-6">
              <ProfileSettings />
            </TabsContent>

            <TabsContent value="wallet" className="mt-6">
              <WalletSettings />
            </TabsContent>

            <TabsContent value="notifications" className="mt-6">
              <NotificationSettings />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
