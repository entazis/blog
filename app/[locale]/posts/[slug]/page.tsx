import { ContentDetailPage } from "@/components/pages/ContentDetailPage";
import { getAllSlugsByType, getContentBySlug, hasContentBySlug } from "@/lib/content";
import { defaultLocale, isLocale, locales, type Locale } from "@/lib/i18n";
import { metadataForContent } from "@/lib/seo";

function normalizeLocale(value: string): Locale {
  return isLocale(value) ? value : defaultLocale;
}

export async function generateStaticParams() {
  const all: Array<{ locale: Locale; slug: string }> = [];
  for (const locale of locales) {
    const slugs = await getAllSlugsByType("posts", locale);
    for (const slug of slugs) all.push({ locale, slug });
  }
  // When there are no posts yet (or all are drafts), Next.js static export
  // still requires at least one param for this dynamic route.
  if (all.length === 0) return [{ locale: defaultLocale, slug: "__placeholder__" }];
  return all;
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = normalizeLocale(rawLocale);
  if (slug === "__placeholder__") return {};
  let item;
  try {
    item = await getContentBySlug("posts", slug, locale);
  } catch {
    return {};
  }
  const hasEn = await hasContentBySlug("posts", slug, "en");
  const hasHu = await hasContentBySlug("posts", slug, "hu");
  return metadataForContent(item, { locale, translations: { en: hasEn, hu: hasHu } });
}

export default async function PostDetailPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = normalizeLocale(rawLocale);
  return <ContentDetailPage locale={locale} type="posts" slug={slug} />;
}

