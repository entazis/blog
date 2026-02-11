import Link from "next/link";

import { mdxComponents } from "@/components/mdx/MDXComponents";
import { ArticleJsonLd } from "@/components/seo/ArticleJsonLd";
import { formatDate } from "@/lib/dates";
import type { ContentItem } from "@/lib/content";
import { addLocalePrefix, stripLocalePrefix } from "@/lib/i18n";
import { renderMdx } from "@/lib/mdx";

export async function ContentArticle({ item }: { item: ContentItem }) {
  const content = await renderMdx(item.source, mdxComponents);

  return (
    <article className="min-w-0">
      <ArticleJsonLd item={item} />
      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span className="tag">{item.type}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={item.publishedAt}>{formatDate(item.publishedAt)}</time>
          <span aria-hidden="true">·</span>
          <span>{item.readingTime.text}</span>
        </div>
        <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
          {item.title}
        </h1>
        <p className="max-w-2xl text-pretty text-lg text-muted-foreground">
          {item.excerpt}
        </p>
        {item.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.coverImage}
            alt={`${item.title} cover`}
            loading="lazy"
            decoding="async"
            className="mt-4 w-full rounded-2xl border border-border bg-card object-cover shadow-lg"
          />
        ) : null}
        {item.tags.length ? (
          <div className="flex flex-wrap gap-2 pt-1">
            {item.tags.map((t) => (
              <Link
                key={t}
                href={addLocalePrefix(stripLocalePrefix(item.url).locale, `/tags/${encodeURIComponent(t)}`)}
                className="tag"
              >
                {t}
              </Link>
            ))}
          </div>
        ) : null}
      </header>

      <div className="prose prose-slate mt-10 dark:prose-invert">{content}</div>
    </article>
  );
}

