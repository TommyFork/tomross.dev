import Image from "next/image";
import Link from "next/link";
import ExpandableText from "@/components/ExpandableText";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/icons/SocialIcons";

export const metadata = {
  title: "About — Tom Ross",
};

export default function About() {
  return (
    <div className="space-y-10 py-10">
      <div className="rounded-3xl border border-[color:var(--brightbook-blue)]/25 bg-[color:var(--brightbook-blue)]/10 p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
          <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-[color:var(--brightbook-blue)]/40 bg-white shadow-sm sm:h-24 sm:w-24">
            <Image
              src="/headshot.svg"
              alt="Tom Ross headshot"
              width={96}
              height={96}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-[0.32em] text-[color:var(--brightbook-dark-blue)]/80">
              About
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">Tom Ross</h1>
            <p className="max-w-xl text-sm leading-relaxed text-neutral-700 sm:text-base">
              Full-stack developer focused on building clear, fast, and reliable web products with thoughtful UX and maintainable code.
            </p>
            <div className="flex items-center gap-4 text-neutral-600">
              <Link
                href="https://github.com/tommyross"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--brightbook-blue)]/30 bg-white transition-colors hover:border-[color:var(--brightbook-blue)]/60 hover:text-[color:var(--brightbook-dark-blue)]"
                aria-label="GitHub"
              >
                <GitHubIcon />
              </Link>
              <Link
                href="https://www.linkedin.com/in/tomross"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--brightbook-blue)]/30 bg-white transition-colors hover:border-[color:var(--brightbook-blue)]/60 hover:text-[color:var(--brightbook-dark-blue)]"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </Link>
              <Link
                href="https://x.com/tommyross"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--brightbook-blue)]/30 bg-white transition-colors hover:border-[color:var(--brightbook-blue)]/60 hover:text-[color:var(--brightbook-dark-blue)]"
                aria-label="X"
              >
                <XIcon />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr),minmax(0,1fr)]">
        <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
          <ExpandableText
            text="I’m Tom Ross, a full-stack developer focused on building clear, fast, and reliable web products. I value small, composable systems, tight feedback loops, and elegant interfaces. I’ve led and contributed to projects across frontend, backend, and infrastructure with an emphasis on thoughtful UX and maintainable code. Whether partnering with design, wrangling architecture, or launching new features, I keep teams moving with clarity and momentum."
            limit={360}
          />
        </section>

        <Link
          href="/work"
          className="group relative overflow-hidden rounded-3xl border border-[color:var(--brightbook-blue)]/50 bg-[color:var(--brightbook-blue)]/90 p-6 text-white shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg sm:p-8"
        >
          <span className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/10 blur-3xl transition-opacity duration-300 group-hover:opacity-60" />
          <div className="relative text-xs font-semibold uppercase tracking-[0.32em] text-white/70">Explore</div>
          <div className="relative mt-3 text-2xl font-semibold tracking-tight">See my work</div>
          <p className="relative mt-3 max-w-xs text-sm leading-relaxed text-white/80">
            Case studies, prototypes, and shipped products that show how I build.
          </p>
          <div className="relative mt-6 inline-flex items-center gap-2 text-sm font-medium text-white">
            View projects
            <span aria-hidden className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-white/10 transition-colors duration-200 group-hover:bg-white/20">
              →
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}


