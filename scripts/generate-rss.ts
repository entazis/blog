import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { getAllContent } from "../lib/content";
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

  const now = new Date();
  const generatedAt = escapeXml(now.toUTCString());

  await Promise.all(
    locales.map(async (locale) => {
      const items = await getAllContent(locale);
      const latest = items.slice(0, 30);
      const outDir = path.join(publicDir, locale);
      await mkdir(outDir, { recursive: true });

      const selfUrl = `${siteConfig.siteUrl}/${locale}/rss.xml`;

      const body =
        `<?xml version="1.0" encoding="UTF-8"?>\n` +
        `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n` +
        `  <channel>\n` +
        `    <title>${escapeXml(siteConfig.title)}</title>\n` +
        `    <link>${escapeXml(siteConfig.siteUrl)}</link>\n` +
        `    <description>${escapeXml(siteConfig.description)}</description>\n` +
        `    <language>${escapeXml(locale)}</language>\n` +
        `    <lastBuildDate>${generatedAt}</lastBuildDate>\n` +
        `    <atom:link href="${escapeXml(selfUrl)}" rel="self" type="application/rss+xml" />\n` +
        latest
          .map((i) => {
            const link = `${siteConfig.siteUrl}${i.url}`;
            const pubDate = new Date(i.publishedAt).toUTCString();
            const categories = i.tags
              .map((t) => `      <category>${escapeXml(t)}</category>\n`)
              .join("");

            return (
              `    <item>\n` +
              `      <title>${escapeXml(i.title)}</title>\n` +
              `      <link>${escapeXml(link)}</link>\n` +
              `      <guid isPermaLink="true">${escapeXml(link)}</guid>\n` +
              `      <pubDate>${escapeXml(pubDate)}</pubDate>\n` +
              categories +
              `      <description><![CDATA[${i.excerpt}]]></description>\n` +
              `    </item>\n`
            );
          })
          .join("") +
        `  </channel>\n` +
        `</rss>\n`;

      await writeFile(path.join(outDir, "rss.xml"), body, "utf8");
    })
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

