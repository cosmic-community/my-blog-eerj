import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold text-slate-900">
            <span className="text-xl">📝</span>
            <span>My Blog</span>
          </Link>
          <nav className="flex gap-6 text-sm font-medium text-slate-600">
            <Link href="/posts" className="hover:text-slate-900">Posts</Link>
            <Link href="/categories" className="hover:text-slate-900">Categories</Link>
            <Link href="/authors" className="hover:text-slate-900">Authors</Link>
          </nav>
        </div>
        <p className="mt-8 text-center text-sm text-slate-500">
          © {year} My Blog. A creative portfolio powered by Cosmic.
        </p>
      </div>
    </footer>
  )
}