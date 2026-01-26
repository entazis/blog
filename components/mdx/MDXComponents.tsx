import Link from "next/link";

function ExternalLink(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const href = props.href ?? "";
  const isExternal =
    href.startsWith("http://") || href.startsWith("https://") || href.startsWith("//");
  if (!isExternal) return <a {...props} />;
  return <a {...props} target="_blank" rel="noreferrer noopener" />;
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
        "rounded-xl border border-slate-200 dark:border-slate-800",
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
        <Link href={href} className="text-sky-700 hover:underline dark:text-sky-300">
          {props.children}
        </Link>
      );
    }
    return (
      <ExternalLink
        {...props}
        className={[
          "text-sky-700 hover:underline dark:text-sky-300",
          props.className
        ]
          .filter(Boolean)
          .join(" ")}
      />
    );
  },
  img: MdxImage
};

