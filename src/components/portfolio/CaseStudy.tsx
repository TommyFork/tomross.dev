import Image from "next/image";
import { ReactNode } from "react";
import ProofGrid, { type Proof } from "./ProofGrid";
import Reveal from "./Reveal";
import StackRow, { type StackItem } from "./StackRow";
import StatStrip, { type Stat } from "./StatStrip";
import { Chip, Eyebrow, Frame } from "./primitives";

export type CaseStudyData = {
  id: string;
  /** Legacy deep links that should keep resolving to this section. */
  anchorIds?: readonly string[];
  name: string;
  accentClass: string;
  logo: { src: string; darkSrc?: string; alt: string };
  tagline: string;
  status?: string;
  summary: ReactNode;
  tags?: readonly string[];
  spec: readonly { label: string; value: string }[];
  work: ReactNode;
  stats: readonly Stat[];
  stack?: readonly StackItem[];
  proofs?: readonly Proof[];
  footnote?: ReactNode;
};

type CaseStudyProps = CaseStudyData & {
  index: number;
  hero: ReactNode;
  /** Frames screenshots; the shuffling gallery brings its own presentation. */
  frameHero?: boolean;
};

export default function CaseStudy({
  id,
  anchorIds = [],
  index,
  accentClass,
  logo,
  tagline,
  status,
  summary,
  tags,
  spec,
  work,
  stats,
  stack,
  proofs,
  footnote,
  hero,
  frameHero = true,
}: CaseStudyProps) {
  const anchors = Array.from(new Set([id, ...anchorIds]));

  return (
    <section
      data-section-id={id}
      aria-labelledby={`${id}-title`}
      className={`accent-wash relative isolate ${accentClass}`}
    >
      {anchors.map((anchorId) => (
        <span
          key={anchorId}
          id={anchorId}
          aria-hidden="true"
          className="pointer-events-none absolute top-0 h-0 w-px scroll-mt-28 opacity-0 md:scroll-mt-36"
        />
      ))}

      <Reveal className="flex items-center gap-4 sm:gap-6">
        <span className="font-mono text-xs font-medium tabular-nums text-[var(--accent-ink)]">
          {String(index).padStart(2, "0")}
        </span>
        <span
          aria-hidden="true"
          className="h-px flex-1 bg-gradient-to-r from-[var(--hairline-strong)] to-transparent"
        />
        {status && (
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--hairline)] bg-[var(--surface)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]"
            />
            {status}
          </span>
        )}
      </Reveal>

      <Reveal delay={80} className="mt-8 md:mt-10">
        <div className="relative h-11 w-full max-w-[240px] sm:h-12 sm:max-w-[260px]">
          <Image
            src={logo.src}
            alt={logo.alt}
            fill
            priority={index === 1}
            sizes="(min-width: 640px) 260px, 240px"
            className={`object-contain object-left ${logo.darkSrc ? "dark:hidden" : ""}`}
          />
          {logo.darkSrc && (
            <Image
              src={logo.darkSrc}
              alt={logo.alt}
              fill
              sizes="(min-width: 640px) 260px, 240px"
              loading="lazy"
              className="hidden object-contain object-left dark:block"
            />
          )}
        </div>

        <h2
          id={`${id}-title`}
          className="mt-6 max-w-3xl text-balance text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.02em] sm:text-[2.125rem] md:text-[2.5rem]"
        >
          {tagline}
        </h2>

        <div className="mt-5 max-w-2xl text-[16px] leading-[1.75] text-[var(--muted)]">
          {summary}
        </div>

        {tags && tags.length > 0 && (
          <ul className="mt-7 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Chip key={tag}>{tag}</Chip>
            ))}
          </ul>
        )}
      </Reveal>

      <Reveal delay={60} className="mt-12 md:mt-16">
        {frameHero ? <Frame>{hero}</Frame> : hero}
      </Reveal>

      {stack && stack.length > 0 && (
        <Reveal className="mt-6 md:mt-8">
          <StackRow items={stack} />
        </Reveal>
      )}

      <Reveal className="mt-12 md:mt-16">
        <StatStrip stats={stats} />
      </Reveal>

      <div className="mt-14 border-t border-[var(--hairline)] pt-12 md:mt-20 md:pt-14">
        <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:gap-x-12">
          <Reveal className="lg:col-span-4">
            <Eyebrow>My role</Eyebrow>
            <dl className="mt-6 space-y-5">
              {spec.map((item) => (
                <div key={item.label}>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)] opacity-70">
                    {item.label}
                  </dt>
                  <dd className="mt-1.5 text-[15px] font-medium leading-snug text-[var(--foreground)]">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={100} className="lg:col-span-8">
            <p className="text-[17px] leading-[1.8] text-[var(--foreground)]/85 md:text-[18px]">
              {work}
            </p>
          </Reveal>
        </div>
      </div>

      {proofs && proofs.length > 0 && (
        <div className="mt-12 md:mt-16">
          <ProofGrid proofs={proofs} />
        </div>
      )}

      {footnote && (
        <p className="mt-10 border-t border-[var(--hairline)] pt-6 text-xs leading-relaxed text-[var(--muted)] md:mt-12">
          {footnote}
        </p>
      )}
    </section>
  );
}
