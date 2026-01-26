import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { getAllContent } from "../lib/content";

async function main() {
  const publicDir = path.join(process.cwd(), "public");
  await mkdir(publicDir, { recursive: true });

  const items = await getAllContent();

  const body = {
    generatedAt: new Date().toISOString(),
    items
  };

  await writeFile(
    path.join(publicDir, "search-index.json"),
    JSON.stringify(body, null, 2),
    "utf8"
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

