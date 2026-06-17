// app/categories/[slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  getCategoryBySlug,
  getPostsByCategory,
  getMetafieldValue,
} from '@/lib/cosmic'
import PostCard from '@/components/PostCard'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  if (!category) {
    return { title: 'Category Not Found — My Blog' }
  }
  const name = getMetafieldValue(category.metadata?.name) || category.title
  return {
    title: `${name} — My Blog`,
    description: getMetafieldValue(category.metadata?.description) || `Posts in ${name}`,
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const name = getMetafieldValue(category.metadata?.name) || category.title
  const description = getMetafieldValue(category.metadata?.description)
  const posts = await getPostsByCategory(category.id)

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <Link
        href="/categories"
        className="mb-8 inline-flex items-center text-sm font-medium text-brand-600 hover:text-brand-700"
      >
        ← Back to categories
      </Link>

      <header className="mb-12">
        <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-2xl">
          🏷️
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">{name}</h1>
        {description && <p className="mt-3 max-w-2xl text-lg text-slate-600">{description}</p>}
      </header>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-lg text-slate-500">No posts in this category yet.</p>
      )}
    </div>
  )
}