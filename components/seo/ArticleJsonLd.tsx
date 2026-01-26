import type { ContentItem } from "@/lib/content";
import { articleJsonLd } from "@/lib/seo";

export function ArticleJsonLd({ item }: { item: ContentItem }) {
  const json = articleJsonLd(item);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

