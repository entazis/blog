import Link from "next/link";

import { getAllTags, getTagCounts } from "@/lib/content";

export default async function TagsPage() {
  const [tags, counts] = await Promise.all([getAllTags(), getTagCounts()]);

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Tags</h1>
        <p className="text-muted-foreground">
          Browse content by topic.
        </p>
      </header>

      <ul className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <li key={t}>
            <Link
              href={`/tags/${encodeURIComponent(t)}`}
              className="focus-ring inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-sm font-medium text-foreground transition hover:border-primary/60"
            >
              <span>#{t}</span>
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                {counts.get(t) ?? 0}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

