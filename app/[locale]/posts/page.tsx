import { ContentListPage } from "@/components/pages/ContentListPage";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n";

function normalizeLocale(value: string): Locale {
  return isLocale(value) ? value : defaultLocale;
}

export default async function PostsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);
  return <ContentListPage locale={locale} type="posts" />;
}

