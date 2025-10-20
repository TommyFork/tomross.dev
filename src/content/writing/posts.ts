import type { ComponentType } from "react";
import FirstPost, { meta as firstMeta } from "./first-post.mdx";

export type PostMeta = {
  title: string;
  date: string; // ISO yyyy-mm-dd
  summary?: string;
};

export type PostEntry = {
  slug: string;
  meta: PostMeta;
};

export const posts: PostEntry[] = [
  { slug: "first-post", meta: firstMeta },
];

export async function loadPost(slug: string): Promise<ComponentType> {
  switch (slug) {
    case "first-post":
      return FirstPost as unknown as ComponentType;
    default:
      throw new Error("Post not found");
  }
}


