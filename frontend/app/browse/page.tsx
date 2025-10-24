import { Header } from "@/components/header"
import { LiveShowGrid } from "@/components/live-show-grid"
import { CategoryFilter } from "@/components/category-filter"
import { FeaturedShows } from "@/components/featured-shows"

export default function BrowsePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header isAuthenticated={true} walletBalance="0.5 ETH" userRole="viewer" />

      <main className="flex-1 container px-4 py-8">
        <div className="space-y-8">
          {/* Featured Shows Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Featured Live Now</h2>
            <FeaturedShows />
          </section>

          {/* Category Filter */}
          <section>
            <CategoryFilter />
          </section>

          {/* All Live Shows */}
          <section>
            <h2 className="text-2xl font-bold mb-4">All Live Shows</h2>
            <LiveShowGrid />
          </section>
        </div>
      </main>
    </div>
  )
}
