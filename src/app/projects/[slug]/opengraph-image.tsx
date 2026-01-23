import { getPost, PROJECTS_PATH } from "@/lib/api";
import { generateOgImage } from "@/lib/og";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(PROJECTS_PATH, slug);
  if (!post) return new Response("Not found", { status: 404 });

  return generateOgImage({
    title: post.metadata.title,
    description: post.metadata.excerpt,
    type: "project",
    size,
  });
}
