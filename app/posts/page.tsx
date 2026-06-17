import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'

export const metadata: Metadata = {
  title: 'All Posts — My Blog',
  description: 'Browse all blog posts.',
}

export default async function PostsPage() {
  const posts = await getAllPosts()

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">All Posts</h1>
        <p className="mt-3 text-lg text-slate-600">
          {posts.length} {posts.length === 1 ? 'story' : 'stories'} to explore
        </p>
      </header>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-lg text-slate-500">No posts found.</p>
      )}
    </div>
  )
}