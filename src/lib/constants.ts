export type AppConfig = {
  author: string;
  fullName: string;
  siteName: string;
  domain: string;
  metadata: {
    title: string;
    description: string;
    keywords: string;
    authors: { name: string; url: string }[];
    creator: string;
  };
  email: string;
  github: string;
  linkedin: string;
  content: {
    thoughts: string;
  };
};

export const APP_CONFIG: AppConfig = {
  author: "Nicolas",
  fullName: "Nicolas Di Vittorio",
  siteName: "divin",
  domain: "https://divin.me",
  metadata: {
    title: "divin",
    description:
      "Techie by trade, explorer at heart. I write about tech, data, people, and adventures &mdash; both in code and in nature.",
    keywords: "divin, blog, thoughts, personal, website",
    authors: [{ name: "Nicolas Di Vittorio", url: "https://divin.me" }],
    creator: "Nicolas Di Vittorio",
  },
  email: "hello@divin.me",
  github: "https://github.com/divin1",
  linkedin: "https://www.linkedin.com/in/nicolas-divittorio",
  content: {
    thoughts: "content/thoughts",
  },
};
