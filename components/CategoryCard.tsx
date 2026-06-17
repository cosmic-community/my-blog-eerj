import Link from 'next/link'
import type { Category } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface CategoryCardProps {
  category: Category
  className?: string
}

export default function CategoryCard({ category, className }: CategoryCardProps) {
  if (!category) return null

  const name = getMetafieldValue(category.metadata?.name) || category.title
  const description = getMetafieldValue(category.metadata?.description)

  return (
    <Link
      href={`/categories/${category.slug}`}
      className={`group flex flex-col rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-brand-300 hover:shadow-lg ${className || ''}`}
    >
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-2xl">
        🏷️
      </div>
      <h3 className="text-lg font-bold text-slate-900 transition-colors group-hover:text-brand-700">
        {name}
      </h3>
      {description && (
        <p className="mt-2 line-clamp-2 text-sm text-slate-600">{description}</p>
      )}
      <span className="mt-4 text-sm font-medium text-brand-600">
        View posts →
      </span>
    </Link>
  )
}