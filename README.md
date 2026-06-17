# My Blog

![App Preview](https://imgix.cosmicjs.com/5ffc5010-6a13-11f1-8dfe-457508ece1b8-autopilot-photo-1493976040374-85c8e12f0c0e-1781676687238.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A beautiful, modern, and fully responsive blog and creative portfolio built with Next.js 16 and powered by [Cosmic](https://www.cosmicjs.com). Browse posts, explore authors, and filter by categories with a clean, content-first reading experience.

## Features

- 📝 **Dynamic Blog Posts** — Full post pages with featured images, rich content, tags, author, and category
- 👤 **Author Profiles** — Dedicated author pages with bio, avatar, and all of their posts
- 🏷️ **Category Browsing** — Explore posts grouped and filtered by category
- 🎨 **Modern Responsive Design** — Beautiful layouts that look great on mobile, tablet, and desktop
- ⚡ **Server-Side Rendering** — Fast page loads using Next.js App Router and Server Components
- 🖼️ **Optimized Images** — Imgix-powered responsive image optimization
- 🔍 **SEO Friendly** — Per-page metadata generation
- ♿ **Accessible** — Semantic HTML and keyboard-friendly navigation

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6a323a56cb5ebdc34732f54c&clone_repository=6a323b3fcb5ebdc34732f571)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for a blog with posts (including featured images, content, and tags), authors, and categories.
>
> User instructions: A blog with posts, authors, and categories"

### Code Generation Prompt

> Build a Next.js application for a creative portfolio called "My Blog". The content is managed in Cosmic CMS with the following object types: authors, categories, posts. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> User instructions: A blog with posts, authors, and categories

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Cosmic](https://www.cosmicjs.com) ([SDK Docs](https://www.cosmicjs.com/docs))

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) or Node.js 18+
- A Cosmic account with a bucket containing `authors`, `categories`, and `posts` object types

### Installation

1. Clone the repository
2. Install dependencies:

```bash
bun install
```

3. Set up your environment variables (these are provided automatically when you clone via Cosmic):

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:

```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Cosmic SDK Examples

```typescript
import { cosmic } from '@/lib/cosmic'

// Fetch all posts with related author and category data
const { objects: posts } = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'slug', 'title', 'metadata'])
  .depth(1)

// Fetch a single post by slug
const { object: post } = await cosmic.objects
  .findOne({ type: 'posts', slug: 'my-post-slug' })
  .depth(1)

// Fetch posts in a specific category by id
const { objects: categoryPosts } = await cosmic.objects
  .find({ type: 'posts', 'metadata.category': categoryId })
  .depth(1)
```

## Cosmic CMS Integration

This app integrates with three object types from your Cosmic bucket:

- **Posts** — title, content, featured_image, tags, author (object), category (object)
- **Authors** — name, bio, avatar
- **Categories** — name, description

All data is fetched server-side using the [Cosmic SDK](https://www.cosmicjs.com/docs) with the `depth` parameter to resolve connected objects (authors and categories) in a single query.

## Deployment Options

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository into [Vercel](https://vercel.com)
3. Add the environment variables (`COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, `COSMIC_WRITE_KEY`)
4. Deploy

### Netlify

1. Push your code to GitHub
2. Import the repository into [Netlify](https://netlify.com)
3. Set the build command to `bun run build` and add environment variables
4. Deploy

<!-- README_END -->