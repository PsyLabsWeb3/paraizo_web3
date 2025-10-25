import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { FeaturedShows } from '@/components/featured-shows'
import { LiveShowGrid } from '@/components/live-show-grid'
import { CategoryFilter } from '@/components/category-filter'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background px-4 md:px-8 lg:px-16">
      <Header />
      <main className="py-8">
        <HeroSection />
        <div className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Featured Shows</h2>
            <CategoryFilter />
          </div>
          <FeaturedShows />
        </div>
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Live Now</h2>
          <LiveShowGrid />
        </div>
      </main>
    </div>
  )
}