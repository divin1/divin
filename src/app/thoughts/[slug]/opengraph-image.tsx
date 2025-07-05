import { ImageResponse } from "next/og";
import { getPost, THOUGHTS_PATH } from "@/lib/api";

// Image metadata
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  const post = await getPost(THOUGHTS_PATH, params.slug);

  return new ImageResponse(
    (
      <div className="flex h-full w-full justify-start bg-gradient-to-tr from-gray-900 via-slate-800 to-indigo-500 text-white">
        <div className="text-md h-full w-0.5 font-bold text-white">{post.metadata.title}</div>
      </div>
    )
  );
}
