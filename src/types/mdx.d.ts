import type { ComponentPropsWithoutRef } from "react";

declare module "*.mdx" {
  const MDXComponent: (props: ComponentPropsWithoutRef<"div">) => JSX.Element;
  export const meta: { title: string; date: string; summary?: string };
  export default MDXComponent;
}


