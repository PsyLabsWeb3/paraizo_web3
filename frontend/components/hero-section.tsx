import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export function HeroSection() {
  return (
    <section className="text-center py-12">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">
        Web3 Streaming Platform
      </h1>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
        Watch live shows, support creators with crypto tips, and join the decentralized streaming revolution.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" className="rounded-full px-8">
          Start Streaming
        </Button>
        <Button size="lg" variant="outline" className="rounded-full px-8">
          Browse Shows
        </Button>
      </div>
    </section>
  )
}