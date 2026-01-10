import Link from "next/link";
import ImageWrapper from "@/components/posts/ImageWrapper";
import { ArrowLeft } from "lucide-react";
import { CompiledPost } from "@/lib/types";
import { renderMdx } from "@/lib/mdx";
import Gallery from "@/components/posts/Gallery";
import GpxMap from "@/components/posts/GpxMap";
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
  GpxMap,
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
      <div className="mb-4">
        <Link
          href={backTo}
          passHref
          className="hover:text-primary text-text-variant font-bold transition duration-200 ease-in-out"
        >
          <span className="flex flex-row items-center">
            <ArrowLeft className="h4 mr-4 size-4" />
            {backToText}
          </span>
        </Link>
      </div>

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
