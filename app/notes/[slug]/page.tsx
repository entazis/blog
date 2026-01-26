import { ContentArticle } from "@/components/content/ContentArticle";
import { TableOfContents } from "@/components/content/TableOfContents";
import { getAllSlugsByType, getContentBySlug } from "@/lib/content";
import { metadataForContent } from "@/lib/seo";

export async function generateStaticParams() {
  const slugs = await getAllSlugsByType("notes");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getContentBySlug("notes", slug);
  return metadataForContent(item);
}

export default async function NotePage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getContentBySlug("notes", slug);

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_260px]">
      <ContentArticle item={item} />
      <TableOfContents toc={item.toc} />
    </div>
  );
}

