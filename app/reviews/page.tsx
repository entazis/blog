import Link from "next/link";

import { formatDate } from "@/lib/dates";
import { getAllContentByType } from "@/lib/content";

export default async function ReviewsPage() {
  const reviews = await getAllContentByType("reviews");

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Reviews</h1>
        <p className="text-muted-foreground">
          Reviews of books, tools, and ideas.
        </p>
      </header>

      <ul className="space-y-4">
        {reviews.map((r) => (
          <li key={r.slug} className="post-card">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="tag">review</span>
              <span aria-hidden="true">·</span>
              <time dateTime={r.publishedAt}>{formatDate(r.publishedAt)}</time>
            </div>
            <h2 className="mt-2 text-lg font-semibold tracking-tight">
              <Link href={r.url} className="hover:text-link-hover">
                {r.title}
              </Link>
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">{r.excerpt}</p>
            {r.tags.length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {r.tags.map((t) => (
                  <Link key={t} href={`/tags/${encodeURIComponent(t)}`} className="tag">
                    {t}
                  </Link>
                ))}
              </div>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

