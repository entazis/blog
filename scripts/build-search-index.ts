import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { getAllContent } from "../lib/content";
import { locales } from "../lib/i18n";

async function main() {
  const publicDir = path.join(process.cwd(), "public");
  await mkdir(publicDir, { recursive: true });

  const generatedAt = new Date().toISOString();
  await Promise.all(
    locales.map(async (locale) => {
      const items = await getAllContent(locale);
      const body = { generatedAt, items };
      const outDir = path.join(publicDir, locale);
      await mkdir(outDir, { recursive: true });
      await writeFile(
        path.join(outDir, "search-index.json"),
        JSON.stringify(body, null, 2),
        "utf8"
      );
    })
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

