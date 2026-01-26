import { compileMDX } from "next-mdx-remote/rsc";
import GithubSlugger from "github-slugger";
import { toString } from "mdast-util-to-string";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import { unified } from "unified";
import { visit } from "unist-util-visit";

export type TocItem = {
  depth: 2 | 3;
  value: string;
  id: string;
};

export function extractToc(mdxSource: string): TocItem[] {
  const tree = unified().use(remarkParse).use(remarkGfm).parse(mdxSource);

  const slugger = new GithubSlugger();
  const toc: TocItem[] = [];

  visit(tree, "heading", (node: any) => {
    const depth = node?.depth as number | undefined;
    if (depth !== 2 && depth !== 3) return;
    const value = toString(node).trim();
    if (!value) return;
    const id = slugger.slug(value);
    toc.push({ depth, value, id });
  });

  return toc;
}

export async function renderMdx(source: string, components?: any) {
  const { content } = await compileMDX({
    source,
    components,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            { behavior: "wrap", properties: { className: ["heading-anchor"] } }
          ],
          [
            rehypePrettyCode,
            {
              theme: { light: "github-light", dark: "github-dark" },
              keepBackground: false
            }
          ]
        ]
      }
    }
  });

  return content;
}

