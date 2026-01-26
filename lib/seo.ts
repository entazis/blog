import type { Metadata } from "next";

import type { ContentItem } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export function absoluteUrl(pathname: string): string {
  return new URL(pathname, siteConfig.siteUrl).toString();
}

export function canonicalFor(item: Pick<ContentItem, "canonicalUrl" | "url">): string {
  return item.canonicalUrl ?? absoluteUrl(item.url);
}

export function metadataForContent(item: ContentItem): Metadata {
  const canonical = canonicalFor(item);
  const ogImage = item.coverImage ? absoluteUrl(item.coverImage) : undefined;

  return {
    title: item.title,
    description: item.excerpt,
    alternates: { canonical },
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

