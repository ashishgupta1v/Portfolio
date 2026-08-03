export interface BlogPostCard {
    slug: string
    title: string
    excerpt: string
    publishedAt: string
    tags: string[]
    coverImage: string | null
    readingTimeMinutes: number
}

export interface BlogPost extends BlogPostCard {
    bodyHtml: string
}

export interface BlogIndexPageProps {
    posts: BlogPostCard[]
}

export interface BlogShowPageProps {
    post: BlogPost
}
