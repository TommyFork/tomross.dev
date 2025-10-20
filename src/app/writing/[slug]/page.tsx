import Link from "next/link";
import { GitHubIcon } from "@/components/icons/SocialIcons";
import { notFound } from "next/navigation";
import { loadPost, posts } from "@/content/writing/posts";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const entry = posts.find((p) => p.slug === params.slug);
  if (!entry) return notFound();
  const Content = await loadPost(params.slug);
  return (
    <article className="max-w-none py-10">
      <Link href="/writing" className="text-sm hover:underline underline-offset-4 inline-flex items-center gap-1">
        <span aria-hidden>‹</span>
        Back
      </Link>
      <h1 className="text-2xl font-medium tracking-tight mt-4 mb-6">{entry.meta.title}</h1>
      <div className="prose prose-neutral max-w-none">
        {/* @ts-expect-error Server Component from MDX */}
        <Content />
      </div>
      <div className="mt-10 pt-6 border-t border-neutral-200">
        <div className="text-sm text-neutral-500 mb-3">Suggested</div>
        <ul className="space-y-2">
          {[
            { slug: "placeholder-a", title: "Designing with constraints" },
            { slug: "placeholder-b", title: "The value of boring tech" },
            { slug: "placeholder-c", title: "On naming and clarity" },
          ].map((p) => (
            <li key={p.slug}>
              <a className="hover:underline underline-offset-4">{p.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}


