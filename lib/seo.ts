import type { Metadata } from "next";

import type { ContentItem } from "@/lib/content";
import { addLocalePrefix, type Locale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

export function absoluteUrl(pathname: string): string {
  return new URL(pathname, siteConfig.siteUrl).toString();
}

export function canonicalFor(item: Pick<ContentItem, "canonicalUrl" | "url">): string {
  return item.canonicalUrl ?? absoluteUrl(item.url);
}

type TranslationAvailability = Partial<Record<Locale, boolean>>;

export function metadataForContent(
  item: ContentItem,
  opts?: { locale?: Locale; translations?: TranslationAvailability }
): Metadata {
  const canonical = canonicalFor(item);
  const ogImage = item.coverImage ? absoluteUrl(item.coverImage) : undefined;

  const languages: Record<string, string> = {};
  if (opts?.translations) {
    for (const [loc, exists] of Object.entries(opts.translations) as Array<[Locale, boolean]>) {
      if (!exists) continue;
      const pathname = addLocalePrefix(loc, `/${item.type}/${item.slug}`);
      languages[loc] = absoluteUrl(pathname);
    }
  }

  return {
    title: item.title,
    description: item.excerpt,
    alternates: Object.keys(languages).length ? { canonical, languages } : { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      title: item.title,
      description: item.excerpt,
      publishedTime: item.publishedAt,
      modifiedTime: item.updatedAt ?? item.publishedAt,
      authors: [siteConfig.author.name],
      tags: item.tags,
      images: ogImage ? [{ url: ogImage }] : undefined
    },
  };
}

export function articleJsonLd(item: ContentItem) {
  const canonical = canonicalFor(item);
  const image = item.coverImage ? absoluteUrl(item.coverImage) : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: item.title,
    description: item.excerpt,
    datePublished: item.publishedAt,
    dateModified: item.updatedAt ?? item.publishedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonical
    },
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.author.url
    },
    keywords: item.tags.join(", "),
    image: image ? [image] : undefined
  };
}

