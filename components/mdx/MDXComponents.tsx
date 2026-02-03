import Link from "next/link";

import { siteConfig } from "@/lib/site";

function ExternalLink(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const href = props.href ?? "";
  const isExternal =
    href.startsWith("http://") || href.startsWith("https://") || href.startsWith("//");
  if (!isExternal) return <a {...props} />;
  return <a {...props} target="_blank" rel="noreferrer noopener" />;
}

type SiteLinkProps = Omit<React.ComponentProps<typeof Link>, "href"> & {
  href: string;
};

function SiteLink({ href, className, ...props }: SiteLinkProps) {
  const absoluteHref = href.startsWith("/")
    ? new URL(href, siteConfig.siteUrl).toString()
    : href;

  return (
    <Link
      {...props}
      href={absoluteHref}
      className={["text-link hover:text-link-hover", className].filter(Boolean).join(" ")}
    />
  );
}

function MdxImage(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  if (!props.alt) {
    throw new Error(
      `MDX image is missing alt text (src: ${props.src ?? "unknown"})`
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    <img
      {...props}
      className={[
        "rounded-xl border border-border bg-card shadow-sm",
        props.className
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}

export const mdxComponents = {
  a: (props: any) => {
    const href = String(props?.href ?? "");
    if (href.startsWith("/")) {
      return (
        <Link href={href} className="text-link hover:text-link-hover">
          {props.children}
        </Link>
      );
    }
    return (
      <ExternalLink
        {...props}
        className={[
          "text-link hover:text-link-hover",
          props.className
        ]
          .filter(Boolean)
          .join(" ")}
      />
    );
  },
  img: MdxImage,
  SiteLink
};

