import { Hono } from 'hono'
import { SearchArticle, ArticleById, Index } from './routes/router';
import { CheckFolderIntegrity } from './cache/writer.cache';

CheckFolderIntegrity();

export const app = new Hono()
    .route('/query', SearchArticle)
    .route('/article', ArticleById)
    .route('/', Index)

app.onError((err, c) => {
    console.log(err);
    return c.json({ error: err.message }, 500)
})

export default app;

