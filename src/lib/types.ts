export type CompiledPost = {
  slug: string;
  content: string;
  readTime: number;
  metadata: PostMetadata;
};

export type PostMetadata = {
  date: string;
  updated: string;
  draft: boolean;
  hidden: boolean;
  title: string;
  excerpt: string;
  tags: string[];
  keywords: string[];
  cover: string;
};
