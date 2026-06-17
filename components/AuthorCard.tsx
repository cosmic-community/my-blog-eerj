import Link from 'next/link'
import type { Author } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface AuthorCardProps {
  author: Author
  className?: string
}

export default function AuthorCard({ author, className }: AuthorCardProps) {
  if (!author) return null

  const name = getMetafieldValue(author.metadata?.name) || author.title
  const bio = getMetafieldValue(author.metadata?.bio)
  const avatar = author.metadata?.avatar

  return (
    <Link
      href={`/authors/${author.slug}`}
      className={`group flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${className || ''}`}
    >
      {avatar ? (
        <img
          src={`${avatar.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
          alt={name}
          width={80}
          height={80}
          className="h-20 w-20 rounded-full object-cover ring-4 ring-brand-100"
        />
      ) : (
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-100 text-3xl ring-4 ring-brand-50">
          👤
        </div>
      )}
      <h3 className="mt-4 text-lg font-bold text-slate-900 transition-colors group-hover:text-brand-700">
        {name}
      </h3>
      {bio && <p className="mt-2 line-clamp-3 text-sm text-slate-600">{bio}</p>}
    </Link>
  )
}