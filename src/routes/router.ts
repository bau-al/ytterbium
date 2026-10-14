import { Hono } from 'hono';
import { SearchQueryFunction, SpecificArticleSearch } from '../api/query.api';
import { serveStatic } from '@hono/bun';

export const Index = new Hono()
    .get('/', serveStatic({path: "src/frontend/main/index.html"}))

export const SearchArticleRaw = new Hono()
    .get('/:query', async (c) => {
        const query = c.req.param('query');
        const searchResults = await SearchQueryFunction(query);
        return c.json(searchResults)
    })

export const ArticleByIdRaw = new Hono()
    .get('/:key', async (c) => {
        const key = c.req.param('key');
        const result = await SpecificArticleSearch(key);
        return c.json(result)
    })

export const NotFound = new Hono()
    .notFound((c) => {
        return c.text('Custom 404 Message', 404)
    })