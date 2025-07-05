import Link from "next/link";

type PostPreviewProps = {
  date: string;
  readTime: number;
  title: string;
  url: string;
};

export default function PostPreview({ date, readTime, title, url }: PostPreviewProps) {
  return (
    <article>
      <Link href={url} passHref>
        <h1 className="hover:text-primary text-text cursor-pointer text-2xl font-bold transition duration-500 ease-in-out">
          {title}
        </h1>
      </Link>
      <span className="text-text-variant text-sm">
        {new Date(date).toLocaleDateString("en-US", { month: "long", year: "numeric" })} &mdash;{" "}
        {readTime} min read
      </span>
    </article>
  );
}
