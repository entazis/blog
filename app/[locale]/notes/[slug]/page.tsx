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
    const slugs = await getAllSlugsByType("notes", locale);
    for (const slug of slugs) all.push({ locale, slug });
  }
  return all;
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = normalizeLocale(rawLocale);
  const item = await getContentBySlug("notes", slug, locale);
  const hasEn = await hasContentBySlug("notes", slug, "en");
  const hasHu = await hasContentBySlug("notes", slug, "hu");
  return metadataForContent(item, { locale, translations: { en: hasEn, hu: hasHu } });
}

export default async function NoteDetailPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = normalizeLocale(rawLocale);
  return <ContentDetailPage locale={locale} type="notes" slug={slug} />;
}

