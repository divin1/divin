import { getPosts, THOUGHTS_PATH } from "@/lib/api";
import Link from "next/link";
import { MoveUpRight } from "lucide-react";

export default async function LatestThoughts() {
  const posts = await getPosts(THOUGHTS_PATH);

  const latest2 = posts
    .sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime())
    .slice(0, 2);

  return (
    <ul>
      {latest2.map((post) => {
        return (
          <Link href={`/thoughts/${post.slug}`} key={post.slug}>
            <li className="relative">
              <div className="group">
                <div className="after:bg-primary flex cursor-pointer items-baseline gap-5 rounded-lg py-2 group-hover:italic after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:transition-all after:duration-250 after:ease-in-out group-hover:after:w-full">
                  <span className="text-lg font-medium">{post.metadata.title}</span>
                  <span className="flex-1"></span>
                  <span className="text-text-variant m-0 text-sm">
                    {new Date(post.metadata.date).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>

                  <MoveUpRight className="size-5 self-center opacity-0 transition-all delay-200 duration-200 ease-in-out group-hover:opacity-100"></MoveUpRight>
                </div>
              </div>
            </li>
          </Link>
        );
      })}
    </ul>
  );
}
