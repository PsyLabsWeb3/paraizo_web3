import { Button } from '@/components/ui/button'

const categories = [
  { id: 'all', name: 'All' },
  { id: 'gaming', name: 'Gaming' },
  { id: 'tech', name: 'Tech' },
  { id: 'music', name: 'Music' },
  { id: 'finance', name: 'Finance' },
  { id: 'education', name: 'Education' },
]

export function CategoryFilter() {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant="outline"
          size="sm"
          className="rounded-full"
        >
          {category.name}
        </Button>
      ))}
    </div>
  )
}