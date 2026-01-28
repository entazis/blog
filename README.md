# Entázis Blog

A fast, SEO-friendly **static** blog built with **Next.js (App Router)** and **MDX-in-Git**.

This project is configured for **static export** (`output: "export"`), so production builds generate an `out/` folder that can be hosted on any static file host (no Node server required).

## Features

- **Content types**: posts, notes, reviews (MDX in `content/<locale>/…`)
- **i18n**: locale-prefixed routes (`/en`, `/hu`) with locale-specific content
- **Discovery**: tags and build-time search index
- **SEO**: canonical URLs, OpenGraph metadata, JSON-LD `Article`, `sitemap.xml`, `robots.txt`, RSS
- **Reading UX**: typography, dark mode, TOC, reading time, syntax highlighting
- **Optional client-side metrics**: Web Vitals + basic interaction tracking (configurable via env)

## Requirements

- Node.js + npm

## Local development

Install dependencies:

```bash
npm install
```

Run dev server:

```bash
npm run dev
```

## Project structure

- **App Router**: `app/`
- **Root redirect**: `/` client-redirects to `/en` or `/hu` (cookie + browser language)
- **Locale routes**: `app/[locale]/…` (supported locales are in `lib/i18n.ts`)
- **Content**: `content/<locale>/{posts,notes,reviews}/*.mdx`
- **Build-time generators** (run automatically before `next build`): `scripts/`

## Writing content

Add MDX files under:

- `content/en/posts/*.mdx` → `/en/posts/[slug]`
- `content/en/notes/*.mdx` → `/en/notes/[slug]`
- `content/en/reviews/*.mdx` → `/en/reviews/[slug]`
- `content/hu/...` → same paths under `/hu`

Frontmatter fields:

- `slug` (**required**): `my-post`
- `title` (**required**)
- `excerpt` (**required**)
- `publishedAt` (**required** ISO date string)
- `tags` (optional array): `["nextjs", "mdx"]` (defaults to `[]`)
- `updatedAt` (optional ISO date string)
- `canonicalUrl` (optional URL)
- `coverImage` (optional): path under `public/`, e.g. `/images/covers/foo.png`
- `locale` (optional): if present, it must match the folder locale (e.g. `en`)

## Build (static export)

`npm run build` runs a `prebuild` step that generates SEO + search artifacts into `public/`, then runs `next build` to export the site to `out/`.

Generated files:

- `public/en/search-index.json`, `public/hu/search-index.json`
- `public/sitemap.xml`
- `public/robots.txt`
- `public/en/rss.xml`, `public/hu/rss.xml`

Then exports the site to `out/`:

```bash
npm run build
```

## Metrics tracking (optional)

Client-side metrics collection is enabled by default and is configured via `NEXT_PUBLIC_…` env vars.

To configure locally, copy `.env.example` to `.env.local` and adjust values.

To disable metrics entirely:

```bash
NEXT_PUBLIC_METRICS_ENABLED=false
```

## Deployment

Serve the contents of `out/` as static files (any static host works: nginx, Caddy, S3/CloudFront, Cloudflare Pages, GitHub Pages, etc.).

Static export notes:

- `next/image` optimization is disabled (`images.unoptimized = true`) to support pure static hosting.
- SEO artifacts and feeds use the base URL from `lib/site.ts` (`siteConfig.siteUrl`). Update it if you fork/rename the site.

## Useful scripts

- `npm run lint`
- `npm run typecheck`
- `npm run format`

## License

MIT (see `LICENSE`).
