export interface SearchQuery {
    pages: Article[];
}

interface Thumbnail {
    mimetype: string,
    width: number,
    height: number,
    url: string,
}

export interface Article {
    id: number,
    key: string,
    title: string,
    description?: string | null,
    excerpt?: string | null,
    thumbnail?: Thumbnail | null,
    extract?: string | null,
    redirect_url?: string | null,
}