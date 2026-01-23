import Link from "next/link";
import ImageWrapper from "@/components/posts/ImageWrapper";
import { ChevronRight, Home } from "lucide-react";
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

// load components to pass to MDX
const components = {
  Gallery,
  LineChart,
  BarChart,
  AreaChart,
  PieChart,
  BarList,
  Heatmap,
  Tabs,
  Tab,
  img: ImageWrapper,
  a: CustomLink,
};

type PostProps = {
  post: CompiledPost;
  backTo: string;
  backToText: string;
};

export default async function Post({ post, backTo, backToText }: PostProps) {
  return (
    <article className="my-20 flex flex-col">
      {/* Breadcrumbs */}
      <nav className="mb-6 flex items-center gap-2 text-sm">
        <Link
          href="/"
          className="text-text-variant hover:text-primary flex items-center transition-colors"
        >
          <Home className="size-4" />
        </Link>
        <ChevronRight className="text-text-variant/50 size-3" />
        <Link
          href={backTo}
          className="text-text-variant hover:text-primary capitalize transition-colors"
        >
          {backToText}
        </Link>
        <ChevronRight className="text-text-variant/50 size-3" />
        <span className="text-foreground max-w-[200px] truncate sm:max-w-[300px]">
          {post.metadata.title}
        </span>
      </nav>

      <div className="mx-auto max-w-prose">
        <h1 className="text-primary text-4xl font-bold">{post.metadata.title}</h1>
        <span className="text-text-variant text-base">
          {new Date(post.metadata.date).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </span>

        <div className="prose prose-invert prose-stone prose-h1:text-primary prose-p:text-lg prose-a:text-primary prose-a:hover:text-primary-accent prose-img:rounded-md prose-img:shadow-md mt-5">
          {renderMdx({ source: post.content, components })}
        </div>
      </div>
    </article>
  );
}
