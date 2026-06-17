import Link from 'next/link'
import { getAllPosts, getAllCategories, getMetafieldValue } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import CategoryCard from '@/components/CategoryCard'
import type { Post } from '@/types'

export default async function HomePage() {
  const [posts, categories] = await Promise.all([
    getAllPosts(),
    getAllCategories(),
  ])

  const featuredPost: Post | undefined = posts[0]
  const recentPosts = posts.slice(1, 7)

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-brand-50 via-white to-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-28">
          <span className="inline-flex items-center rounded-full bg-brand-100 px-4 py-1.5 text-sm font-semibold text-brand-700">
            ✨ A Creative Portfolio
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Stories, ideas, and creative work
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
            Explore thoughtful writing on design, technology, and everything in
            between — crafted by passionate authors.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/posts"
              className="rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
            >
              Read the blog
            </Link>
            <Link
              href="/categories"
              className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              Browse categories
            </Link>
          </div>
        </div>
      </section>

      {/* Featured post */}
      {featuredPost && (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">Featured</h2>
          </div>
          <FeaturedPost post={featuredPost} />
        </section>
      )}

      {/* Recent posts */}
      {recentPosts.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">Latest posts</h2>
            <Link href="/posts" className="text-sm font-semibold text-brand-600 hover:text-brand-700">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

      {posts.length === 0 && (
        <section className="mx-auto max-w-6xl px-4 py-24 text-center sm:px-6 lg:px-8">
          <p className="text-lg text-slate-500">No posts yet. Check back soon!</p>
        </section>
      )}

      {/* Categories */}
      {categories.length > 0 && (
        <section className="border-t border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-2xl font-bold text-slate-900">Explore by category</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

function FeaturedPost({ post }: { post: Post }) {
  if (!post) return null

  const title = getMetafieldValue(post.metadata?.title) || post.title
  const featuredImage = post.metadata?.featured_image
  const author = post.metadata?.author
  const rawContent = getMetafieldValue(post.metadata?.content)
  const excerpt = rawContent
    ? rawContent.replace(/<[^>]+>/g, '').slice(0, 220).trim()
    : ''

  return (
    <Link
      href={`/posts/${post.slug}`}
      className="group grid grid-cols-1 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:shadow-xl lg:grid-cols-2"
    >
      {featuredImage ? (
        <img
          src={`${featuredImage.imgix_url}?w=1200&h=800&fit=crop&auto=format,compress`}
          alt={title}
          width={600}
          height={400}
          className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105 lg:h-full"
        />
      ) : (
        <div className="flex h-64 w-full items-center justify-center bg-gradient-to-br from-brand-100 to-brand-200 text-6xl lg:h-full">
          📝
        </div>
      )}
      <div className="flex flex-col justify-center p-8 lg:p-10">
        <h3 className="text-2xl font-extrabold text-slate-900 transition-colors group-hover:text-brand-700 lg:text-3xl">
          {title}
        </h3>
        {excerpt && <p className="mt-4 text-slate-600">{excerpt}…</p>}
        {author && (
          <div className="mt-6 flex items-center gap-3">
            {author.metadata?.avatar ? (
              <img
                src={`${author.metadata.avatar.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                alt={getMetafieldValue(author.metadata?.name) || author.title}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200">👤</div>
            )}
            <span className="text-sm font-medium text-slate-700">
              {getMetafieldValue(author.metadata?.name) || author.title}
            </span>
          </div>
        )}
        <span className="mt-6 text-sm font-semibold text-brand-600">Read article →</span>
      </div>
    </Link>
  )
}