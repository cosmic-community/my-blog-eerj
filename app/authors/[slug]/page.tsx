// app/authors/[slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  getAuthorBySlug,
  getPostsByAuthor,
  getMetafieldValue,
} from '@/lib/cosmic'
import PostCard from '@/components/PostCard'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)
  if (!author) {
    return { title: 'Author Not Found — My Blog' }
  }
  const name = getMetafieldValue(author.metadata?.name) || author.title
  return {
    title: `${name} — My Blog`,
    description: getMetafieldValue(author.metadata?.bio) || `Posts by ${name}`,
  }
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)

  if (!author) {
    notFound()
  }

  const name = getMetafieldValue(author.metadata?.name) || author.title
  const bio = getMetafieldValue(author.metadata?.bio)
  const avatar = author.metadata?.avatar
  const posts = await getPostsByAuthor(author.id)

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <Link
        href="/authors"
        className="mb-8 inline-flex items-center text-sm font-medium text-brand-600 hover:text-brand-700"
      >
        ← Back to authors
      </Link>

      <header className="mb-12 flex flex-col items-center text-center">
        {avatar ? (
          <img
            src={`${avatar.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
            alt={name}
            width={100}
            height={100}
            className="h-24 w-24 rounded-full object-cover ring-4 ring-brand-100"
          />
        ) : (
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-brand-100 text-4xl ring-4 ring-brand-50">
            👤
          </div>
        )}
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900">{name}</h1>
        {bio && <p className="mt-4 max-w-2xl text-lg text-slate-600">{bio}</p>}
      </header>

      <h2 className="mb-8 text-2xl font-bold text-slate-900">
        Posts by {name}
      </h2>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-lg text-slate-500">No posts by this author yet.</p>
      )}
    </div>
  )
}