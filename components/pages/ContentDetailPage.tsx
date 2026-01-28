import { ContentArticle } from "@/components/content/ContentArticle";
import { TableOfContents } from "@/components/content/TableOfContents";
import { getContentBySlug, type ContentType } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";

export async function ContentDetailPage({
  locale,
  type,
  slug
}: {
  locale: Locale;
  type: ContentType;
  slug: string;
}) {
  let item;
  try {
    item = await getContentBySlug(type, slug, locale);
  } catch {
    notFound();
  }
  if (item.draft) notFound();

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_260px]">
      <ContentArticle item={item} />
      <TableOfContents toc={item.toc} />
    </div>
  );
}

