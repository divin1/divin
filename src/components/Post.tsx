import ImageWrapper from "@/components/posts/ImageWrapper";
import { CompiledPost } from "@/lib/types";
import { renderMdx } from "@/lib/mdx";
import Gallery from "@/components/posts/Gallery";
import CustomLink from "@/components/posts/CustomLink";
import {
  LineChart,
  BarChart,
  AreaChart,
  PieChart,
  BarList,
} from "@/components/posts/charts/ChartComponents";
import { Tabs, Tab } from "@/components/posts/Tabs";
import Heatmap from "@/components/posts/charts/Heatmap";
import Mermaid from "@/components/posts/Mermaid";
import ShareButton from "@/components/ShareButton";
import Link from "next/link";

// load components to pass to MDX
const components = {
  Gallery,
  LineChart,
  BarChart,
  AreaChart,
  PieChart,
  BarList,
  Heatmap,
  Mermaid,
  Tabs,
  Tab,
  img: ImageWrapper,
  a: CustomLink,
};

type PostProps = {
  post: CompiledPost;
  backTo: string;
  category: string;
};

export default async function Post({ post, backTo, category }: PostProps) {
  return (
    <article className="my-16 flex flex-col sm:my-20">
      {/* Header Section */}
      <header className="mb-12 text-center">
        {/* Date and Category */}
        <div className="text-text-variant mb-6 flex items-center justify-center gap-3 text-sm">
          <time dateTime={post.metadata.date}>
            {new Date(post.metadata.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </time>
          <span className="text-text-variant/50">·</span>
          <Link href={backTo} className="text-primary capitalize">
            {category}
          </Link>
        </div>

        {/* Title */}
        <h1 className="text-foreground mx-auto max-w-4xl text-3xl leading-tight font-semibold tracking-tight sm:text-4xl md:text-5xl">
          {post.metadata.title}
        </h1>

        {/* Excerpt / Subtitle */}
        {post.metadata.excerpt && (
          <p className="text-text-variant mx-auto mt-6 max-w-2xl text-lg">
            {post.metadata.excerpt}
          </p>
        )}
      </header>

      {/* Toolbar */}
      <div className="border-border mx-auto mb-10 flex w-full max-w-prose items-center justify-between border-y py-4">
        <div className="text-text-variant flex items-center gap-2 text-sm">
          <span>{post.readTime} min read</span>
        </div>
        <ShareButton />
      </div>

      {/* Content */}
      <div className="mx-auto max-w-prose">
        <div className="prose prose-invert prose-stone prose-headings:text-foreground prose-p:text-text prose-p:text-lg prose-a:text-primary hover:prose-a:text-primary-accent prose-img:rounded-md prose-img:shadow-md prose-strong:text-foreground prose-li:text-text max-w-none overflow-x-hidden">
          {renderMdx({ source: post.content, components })}
        </div>
      </div>
    </article>
  );
}
