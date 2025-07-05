import { MDXRemote } from "next-mdx-remote/rsc";
import * as runtime from "react/jsx-runtime";

interface RenderMdxOptions {
  source: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  components?: Record<string, React.ComponentType<any>>;
}

export async function renderMdx({ source, components = {} }: RenderMdxOptions) {
  return MDXRemote({
    source,
    options: { parseFrontmatter: true },
    components,
    // @ts-expect-error annoying to type
    unstable_runtimeJSX: runtime,
  });
}
