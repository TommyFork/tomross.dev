"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import ContactModalLink from "@/components/ContactModalLink";
import ShufflingGallery from "@/components/ShufflingGallery";
import CaseStudy from "@/components/portfolio/CaseStudy";
import Reveal from "@/components/portfolio/Reveal";
import { Eyebrow } from "@/components/portfolio/primitives";

import { PROJECTS, PROJECT_NAV } from "./projects";

const HERO_STATS = [
  { value: "3", label: "products shipped" },
  { value: "2", label: "acquired" },
  { value: "$20K+", label: "non-dilutive funding" },
  { value: "700+", label: "students reached" },
] as const;

/**
 * Each preview is a different kind of asset, so each gets its own treatment:
 * BrightBook is a tall portrait document (cropped inside a frame), Stumped is a
 * transparent product render (floated, no frame), NextStep is a screenshot deck.
 */
const HEROES: Record<string, { framed: boolean; node: React.ReactNode }> = {
  brightbook: {
    framed: true,
    node: (
      <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
        <Image
          src="/brightbook/BrightBook-Preview.jpg"
          alt="A BrightBook lesson on solving two-step equations"
          fill
          priority
          sizes="(min-width: 1024px) 976px, calc(100vw - 48px)"
          className="object-cover object-top"
        />
      </div>
    ),
  },
  stumped: {
    framed: false,
    node: (
      <div className="relative mx-auto max-w-[560px] px-4">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(50% 45% at 45% 40%, color-mix(in srgb, var(--accent) 20%, transparent) 0%, transparent 70%)",
          }}
        />
        <Image
          src="/stumped/Stumped-Preview.png"
          alt="A hand holding three Stumped teacher trading cards"
          width={2516}
          height={2563}
          sizes="(min-width: 640px) 560px, calc(100vw - 48px)"
          loading="lazy"
          className="h-auto w-full"
        />
      </div>
    ),
  },
};

const nextStepImages = [
  {
    src: "/next-step/NextStep-Preview-2.png",
    alt: "NextStep guided financial aid questionnaire",
    width: 1367,
    height: 1702,
  },
  {
    src: "/next-step/NextStep-Preview-1.png",
    alt: "NextStep document upload and extraction review",
    width: 2049,
    height: 1578,
  },
  {
    src: "/next-step/NextStep-Preview-3.png",
    alt: "NextStep personalized aid summary",
    width: 2166,
    height: 2244,
  },
];

/**
 * Tracks which case study is closest to the middle of the viewport. Clicks
 * pin the selection briefly so the indicator doesn't flicker mid smooth-scroll.
 */
function useActiveSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const pinnedUntilRef = useRef<number | null>(null);

  useEffect(() => {
    const sections = PROJECT_NAV.map((section) =>
      document.querySelector<HTMLElement>(`[data-section-id="${section.id}"]`),
    ).filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length) return;

    let frameId: number | null = null;

    const update = () => {
      frameId = null;
      if (
        pinnedUntilRef.current != null &&
        performance.now() < pinnedUntilRef.current
      ) {
        return;
      }
      pinnedUntilRef.current = null;

      const viewportCenter = window.innerHeight / 2;
      let closest = 0;
      let smallestDistance = Number.POSITIVE_INFINITY;

      sections.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height / 2 - viewportCenter);
        if (distance < smallestDistance) {
          closest = index;
          smallestDistance = distance;
        }
      });

      setActiveIndex((current) => (current === closest ? current : closest));
    };

    const requestUpdate = () => {
      if (frameId != null) return;
      frameId = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frameId != null) window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  const jumpTo = useCallback((index: number) => {
    pinnedUntilRef.current = performance.now() + 900;
    setActiveIndex(index);
    document
      .getElementById(PROJECT_NAV[index].id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return { activeIndex, jumpTo };
}

/** Hides the mobile switcher once the reader reaches the closing section. */
function useOutroVisible(ref: React.RefObject<HTMLElement | null>) {
  const [reached, setReached] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setReached(entry.isIntersecting),
      { rootMargin: "0px 0px -20% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [ref]);

  return reached;
}

export default function WorkContent() {
  const { activeIndex, jumpTo } = useActiveSection();
  const outroRef = useRef<HTMLElement>(null);
  const outroReached = useOutroVisible(outroRef);

  return (
    <div className="relative">
      {/* Desktop rail — sits in the gutter left of the 5xl content column. */}
      <aside
        aria-label="Case studies"
        className="pointer-events-none fixed top-1/2 z-30 hidden w-24 -translate-y-1/2 xl:block"
        style={{ right: "calc(50% + 32rem + 0.5rem)" }}
      >
        <ul className="pointer-events-auto flex flex-col items-end gap-3">
          {PROJECT_NAV.map((section, index) => {
            const isActive = index === activeIndex;
            return (
              <li key={section.id} className="w-full">
                <button
                  type="button"
                  onClick={() => jumpTo(index)}
                  aria-current={isActive ? "true" : undefined}
                  className="group flex w-full cursor-pointer items-center justify-end gap-2.5 py-1 text-right focus-visible:outline-none"
                >
                  <span
                    className={`text-[11px] font-medium tracking-tight transition-all duration-300 ${
                      isActive
                        ? "text-[var(--foreground)] opacity-100"
                        : "text-[var(--muted)] opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                    }`}
                  >
                    {section.name}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`h-px shrink-0 rounded-full transition-all duration-300 ${
                      isActive
                        ? "w-8 bg-[var(--foreground)]"
                        : "w-4 bg-[var(--hairline-strong)] group-hover:w-6"
                    }`}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* Mobile / tablet switcher. */}
      <div
        className={`pointer-events-none fixed inset-x-0 bottom-5 z-30 flex justify-center px-4 transition-all duration-300 xl:hidden ${
          outroReached
            ? "pointer-events-none translate-y-4 opacity-0"
            : "opacity-100"
        }`}
      >
        <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-[var(--hairline)] bg-[var(--surface)]/90 p-1 shadow-[var(--shadow-lifted)] backdrop-blur-xl">
          {PROJECT_NAV.map((section, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => jumpTo(index)}
                aria-current={isActive ? "true" : undefined}
                className={`cursor-pointer rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors duration-200 ${
                  isActive
                    ? "bg-[var(--foreground)] text-[var(--background)]"
                    : "text-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
              >
                {section.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="pb-24 pt-6 sm:pt-8 md:pt-10 xl:pb-16">
        {/* Hero */}
        <header className="border-b border-[var(--hairline)] pb-14 md:pb-16">
          <Reveal>
            <Eyebrow className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-emerald-500"
              />
              Selected work
            </Eyebrow>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-5 max-w-3xl text-balance text-[2.25rem] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-[3rem] md:text-[3.5rem]">
              Products I designed, built, and shipped.
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-6 max-w-2xl text-[17px] leading-[1.75] text-[var(--muted)] md:text-[18px]">
              Three education products — from a Boston Public Schools pilot to
              two acquisitions. Below is what each one was, what it achieved,
              and exactly which parts I owned.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
              {HERO_STATS.map((stat) => (
                <div key={stat.label} className="border-l border-[var(--hairline-strong)] pl-4">
                  <dd className="text-[1.75rem] font-semibold tracking-tight md:text-[2rem]">
                    {stat.value}
                  </dd>
                  <dt className="mt-1 text-[13px] leading-snug text-[var(--muted)]">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* Contents */}
          <Reveal delay={260}>
            <nav aria-label="Jump to a case study" className="mt-14 md:mt-16">
              <Eyebrow>Contents</Eyebrow>
              <ul className="mt-4 border-t border-[var(--hairline)]">
                {PROJECT_NAV.map((section, index) => (
                  <li key={section.id}>
                    <button
                      type="button"
                      onClick={() => jumpTo(index)}
                      className="group flex w-full cursor-pointer items-center gap-4 border-b border-[var(--hairline)] py-5 text-left transition-colors duration-200 hover:bg-[var(--surface-raised)] sm:gap-6"
                    >
                      <span className="font-mono text-xs tabular-nums text-[var(--muted)]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="w-[7.5rem] shrink-0 text-[17px] font-semibold tracking-tight transition-transform duration-300 group-hover:translate-x-1">
                        {section.name}
                      </span>
                      <span className="hidden flex-1 truncate text-[15px] text-[var(--muted)] md:block">
                        {section.tagline}
                      </span>
                      <span className="ml-auto flex items-center gap-4 md:ml-0">
                        {section.status && (
                          <span className="hidden text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] sm:block">
                            {section.status}
                          </span>
                        )}
                        <svg
                          aria-hidden="true"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="shrink-0 text-[var(--muted)] transition-transform duration-300 group-hover:translate-y-0.5"
                        >
                          <path d="M12 5v14M19 12l-7 7-7-7" />
                        </svg>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>
        </header>

        {/* Case studies */}
        <div className="flex flex-col gap-y-28 pt-20 md:gap-y-36 md:pt-24">
          {PROJECTS.map((project, index) => {
            const hero = HEROES[project.id];
            return (
              <CaseStudy
                key={project.id}
                {...project}
                index={index + 1}
                frameHero={hero?.framed ?? false}
                hero={
                  hero?.node ?? (
                    <ShufflingGallery
                      images={nextStepImages}
                      className="mx-auto max-w-2xl"
                    />
                  )
                }
              />
            );
          })}
        </div>

        {/* Closing CTA */}
        <section
          ref={outroRef}
          aria-labelledby="portfolio-outro"
          className="mt-28 border-t border-[var(--hairline)] pt-14 md:mt-36 md:pt-16"
        >
          <Reveal>
            <h2
              id="portfolio-outro"
              className="max-w-2xl text-balance text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.02em] sm:text-[2.125rem]"
            >
              That&apos;s the short version. Happy to walk you through the long
              one.
            </h2>
            <p className="mt-4 max-w-xl text-[16px] leading-[1.75] text-[var(--muted)]">
              If any of this overlaps with what you&apos;re building, I&apos;d
              like to hear about it.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ContactModalLink
                href="#contact"
                className="inline-flex cursor-pointer items-center rounded-full bg-[var(--foreground)] px-5 py-2.5 text-sm font-medium text-[var(--background)] transition-all duration-200 hover:-translate-y-[1px] hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] active:scale-[0.98]"
              >
                Let&apos;s chat
              </ContactModalLink>
              <Link
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center rounded-full border border-[var(--hairline-strong)] px-5 py-2.5 text-sm font-medium text-[var(--foreground)] transition-all duration-200 hover:-translate-y-[1px] hover:bg-[var(--surface-raised)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              >
                View résumé
              </Link>
            </div>
          </Reveal>
        </section>
      </div>
    </div>
  );
}
