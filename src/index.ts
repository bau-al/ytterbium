import { Hono } from 'hono'
import { SearchArticleRaw, ArticleByIdRaw, Index } from './routes/router';
export const app = new Hono()
    .route('/raw/query', SearchArticleRaw)
    .route('/raw/article', ArticleByIdRaw)
    .route('/', Index)

export default app;

