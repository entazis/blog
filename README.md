# Entazis Blog

A fast, SEO-friendly **static** blog built with **Next.js (App Router)** and **MDX-in-Git**. It exports to an `out/` folder so you can host it directly behind **nginx** on your VPS (no Node server required).

## Features

- **Content types**: posts, notes, reviews (MDX in `content/`)
- **Discovery**: tags (`/tags`) and build-time search (`/search`)
- **SEO**: canonical URLs, OpenGraph/Twitter metadata, JSON-LD `Article`, `sitemap.xml`, `robots.txt`, `rss.xml`
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

## Build (static export)

This repo is configured for static export (`output: 'export'`). Build generates:

- `public/search-index.json`
- `public/sitemap.xml`
- `public/robots.txt`
- `public/rss.xml`

Then exports the site to `out/`.

```bash
npm run build
```

## Deploy to VPS (nginx)

1. Build locally or in CI:

```bash
npm run build
```

1. Copy the `out/` folder contents to your VPS web root, e.g.:

- `/var/www/blog.entazis.dev/`

1. Configure nginx. A sample server block is in [`nginx/blog.entazis.dev.conf`](nginx/blog.entazis.dev.conf).

1. Reload nginx:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

## Quick rsync deploy (optional)

There’s a helper script you can customize: [`scripts/deploy-rsync.sh`](scripts/deploy-rsync.sh).
