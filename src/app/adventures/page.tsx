import { getPosts, ADVENTURES_PATH } from "@/lib/api";
import PostPreviewCard from "@/components/PostPreviewCard";
import { CompiledPost } from "@/lib/types";
import * as motion from "motion/react-client";

export default async function Adventures() {
  const posts: CompiledPost[] = (await getPosts(ADVENTURES_PATH)).filter(
    (a) => !a.metadata.draft && !a.metadata.hidden
  );

  return (
    <div>
      <h1 className="mt-20 text-4xl font-bold">Adventures</h1>
      <h3 className="text-text-variant text-xl font-normal">Chasing remote peaks and horizons.</h3>

      <ul className="flex flex-wrap content-start items-center justify-center gap-4 py-8">
        {posts.map((post, index) => {
          const isBig = index % 4 === 0 || index % 4 === 3;
          const isOdd = index % 2 === 0; // index starts at 0

          return (
            <motion.div
              className={`relative h-[450px] max-w-[99%] flex-[0_0_99%] ${isBig ? "md:max-w-[59%] md:flex-[0_0_59%]" : "md:max-w-[39%] md:flex-[0_0_39%]"} ${isOdd ? "pl-0" : "pr-0"}`}
              key={index}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <PostPreviewCard
                url={`/adventures/${post.slug}`}
                date={post.metadata.date}
                title={post.metadata.title}
                coverImage={post.metadata.cover}
              />
            </motion.div>
          );
        })}
      </ul>
    </div>
  );
}
