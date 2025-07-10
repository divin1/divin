import { getPost, THOUGHTS_PATH } from "@/lib/api";
import { generateOgImage } from "@/lib/og";

// metadata
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  const post = await getPost(THOUGHTS_PATH, params.slug);

  return await generateOgImage({
    title: post.metadata.title,
    size: {
      width: size.width,
      height: size.height,
    },
  });
}
