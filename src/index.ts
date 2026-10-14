import { Hono } from 'hono'
import { SearchArticle, ArticleById, Index } from './routes/router';
export const app = new Hono()
    .route('/query', SearchArticle)
    .route('/article', ArticleById)
    .route('/', Index)

export default app;

