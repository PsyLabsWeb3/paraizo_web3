import { Header } from '@/components/header'
import { LiveShowGrid } from '@/components/live-show-grid'
import { CategoryFilter } from '@/components/category-filter'

export default function BrowsePage() {
  return (
    <div className="min-h-screen bg-background px-4 md:px-8 lg:px-16">
      <Header />
      <main className="py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Browse Shows</h1>
          <CategoryFilter />
        </div>
        <LiveShowGrid />
      </main>
    </div>
  )
}