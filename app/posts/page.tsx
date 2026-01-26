import Link from "next/link";

import { formatDate } from "@/lib/dates";
import { getAllContentByType } from "@/lib/content";

export default async function PostsPage() {
  const posts = await getAllContentByType("posts");

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Posts</h1>
        <p className="text-muted-foreground">
          Longer-form writing: deep dives, essays, and tutorials.
        </p>
      </header>

      <ul className="space-y-4">
        {posts.map((p) => (
          <li key={p.slug} className="post-card">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="tag">post</span>
              <span aria-hidden="true">·</span>
              <time dateTime={p.publishedAt}>{formatDate(p.publishedAt)}</time>
            </div>
            <h2 className="mt-2 text-lg font-semibold tracking-tight">
              <Link href={p.url} className="hover:text-link-hover">
                {p.title}
              </Link>
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
            {p.tags.length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tags.map((t) => (
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

