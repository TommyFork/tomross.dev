import type { Metadata } from "next";
import Link from "next/link";
import ProfileCard from "@/components/ProfileCard";
import AnimatedWorkLink from "@/components/AnimatedWorkLink";
import ContactModalLink from "@/components/ContactModalLink";
import fs from "fs/promises";
import path from "path";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { AnchorHTMLAttributes, HTMLAttributes } from "react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Get to know me—I'm Tommy Ross, a full-stack developer focused on building thoughtful, user-centered products.",
};

export default async function Home() {
  const filePath = path.join(process.cwd(), "public", "content", "about.md");
  const markdown = await fs.readFile(filePath, "utf8");

  const MarkdownLink = (props: AnchorHTMLAttributes<HTMLAnchorElement> & { node?: unknown }) => {
    const { href, children, node: _node, className: passedClassName, ...rest } = props;
    void _node;
    const className = `text-blue-500 dark:text-blue-400 hover:underline hover:opacity-70 transition-smooth duration-200 ease-in-out ${passedClassName ?? ""}`;
    if (href && /^https?:\/\//.test(href)) {
      return (
        <a
          {...rest}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {children}
        </a>
      );
    }
    if (href === "#contact" || href === "#contact-modal") {
      return (
        <ContactModalLink
          href={href}
          className={className}
          {...(rest as Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">)}
        >
          {children}
        </ContactModalLink>
      );
    }
    if (href) {
      return (
        <Link
          href={href}
          className={className}
          {...(rest as Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">)}
        >
          {children}
        </Link>
      );
    }
    return (
      <a {...rest} className={className}>
        {children}
      </a>
    );
  };

  const Paragraph = (props: HTMLAttributes<HTMLParagraphElement>) => (
    <p
      {...props}
      className={`mb-4 last:mb-0 leading-relaxed ${props.className ?? ""}`}
    />
  );
  return (
    <div className="py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-1 space-y-6">
          <ProfileCard />
          <AnimatedWorkLink />
        </div>
        <div className="md:col-span-2 space-y-6">
          <h1 className="text-2xl font-medium tracking-tight">
            It&apos;s nice to meet you! 👋
          </h1>
          <div className="space-y-4">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              className="text-neutral-700 dark:text-neutral-300"
              components={{ a: MarkdownLink, p: Paragraph }}
            >
              {markdown}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
