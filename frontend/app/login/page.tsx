import { Header } from '@/components/header'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background px-4 md:px-8 lg:px-16">
      <Header />
      <main className="py-8 flex items-center justify-center">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Welcome to Paraizo</h1>
            <p className="mt-2 text-muted-foreground">
              Connect your wallet to get started
            </p>
          </div>
          <div className="mt-8">
            <div className="bg-card p-6 rounded-lg border">
              <div className="flex flex-col items-center gap-4">
                <p className="text-center text-muted-foreground">
                  Connect your wallet to access your account
                </p>
                <div className="w-full">
                  <div className="bg-muted rounded-md p-4 text-center">
                    <p className="text-sm text-muted-foreground mb-4">Wallet connection will appear here when integrated</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}