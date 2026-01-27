import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { getAllContent, getAllTags } from "../lib/content";
import { locales } from "../lib/i18n";
import { siteConfig } from "../lib/site";

function escapeXml(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

async function main() {
  const publicDir = path.join(process.cwd(), "public");
  await mkdir(publicDir, { recursive: true });

  const urls: Array<{ loc: string; lastmod?: string }> = [];
  for (const locale of locales) {
    const [items, tags] = await Promise.all([getAllContent(locale), getAllTags(locale)]);
    urls.push(
      { loc: `${siteConfig.siteUrl}/${locale}` },
      { loc: `${siteConfig.siteUrl}/${locale}/posts` },
      { loc: `${siteConfig.siteUrl}/${locale}/notes` },
      { loc: `${siteConfig.siteUrl}/${locale}/reviews` },
      { loc: `${siteConfig.siteUrl}/${locale}/tags` },
      { loc: `${siteConfig.siteUrl}/${locale}/rss.xml` }
    );

    for (const i of items) {
      const lastmod = (i.updatedAt ?? i.publishedAt)
        ? new Date(i.updatedAt ?? i.publishedAt).toISOString()
        : undefined;
      urls.push({ loc: `${siteConfig.siteUrl}${i.url}`, lastmod });
    }

    for (const t of tags) {
      urls.push({ loc: `${siteConfig.siteUrl}/${locale}/tags/${encodeURIComponent(t)}` });
    }
  }

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map((u) => {
        const loc = escapeXml(u.loc);
        const lastmod = u.lastmod ? `<lastmod>${escapeXml(u.lastmod)}</lastmod>` : "";
        return `  <url><loc>${loc}</loc>${lastmod}</url>`;
      })
      .join("\n") +
    `\n</urlset>\n`;

  await writeFile(path.join(publicDir, "sitemap.xml"), body, "utf8");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

