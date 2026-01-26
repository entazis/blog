import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";
import readingTime from "reading-time";
import { cache } from "react";
import { z } from "zod";

import { extractToc, type TocItem } from "@/lib/mdx";

export type ContentType = "posts" | "notes" | "reviews";

export type ContentListItem = {
  type: ContentType;
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  publishedAt: string;
  updatedAt?: string;
  canonicalUrl?: string;
  coverImage?: string;
  url: string;
};

export type ContentItem = ContentListItem & {
  source: string;
  toc: TocItem[];
  readingTime: {
    text: string;
    minutes: number;
    words: number;
  };
};

const ContentFrontmatterSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  excerpt: z.string().min(1),
  tags: z.array(z.string().min(1)).optional().default([]),
  publishedAt: z.preprocess(
    (v) => (v instanceof Date ? v.toISOString() : v),
    z.string().min(1)
  ),
  updatedAt: z.preprocess(
    (v) => (v instanceof Date ? v.toISOString() : v),
    z.string().min(1).optional()
  ),
  canonicalUrl: z.string().url().optional(),
  coverImage: z.string().min(1).optional()
});

function assertIsoDate(label: string, value: string) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) {
    throw new Error(`Invalid date for ${label}: "${value}"`);
  }
}

const CONTENT_ROOT = path.join(process.cwd(), "content");

function typeToBasePath(type: ContentType): string {
  switch (type) {
    case "posts":
      return "/posts";
    case "notes":
      return "/notes";
    case "reviews":
      return "/reviews";
  }
}

async function listMdxFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  return entries
    .filter((e) => e.isFile() && e.name.toLowerCase().endsWith(".mdx"))
    .map((e) => path.join(dir, e.name));
}

async function loadOneFromFile(
  type: ContentType,
  filePath: string
): Promise<ContentItem> {
  const raw = await readFile(filePath, "utf8");
  const parsed = matter(raw);
  const fm = ContentFrontmatterSchema.parse(parsed.data);

  assertIsoDate(`${type}:${fm.slug}.publishedAt`, fm.publishedAt);
  if (fm.updatedAt) assertIsoDate(`${type}:${fm.slug}.updatedAt`, fm.updatedAt);

  const base = typeToBasePath(type);
  const url = `${base}/${fm.slug}`;

  const rt = readingTime(parsed.content);
  const toc = extractToc(parsed.content);

  return {
    type,
    slug: fm.slug,
    title: fm.title,
    excerpt: fm.excerpt,
    tags: fm.tags,
    publishedAt: fm.publishedAt,
    updatedAt: fm.updatedAt,
    canonicalUrl: fm.canonicalUrl,
    coverImage: fm.coverImage,
    url,
    source: parsed.content,
    toc,
    readingTime: {
      text: rt.text,
      minutes: rt.minutes,
      words: rt.words
    }
  };
}

export const getAllContent = cache(async (): Promise<ContentListItem[]> => {
  const types: ContentType[] = ["posts", "notes", "reviews"];
  const all = await Promise.all(
    types.map(async (type) => {
      const dir = path.join(CONTENT_ROOT, type);
      let files: string[] = [];
      try {
        files = await listMdxFiles(dir);
      } catch {
        return [] as ContentItem[];
      }
      return Promise.all(files.map((f) => loadOneFromFile(type, f)));
    })
  );

  return all
    .flat()
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt))
    .map(({ source, toc, readingTime: _rt, ...item }) => item);
});

export const getAllContentByType = cache(
  async (type: ContentType): Promise<ContentListItem[]> => {
    const all = await getAllContent();
    return all.filter((i) => i.type === type);
  }
);

export const getContentBySlug = cache(
  async (type: ContentType, slug: string): Promise<ContentItem> => {
    const filePath = path.join(CONTENT_ROOT, type, `${slug}.mdx`);
    return loadOneFromFile(type, filePath);
  }
);

export const getAllSlugsByType = cache(
  async (type: ContentType): Promise<string[]> => {
    const list = await getAllContentByType(type);
    return list.map((i) => i.slug);
  }
);

export const getTagCounts = cache(async (): Promise<Map<string, number>> => {
  const all = await getAllContent();
  const counts = new Map<string, number>();
  for (const item of all) {
    for (const tag of item.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return counts;
});

export const getAllTags = cache(async (): Promise<string[]> => {
  const counts = await getTagCounts();
  return [...counts.keys()].sort((a, b) => a.localeCompare(b));
});

export const getContentByTag = cache(
  async (tag: string): Promise<ContentListItem[]> => {
    const all = await getAllContent();
    return all.filter((i) => i.tags.includes(tag));
  }
);

