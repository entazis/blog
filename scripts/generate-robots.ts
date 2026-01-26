import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { siteConfig } from "../lib/site";

async function main() {
  const publicDir = path.join(process.cwd(), "public");
  await mkdir(publicDir, { recursive: true });

  const body = `User-agent: *
Allow: /
Disallow: /search

Sitemap: ${siteConfig.siteUrl}/sitemap.xml
`;

  await writeFile(path.join(publicDir, "robots.txt"), body, "utf8");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

