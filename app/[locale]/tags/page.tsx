import { TagsIndexPage } from "@/components/pages/TagsIndexPage";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n";

function normalizeLocale(value: string): Locale {
  return isLocale(value) ? value : defaultLocale;
}

export default async function TagsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);
  return <TagsIndexPage locale={locale} />;
}

