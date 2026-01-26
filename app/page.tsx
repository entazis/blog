import Link from "next/link";

import { getAllContent } from "@/lib/content";
import { formatDate } from "@/lib/dates";
import { siteConfig } from "@/lib/site";

export default async function HomePage() {
  const all = await getAllContent();
  const [latest, ...rest] = all;
  const recent = rest.slice(0, 3);

  return (
    <div className="space-y-16">
      <section className="space-y-6">
        <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
          Hi, I&apos;m <span className="gradient-text">entazis</span>
        </h1>
        <p className="max-w-2xl text-pretty text-lg text-muted-foreground">
          {siteConfig.description}
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href="/posts"
            className="focus-ring inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
          >
            Read the blog
            <span aria-hidden="true">→</span>
          </Link>
          <Link
            href="/tags"
            className="focus-ring inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition hover:border-primary/60"
          >
            Browse by topic
          </Link>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
            Latest post
          </p>
          <Link
            href="/posts"
            className="text-sm font-semibold text-link hover:text-link-hover"
          >
            View all →
          </Link>
        </div>
        {latest ? (
          <article className="post-card">
            {latest.coverImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={latest.coverImage}
                alt={`${latest.title} cover`}
                className="mb-6 aspect-[16/9] w-full rounded-lg object-cover"
              />
            ) : null}
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className="tag">{latest.type}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={latest.publishedAt}>
                {formatDate(latest.publishedAt)}
              </time>
            </div>
            <h2 className="mt-3 text-pretty text-2xl font-semibold tracking-tight">
              <Link href={latest.url} className="hover:text-link-hover">
                {latest.title}
              </Link>
            </h2>
            <p className="mt-2 text-base text-muted-foreground">{latest.excerpt}</p>
            {latest.tags.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {latest.tags.slice(0, 5).map((t) => (
                  <Link key={t} href={`/tags/${encodeURIComponent(t)}`} className="tag">
                    {t}
                  </Link>
                ))}
              </div>
            ) : null}
          </article>
        ) : null}
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
            Recent posts
          </p>
          <Link
            href="/posts"
            className="text-sm font-semibold text-link hover:text-link-hover"
          >
            View all →
          </Link>
        </div>
        <ul className="grid gap-6 md:grid-cols-3">
          {recent.map((item) => (
            <li key={`${item.type}:${item.slug}`} className="post-card">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="tag">{item.type}</span>
                <span aria-hidden="true">·</span>
                <time dateTime={item.publishedAt}>{formatDate(item.publishedAt)}</time>
              </div>
              <h3 className="mt-3 text-pretty text-lg font-semibold leading-snug tracking-tight">
                <Link href={item.url} className="hover:text-link-hover">
                  {item.title}
                </Link>
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.excerpt}</p>
              {item.tags.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.slice(0, 3).map((t) => (
                    <Link key={t} href={`/tags/${encodeURIComponent(t)}`} className="tag">
                      {t}
                    </Link>
                  ))}
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-border bg-card px-6 py-10 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">Stay updated</h2>
        <p className="mt-2 text-muted-foreground">
          Subscribe to get notified about new posts. No spam, unsubscribe anytime.
        </p>
        <form className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <input
            type="email"
            placeholder="you@email.com"
            className="focus-ring w-full max-w-sm rounded-lg border border-border bg-background px-4 py-2 text-sm text-foreground"
          />
          <button
            type="button"
            className="focus-ring inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            Subscribe
          </button>
        </form>
      </section>
    </div>
  );
}

