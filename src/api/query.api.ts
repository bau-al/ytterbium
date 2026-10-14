import { SearchQuery, Article } from "./article.api";

export async function SearchQueryFunction(query: string): Promise<SearchQuery> {
    const request = await fetch(
        `https://en.wikipedia.org/w/rest.php/v1/search/title?q=${query}&limit=5`
    );

    const response = await request.json() as { pages?: Article[] };
    if (!request.ok) { throw new Error(`Error fetching search results: ${response}`); }

    return {
        pages: (response.pages ?? []).map((page) => ({
            id: page.id,
            key: page.key,
            title: page.title,
            description: page.description ?? page.excerpt ?? "",
            thumbnail: page.thumbnail ?? null,
        })),
    };
}

export async function SpecificArticleSearch(articleId: string): Promise<Article> {
    const request = await fetch(
        `https://en.wikipedia.org/w/rest.php/v1/page/${articleId}?redirect=true`
    );
    const response = await request.json() as Article;
    return response;
}