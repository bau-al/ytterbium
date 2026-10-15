import { SearchQuery, Article } from "./article.api";

export async function SearchQueryFunction(query: string): Promise<SearchQuery> {
    const request = await fetch(
        `https://en.wikipedia.org/w/rest.php/v1/search/title?q=${query}&limit=10`
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
            redirect_url: `https://en.wikipedia.org/api/rest_v1/page/summary/${page.key}?redirect=true`
        })),
    };
}

export async function SpecificArticleSearchSummarized(articleKey: string): Promise<Article> {
    const request = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${articleKey}?redirect=true`
    );
    const response = await request.json() as Article;
    return {
        id: response.id,
        key: response.key,
        title: response.title,
        thumbnail: response.thumbnail,
        extract: response.extract
    };
}