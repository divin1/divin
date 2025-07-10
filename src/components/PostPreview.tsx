import Link from "next/link";

type PostPreviewProps = {
  date: string;
  readTime: number;
  title: string;
  url: string;
  excerpt: string;
};

export default function PostPreview({ date, readTime, title, url, excerpt }: PostPreviewProps) {
  return (
    <article>
      <Link href={url} passHref>
        <h1 className="text-text cursor-pointer text-lg font-semibold transition duration-500 ease-in-out hover:underline">
          {title}
        </h1>
        <p className="text-text-variant text-base font-normal">{excerpt}</p>
        <span className="text-text-variant text-sm">
          {new Date(date).toLocaleDateString("en-US", { month: "long", year: "numeric" })} &mdash;{" "}
          {readTime} min read
        </span>
      </Link>
    </article>
  );
}
