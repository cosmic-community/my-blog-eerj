// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Image file metafield shape
export interface CosmicImage {
  url: string;
  imgix_url: string;
}

// Author object
export interface Author extends CosmicObject {
  type: 'authors';
  metadata: {
    name?: string;
    bio?: string;
    avatar?: CosmicImage;
  };
}

// Category object
export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name?: string;
    description?: string;
  };
}

// Post object
export interface Post extends CosmicObject {
  type: 'posts';
  metadata: {
    title?: string;
    content?: string;
    featured_image?: CosmicImage;
    tags?: string | string[];
    author?: Author;
    category?: Category;
  };
}

// Cosmic API response shapes
export interface CosmicListResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

export interface CosmicSingleResponse<T> {
  object: T;
}

// Type guards
export function isPost(obj: CosmicObject): obj is Post {
  return obj.type === 'posts';
}

export function isAuthor(obj: CosmicObject): obj is Author {
  return obj.type === 'authors';
}

export function isCategory(obj: CosmicObject): obj is Category {
  return obj.type === 'categories';
}