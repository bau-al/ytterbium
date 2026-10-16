import { SearchQuery, Article } from "./article.api";

export async function SearchQueryFunction(query: string, host: string): Promise<SearchQuery> {
    const request = await fetch(
        `https://en.wikipedia.org/w/rest.php/v1/search/title?q=${encodeURIComponent(query)}&limit=10`
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
            wikipedia_url: `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(page.key)}?redirect=true`,
            redirect_url: `http://${host}/article/${page.key}`,
        })),
    };
}

export async function SpecificArticleSearchSummarized(articleKey: string): Promise<Article> {
    const request = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(articleKey)}?redirect=true`
    );
    const response = await request.json() as Article;
    if (!request.ok) { throw new Error(`Error throwing response: ${response}`) }
    return {
        id: response.id,
        key: response.key,
        title: response.title,
        thumbnail: response.thumbnail,
        extract: response.extract
    };
}