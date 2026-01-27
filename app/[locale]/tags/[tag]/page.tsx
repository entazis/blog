import { TagPage } from "@/components/pages/TagPage";
import { getAllTags } from "@/lib/content";
import { defaultLocale, isLocale, locales, type Locale } from "@/lib/i18n";

function normalizeLocale(value: string): Locale {
  return isLocale(value) ? value : defaultLocale;
}

export async function generateStaticParams() {
  const all: Array<{ locale: Locale; tag: string }> = [];
  for (const locale of locales) {
    const tags = await getAllTags(locale);
    for (const tag of tags) all.push({ locale, tag: encodeURIComponent(tag) });
  }
  return all;
}

export default async function TagDetailPage({
  params
}: {
  params: Promise<{ locale: string; tag: string }>;
}) {
  const { locale: rawLocale, tag: rawTag } = await params;
  const locale = normalizeLocale(rawLocale);
  const tag = decodeURIComponent(rawTag);
  return <TagPage locale={locale} tag={tag} />;
}

