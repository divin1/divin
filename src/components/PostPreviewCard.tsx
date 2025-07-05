import Link from "next/link";
import Image from "next/image";

type PostPreviewCardProps = {
  date: string;
  title: string;
  url: string;
  coverImage: string;
};

export default function PostPreviewCard({ date, title, url, coverImage }: PostPreviewCardProps) {
  return (
    <article className="border-border flex h-auto w-full flex-col gap-2 rounded-lg">
      <Link href={url} passHref>
        <Image src={coverImage} alt={title} layout="fill" className="rounded-lg object-cover" />
        <div className="absolute top-5 left-5 z-3">
          <h3 className="text-lg font-light uppercase">
            {new Date(date).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </h3>
          <h1 className="hover:text-primary text-text cursor-pointer text-2xl font-bold transition duration-500 ease-in-out">
            {title}
          </h1>
        </div>
      </Link>
    </article>
  );
}
