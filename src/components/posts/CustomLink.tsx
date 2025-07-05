import Link from "next/link";

export default function CustomLink({
  href,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (href && href.startsWith("/")) {
    // For internal links, use Next.js Link for client-side navigation
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  } else {
    // For external links, use a regular <a> tag with target="_blank" and rel="noopener noreferrer"
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }
}
