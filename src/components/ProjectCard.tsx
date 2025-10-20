import Link from "next/link";

export type Project = {
  title: string;
  summary: string;
  tech: string[];
  links?: { label: string; href: string }[];
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="rounded-lg border border-neutral-200 p-3 transition-colors bg-white">
      <h3 className="text-base font-medium tracking-tight">{project.title}</h3>
      <p className="text-sm text-neutral-600 mt-2">{project.summary}</p>
      <div className="mt-2 text-xs text-neutral-500">
        {project.tech.join(" · ")}
      </div>
      {project.links && project.links.length > 0 ? (
        <div className="mt-3 flex gap-4 text-sm">
          {project.links.map((l) => (
            <Link key={l.href} href={l.href} target="_blank" rel="noreferrer noopener" className="hover:underline underline-offset-4">
              {l.label}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}


