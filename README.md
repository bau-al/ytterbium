# Ytterbium
Basic typescript application using Hono that searches for articles using wikipedia's api.

## Usage
To search for an article do `http://localhost:3000/query/{a}` where `{a}` represents the key word. To go to a specific article do `http://localhost:3000/article/{a}` where `{a}` represents the key word/title of the article you want to see.

## Installation
to install:
```sh
bun install
```
to run:
```sh
bun run dev
```
`open http://localhost:3000`
