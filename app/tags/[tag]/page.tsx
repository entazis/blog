import Link from "next/link";

import { formatDate } from "@/lib/dates";
import { getAllTags, getContentByTag } from "@/lib/content";

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((tag) => ({ tag: encodeURIComponent(tag) }));
}

export default async function TagPage({
  params
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag: raw } = await params;
  const tag = decodeURIComponent(raw);
  const items = await getContentByTag(tag);

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">#{tag}</h1>
        <p className="text-muted-foreground">
          {items.length} {items.length === 1 ? "item" : "items"}
        </p>
      </header>

      <ul className="space-y-4">
        {items.map((i) => (
          <li key={`${i.type}:${i.slug}`} className="post-card">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="tag">{i.type}</span>
              <span aria-hidden="true"> · </span>
              <time dateTime={i.publishedAt}>{formatDate(i.publishedAt)}</time>
            </div>
            <h2 className="mt-2 text-lg font-semibold tracking-tight">
              <Link href={i.url} className="hover:text-link-hover">
                {i.title}
              </Link>
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">{i.excerpt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

