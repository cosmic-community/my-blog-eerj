import type { Metadata } from 'next'
import { getAllCategories } from '@/lib/cosmic'
import CategoryCard from '@/components/CategoryCard'

export const metadata: Metadata = {
  title: 'Categories — My Blog',
  description: 'Browse posts by category.',
}

export default async function CategoriesPage() {
  const categories = await getAllCategories()

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Categories</h1>
        <p className="mt-3 text-lg text-slate-600">Discover posts grouped by topic</p>
      </header>

      {categories.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      ) : (
        <p className="text-lg text-slate-500">No categories found.</p>
      )}
    </div>
  )
}