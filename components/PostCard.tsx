import Link from 'next/link'
import type { Post } from '@/types'
import { getMetafieldValue, getTags } from '@/lib/cosmic'
import CategoryBadge from '@/components/CategoryBadge'

interface PostCardProps {
  post: Post
  className?: string
}

export default function PostCard({ post, className }: PostCardProps) {
  if (!post) return null

  const title = getMetafieldValue(post.metadata?.title) || post.title
  const featuredImage = post.metadata?.featured_image
  const category = post.metadata?.category
  const author = post.metadata?.author
  const tags = getTags(post.metadata?.tags)

  // Build a short excerpt from content if present
  const rawContent = getMetafieldValue(post.metadata?.content)
  const excerpt = rawContent
    ? rawContent.replace(/<[^>]+>/g, '').slice(0, 140).trim()
    : ''

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${className || ''}`}
    >
      <Link href={`/posts/${post.slug}`} className="block overflow-hidden">
        {featuredImage ? (
          <img
            src={`${featuredImage.imgix_url}?w=800&h=480&fit=crop&auto=format,compress`}
            alt={title}
            width={400}
            height={240}
            className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-48 w-full items-center justify-center bg-gradient-to-br from-brand-100 to-brand-200 text-4xl">
            📝
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        {category && (
          <div className="mb-3">
            <CategoryBadge category={category} />
          </div>
        )}

        <Link href={`/posts/${post.slug}`}>
          <h3 className="line-clamp-2 text-lg font-bold text-slate-900 transition-colors group-hover:text-brand-700">
            {title}
          </h3>
        </Link>

        {excerpt && (
          <p className="mt-2 line-clamp-3 text-sm text-slate-600">{excerpt}…</p>
        )}

        <div className="mt-auto flex items-center justify-between pt-4">
          {author ? (
            <div className="flex items-center gap-2">
              {author.metadata?.avatar ? (
                <img
                  src={`${author.metadata.avatar.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
                  alt={getMetafieldValue(author.metadata?.name) || author.title}
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-xs">
                  👤
                </div>
              )}
              <span className="text-xs font-medium text-slate-700">
                {getMetafieldValue(author.metadata?.name) || author.title}
              </span>
            </div>
          ) : (
            <span />
          )}

          {tags.length > 0 && (
            <span className="text-xs text-slate-400">
              {tags.length} {tags.length === 1 ? 'tag' : 'tags'}
            </span>
          )}
        </div>
      </div>
    </article>
  )
}