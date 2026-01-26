# Entázis Blog

A fast, SEO-friendly blog built with **Next.js (App Router)** and **MDX-in-Git**. It runs as a Node.js server behind **nginx** and can still statically generate pages for SEO and performance.

## Features

- **Content types**: posts, notes, reviews (MDX in `content/`)
- **Discovery**: tags (`/tags`) and build-time search (`/search`)
- **SEO**: canonical URLs, OpenGraph metadata, JSON-LD `Article`, `sitemap.xml`, `robots.txt`, `rss.xml`
- **Reading UX**: typography, dark mode, TOC, reading time, syntax highlighting

## Requirements

- Node.js + npm (local build)

## Local development

Install deps:

```bash
npm install
```

Run dev server:

```bash
npm run dev
```

## Writing content

Add MDX files under:

- `content/posts/*.mdx` → `/posts/[slug]`
- `content/notes/*.mdx` → `/notes/[slug]`
- `content/reviews/*.mdx` → `/reviews/[slug]`

Frontmatter fields (recommended):

- `slug` (required): `my-post`
- `title` (required)
- `excerpt` (required)
- `tags` (optional array): `[nextjs, mdx]`
- `publishedAt` (required ISO date)
- `updatedAt` (optional ISO date)
- `canonicalUrl` (optional)
- `coverImage` (optional): path under `public/`, e.g. `/images/covers/foo.png`

## Production build

Build generates:

- `public/search-index.json`
- `public/sitemap.xml`
- `public/robots.txt`
- `public/rss.xml`

```bash
npm run build
```

Run the production server locally:

```bash
npm run start
```

## Email interest notifications

Set the following environment variables on the server (do not commit them):

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`
- `INTEREST_TO` (optional, defaults to `hello@entazis.dev`)

## Deploy to VPS (nginx)

1. Build on the server (or in CI):

```bash
npm run build
```

1. Run the app with a process manager (systemd, pm2, etc.):

```bash
npm run start
```

1. Configure nginx as a reverse proxy. A sample server block is in [`nginx/blog.entazis.dev.conf`](nginx/blog.entazis.dev.conf).

1. Reload nginx:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

## Quick rsync deploy (optional)

There’s a helper script you can customize: [`scripts/deploy-rsync.sh`](scripts/deploy-rsync.sh).
