import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { getAllContent, getAllTags } from "../lib/content";
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

  const [items, tags] = await Promise.all([getAllContent(), getAllTags()]);

  const urls: Array<{ loc: string; lastmod?: string }> = [
    { loc: `${siteConfig.siteUrl}/` },
    { loc: `${siteConfig.siteUrl}/posts` },
    { loc: `${siteConfig.siteUrl}/notes` },
    { loc: `${siteConfig.siteUrl}/reviews` },
    { loc: `${siteConfig.siteUrl}/tags` },
    { loc: `${siteConfig.siteUrl}/rss.xml` }
  ];

  for (const i of items) {
    const lastmod = (i.updatedAt ?? i.publishedAt) ? new Date(i.updatedAt ?? i.publishedAt).toISOString() : undefined;
    urls.push({ loc: `${siteConfig.siteUrl}${i.url}`, lastmod });
  }

  for (const t of tags) {
    urls.push({ loc: `${siteConfig.siteUrl}/tags/${encodeURIComponent(t)}` });
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

