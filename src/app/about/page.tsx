import Image from "next/image";
import Link from "next/link";
import ContactCard from "@/components/ContactCard";
import ExpandableText from "@/components/ExpandableText";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/icons/SocialIcons";

const highlights = [
  {
    title: "Product clarity",
    description:
      "Designing interfaces that favour strong defaults, readable systems, and thoughtful polish.",
  },
  {
    title: "Reliable delivery",
    description:
      "Shipping production features end to end across frontend, backend, and infrastructure.",
  },
  {
    title: "Team momentum",
    description:
      "Keeping feedback loops tight and collaboration open so projects move with intention.",
  },
];

export const metadata = {
  title: "About — Tom Ross",
};

export default function About() {
  return (
    <div className="space-y-10 py-10">
      <div className="rounded-3xl border border-[color:var(--brightbook-blue)]/25 bg-[color:var(--brightbook-blue)]/10 p-6 shadow-sm sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr),minmax(0,1fr)] lg:items-center">
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
          <div className="max-w-sm">
            <ContactCard
              title="Like working with Tom Ross?"
              description="Let’s build something intentional together. I’m always up for thoughtful product conversations."
              ctaLabel="Email Tom"
              className="border-[color:var(--brightbook-blue)]/40 bg-white/80 backdrop-blur"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr),minmax(0,1fr)]">
        <div className="space-y-6">
          <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
            <ExpandableText
              text="I’m Tom Ross, a full-stack developer focused on building clear, fast, and reliable web products. I value small, composable systems, tight feedback loops, and elegant interfaces. I’ve led and contributed to projects across frontend, backend, and infrastructure with an emphasis on thoughtful UX and maintainable code. Whether partnering with design, wrangling architecture, or launching new features, I keep teams moving with clarity and momentum."
              limit={360}
            />
          </section>

          <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xs font-semibold uppercase tracking-[0.32em] text-neutral-500">Focus areas</h2>
            <ul className="mt-5 space-y-4">
              {highlights.map((item) => (
                <li key={item.title} className="text-sm leading-relaxed text-neutral-700">
                  <span className="block text-base font-medium text-neutral-900">{item.title}</span>
                  <span className="mt-1 block text-neutral-600">{item.description}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="space-y-4">
          <Link
            href="/work"
            className="group block rounded-3xl border border-[color:var(--brightbook-blue)]/40 bg-white p-6 text-neutral-900 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-md sm:p-8"
          >
            <div className="text-xs font-semibold uppercase tracking-[0.32em] text-neutral-500">Explore</div>
            <div className="mt-3 text-2xl font-semibold tracking-tight">See my work</div>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">
              Case studies, prototypes, and shipped products that show how I build.
            </p>
          </Link>
          <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xs font-semibold uppercase tracking-[0.32em] text-neutral-500">Currently</h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">
              Partnering with teams to design and ship product experiences with clarity, speed, and empathy. Always looking for thoughtful collaborators.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}


