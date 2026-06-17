import type { Metadata } from 'next'
import { getAllAuthors } from '@/lib/cosmic'
import AuthorCard from '@/components/AuthorCard'

export const metadata: Metadata = {
  title: 'Authors — My Blog',
  description: 'Meet the writers behind My Blog.',
}

export default async function AuthorsPage() {
  const authors = await getAllAuthors()

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Authors</h1>
        <p className="mt-3 text-lg text-slate-600">Meet the creative minds behind the stories</p>
      </header>

      {authors.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {authors.map((author) => (
            <AuthorCard key={author.id} author={author} />
          ))}
        </div>
      ) : (
        <p className="text-lg text-slate-500">No authors found.</p>
      )}
    </div>
  )
}