import Link from "next/link";

import { formatDate } from "@/lib/dates";
import { getAllContentByType } from "@/lib/content";

export default async function NotesPage() {
  const notes = await getAllContentByType("notes");

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Notes</h1>
        <p className="text-muted-foreground">
          Short, practical notes—mostly “today I learned”.
        </p>
      </header>

      <ul className="space-y-4">
        {notes.map((n) => (
          <li key={n.slug} className="post-card">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="tag">note</span>
              <span aria-hidden="true">·</span>
              <time dateTime={n.publishedAt}>{formatDate(n.publishedAt)}</time>
            </div>
            <h2 className="mt-2 text-lg font-semibold tracking-tight">
              <Link href={n.url} className="hover:text-link-hover">
                {n.title}
              </Link>
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">{n.excerpt}</p>
            {n.tags.length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {n.tags.map((t) => (
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

