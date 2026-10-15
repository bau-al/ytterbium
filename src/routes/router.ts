import { Hono } from 'hono';
import { SearchQueryFunction, SpecificArticleSearchSummarized } from '../api/query.api';
import { serveStatic } from '@hono/bun';

export const Index = new Hono()
    .get('/', async (c) => {
        return c.text('Index Page, go to url/query/example to search\nor url/article/example for direct results')
    })

export const SearchArticle = new Hono()
    .get('/:query', async (c) => {
        const query = c.req.param('query');
        const searchResults = await SearchQueryFunction(query);
        return c.json(searchResults)
    })

export const ArticleById = new Hono()
    .get('/:key', async (c) => {
        const key = c.req.param('key');
        const result = await SpecificArticleSearchSummarized(key);
        return c.json(result)
    })

export const NotFound = new Hono()
    .notFound((c) => {
        return c.text('Custom 404 Message', 404)
    })