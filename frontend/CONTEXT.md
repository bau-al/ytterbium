# Ytterbium Frontend — Context

Frontend for the [Ytterbium](../README.md) backend, a TypeScript/Hono service that
searches Wikipedia and returns article summaries.

## Tech

- HTML5 / CSS3 / vanilla JS
- [Alpine.js 3](https://alpinejs.dev/) loaded from CDN (no build step, no bundler)
- Backend API at `http://localhost:3000` (run with `bun run dev` from the repo root)

## Files

| File | Purpose |
|---|---|
| `index.html` | Search page — `app()` Alpine component |
| `index.css` | Search page styles (dark theme) |
| `article/article.html` | Article page — `article()` Alpine component |
| `article/article.css` | Article page styles (dark theme) |
| `jupiter.json` | Example `/query/jupiter` response |
| `JupiterArticle.json` | Example `/article/Jupiter` response |
| `INSTRUCTIONS.md` | Original project brief |

## API

The backend sets permissive CORS (`Access-Control-Allow-Origin: *`), so the
frontend can be opened as a plain file or from any static server.

### Search

```
GET http://localhost:3000/query/{query}
```

Returns `{ pages: Article[] }` (up to 10 results). Relevant fields:

```ts
interface Article {
  id: number;
  key: string;          // used to build the article link
  title: string;
  description?: string | null;
  thumbnail?: { url: string } | null; // url is protocol-relative ("//thumb...")
  // ...
}
```

### Article

```
GET http://localhost:3000/article/{key}
```

Returns a single summary. Relevant fields:

```ts
{
  title: string;
  thumbnail?: { source: string } | null; // absolute https URL
  extract?: string | null;
}
```

## Conventions

- Components are registered with `Alpine.data(...)` inside `document.addEventListener('alpine:init', ...)`.
  Markup uses `x-data="app()"` / `x-data="article()"`.
- Navigation is plain (real pages + links), not SPA routing:
  `index.html` → `article/article.html?key=<encoded key>`.
- `encodeURIComponent` is used for both the search term and the article key
  (keys can contain `'`, `(`, `)`, `,`, spaces).
- Search thumbnails are protocol-relative; the `thumb()` helper prepends `https:`.
- `[x-cloak]` hides uninitialized content to avoid flashes; the rule lives in both CSS files.
- Both stylesheets share a CSS-variable palette (dark theme, `color-scheme: dark`):
  `--bg`, `--surface`, `--border`, `--text`, `--muted`, `--accent`, `--error`.

## Flows

**Search**
1. User types a term and submits (button or Enter → `@submit.prevent`).
2. `app.search()` fetches `/query/<term>` and sets `results`.
3. Results render with `x-for`; each links to the article page.
4. Empty query, no-results, and API-unreachable states are handled.

**Article**
1. `article.init()` reads `key` from `new URLSearchParams(location.search)`.
2. Fetches `/article/<key>` and renders title, thumbnail (if any), and extract.
3. "← Back" link returns to `../index.html`.

## Running

1. From the repo root: `bun run dev` (starts the API on port 3000).
2. Open `frontend/index.html` in a browser.
