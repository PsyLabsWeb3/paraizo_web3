import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="text-center space-y-6 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance">Live streaming meets Web3</h1>
          <p className="text-lg md:text-xl text-muted-foreground text-balance">
            Watch live shows, support your favorite creators with crypto tips, and be part of the decentralized
            streaming revolution
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/login">Start Watching</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/login">Become a Creator</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
