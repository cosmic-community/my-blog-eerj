// app/posts/[slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostBySlug, getMetafieldValue, getTags } from '@/lib/cosmic'
import CategoryBadge from '@/components/CategoryBadge'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) {
    return { title: 'Post Not Found — My Blog' }
  }
  const title = getMetafieldValue(post.metadata?.title) || post.title
  const rawContent = getMetafieldValue(post.metadata?.content)
  const description = rawContent
    ? rawContent.replace(/<[^>]+>/g, '').slice(0, 160).trim()
    : 'Read this post on My Blog.'
  return {
    title: `${title} — My Blog`,
    description,
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const title = getMetafieldValue(post.metadata?.title) || post.title
  const content = getMetafieldValue(post.metadata?.content)
  const featuredImage = post.metadata?.featured_image
  const author = post.metadata?.author
  const category = post.metadata?.category
  const tags = getTags(post.metadata?.tags)

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href="/posts"
        className="mb-8 inline-flex items-center text-sm font-medium text-brand-600 hover:text-brand-700"
      >
        ← Back to all posts
      </Link>

      {category && (
        <div className="mb-4">
          <CategoryBadge category={category} />
        </div>
      )}

      <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h1>

      {author && (
        <Link
          href={`/authors/${author.slug}`}
          className="mt-6 flex items-center gap-3 transition-opacity hover:opacity-80"
        >
          {author.metadata?.avatar ? (
            <img
              src={`${author.metadata.avatar.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
              alt={getMetafieldValue(author.metadata?.name) || author.title}
              width={48}
              height={48}
              className="h-12 w-12 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200">👤</div>
          )}
          <div>
            <p className="text-sm font-semibold text-slate-900">
              {getMetafieldValue(author.metadata?.name) || author.title}
            </p>
            <p className="text-xs text-slate-500">Author</p>
          </div>
        </Link>
      )}

      {featuredImage && (
        <img
          src={`${featuredImage.imgix_url}?w=1600&h=900&fit=crop&auto=format,compress`}
          alt={title}
          width={800}
          height={450}
          className="mt-8 w-full rounded-2xl object-cover"
        />
      )}

      {content && (
        <div
          className="prose prose-slate mt-10 max-w-none prose-headings:font-bold prose-a:text-brand-600 prose-img:rounded-xl"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}

      {tags.length > 0 && (
        <div className="mt-12 border-t border-slate-200 pt-8">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={`${tag}-${index}`}
                className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}