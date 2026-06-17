import Link from 'next/link'
import type { Category } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface CategoryBadgeProps {
  category: Category
  className?: string
}

export default function CategoryBadge({ category, className }: CategoryBadgeProps) {
  if (!category) return null
  const name = getMetafieldValue(category.metadata?.name) || category.title

  return (
    <Link
      href={`/categories/${category.slug}`}
      className={`inline-flex items-center rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700 transition-colors hover:bg-brand-200 ${className || ''}`}
    >
      {name}
    </Link>
  )
}