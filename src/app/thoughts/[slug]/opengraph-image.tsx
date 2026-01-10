import { getPost, THOUGHTS_PATH } from "@/lib/api";
import { generateOgImage } from "@/lib/og";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(THOUGHTS_PATH, slug);

  return generateOgImage({
    title: post.metadata.title,
    description: post.metadata.excerpt,
    type: "thought",
    size,
  });
}
