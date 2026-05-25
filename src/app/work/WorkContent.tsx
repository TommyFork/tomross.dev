"use client";

import { ReactNode, useRef, useState, useEffect } from "react";
import ProjectPortfolioCard from "@/components/icons/portfolio_cards/ProjectPortfolioCard";
import Card from "@/components/icons/portfolio_cards/Card";
import ImageCard from "@/components/icons/portfolio_cards/ImageCard";
import Image from "next/image";
import ShufflingGallery from "@/components/ShufflingGallery";

type AnimatedProjectSectionProps = {
  children: ReactNode;
  id?: string;
  anchorIds?: readonly string[];
};

function AnimatedProjectSection({
  children,
  id,
  anchorIds = [],
}: AnimatedProjectSectionProps) {
  const anchorIdList = id
    ? Array.from(new Set([id, ...anchorIds]))
    : Array.from(new Set(anchorIds));

  return (
    <section
      data-section-id={id ?? undefined}
      className="relative w-full"
    >
      {anchorIdList.map((anchorId) => (
        <span
          key={anchorId}
          id={anchorId}
          aria-hidden="true"
          className="pointer-events-none absolute top-0 h-0 w-px opacity-0 scroll-mt-28 md:scroll-mt-36"
        />
      ))}
      <div className="relative">{children}</div>
    </section>
  );
}

type AnimatedNumberProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  className,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const format = (latest: number) => {
      node.textContent = prefix + Math.round(latest).toLocaleString() + suffix;
    };

    format(value);

    let frameId = 0;
    let startTime = 0;
    const duration = 1100;
    const animateValue = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      format(value / 2 + (value / 2) * eased);
      if (progress < 1) {
        frameId = window.requestAnimationFrame(animateValue);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          frameId = window.requestAnimationFrame(animateValue);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, [value, prefix, suffix]);

  return <p ref={ref} className={className} />;
}

type TechStackLogoProps = {
  src: string;
  label: string;
};

function TechStackLogo({ src, label }: TechStackLogoProps) {
  return (
    <div className="group relative h-16 transition-transform duration-200 ease-out hover:-translate-y-1">
      <div className="relative h-16">
        <Image
          src={src}
          alt={label}
          fill
          sizes="(min-width: 640px) 96px, 45vw"
          loading="lazy"
          className="object-contain"
        />
      </div>
      <span className="pointer-events-none absolute -bottom-12 left-1/2 z-[999] -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md bg-white px-3 py-1.5 text-xs font-medium text-gray-600 opacity-0 shadow-sm transition-all duration-150 group-hover:translate-y-0 group-hover:opacity-100 dark:bg-neutral-800 dark:text-neutral-300">
        {label}
      </span>
    </div>
  );
}

const nextStepImages = [
  {
    src: "/next-step/NextStep-Preview-2.png",
    alt: "NextStep Preview 2",
    width: 1000,
    height: 750,
    scaleModifier: 0.9,
  },
  {
    src: "/next-step/NextStep-Preview-1.png",
    alt: "NextStep Preview 1",
    width: 1000,
    height: 750,
  },
  {
    src: "/next-step/NextStep-Preview-3.png",
    alt: "NextStep Preview 3",
    width: 1000,
    height: 750,
  },
];

const PROJECT_SECTIONS = [
  {
    id: "brightbook",
    label: "BrightBook",
    anchorIds: ["project-brightbook"],
  },
  { id: "stumped", label: "Stumped", anchorIds: ["project-stumped"] },
  {
    id: "nextstep",
    label: "NextStep",
    anchorIds: ["project-nextstep"],
  },
] as const;

export default function WorkContent() {
  const [activeSection, setActiveSection] = useState(0);
  const manualActiveUntilRef = useRef<number | null>(null);

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const sectionElements = PROJECT_SECTIONS.map((section) =>
      document.querySelector<HTMLElement>(
        `[data-section-id="${section.id}"]`,
      ),
    ).filter((el): el is HTMLElement => Boolean(el));

    if (!sectionElements.length) {
      return;
    }

    let frameId: number | null = null;

    const updateActiveSection = () => {
      frameId = null;
      if (
        manualActiveUntilRef.current != null &&
        performance.now() < manualActiveUntilRef.current
      ) {
        return;
      }
      manualActiveUntilRef.current = null;
      const viewportCenter = window.innerHeight / 2;
      let closestIndex = 0;
      let smallestDistance = Number.POSITIVE_INFINITY;

      sectionElements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const distance = Math.abs(sectionCenter - viewportCenter);

        if (distance < smallestDistance) {
          closestIndex = index;
          smallestDistance = distance;
        }
      });

      setActiveSection((current) =>
        current === closestIndex ? current : closestIndex,
      );
    };

    const requestUpdate = () => {
      if (frameId != null) {
        return;
      }

      frameId = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frameId != null) {
        window.cancelAnimationFrame(frameId);
      }
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <div className="relative">
      <aside className="pointer-events-none hidden lg:block">
        <div className="pointer-events-auto fixed left-5 top-1/2 z-20 -translate-y-1/2">
          <div className="flex flex-col items-center gap-5 rounded-full bg-white/95 dark:bg-neutral-900/95 px-4 py-6 shadow-[0_24px_60px_rgba(57,57,118,0.14)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.4)] backdrop-blur">
            {PROJECT_SECTIONS.map((section, index) => {
              const isActive = index === activeSection;
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => {
                    manualActiveUntilRef.current = performance.now() + 900;
                    setActiveSection(index);
                    handleScrollToSection(section.id);
                  }}
                  className={`group relative flex h-12 w-12 items-center justify-center rounded-full transition-transform duration-150 active:scale-95 hover:scale-105 ${
                    isActive
                      ? "cursor-default"
                      : "cursor-pointer hover:bg-slate-100/70 dark:hover:bg-neutral-700/50"
                  }`}
                  aria-label={`Jump to ${section.label}`}
                >
                  <span
                    className={`relative block rounded-full transition-all duration-150 ${
                      isActive
                        ? "h-[34px] w-2.5 bg-[var(--brightbook-blue)] opacity-100"
                        : "h-3 w-2 bg-slate-300/80 opacity-60 group-hover:h-[18px] group-hover:bg-slate-400 group-hover:opacity-95"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </aside>
  
      <aside className="pointer-events-none fixed inset-x-0 bottom-5 z-20 flex justify-center px-4 lg:hidden">
        <div className="pointer-events-auto flex items-center gap-3 rounded-full bg-white/95 dark:bg-neutral-900/95 px-5 py-2.5 shadow-[0_16px_44px_rgba(57,57,118,0.16)] dark:shadow-[0_16px_44px_rgba(0,0,0,0.4)] backdrop-blur">
          {PROJECT_SECTIONS.map((section, index) => {
            const isActive = index === activeSection;
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => {
                  manualActiveUntilRef.current = performance.now() + 900;
                  setActiveSection(index);
                  handleScrollToSection(section.id);
                }}
                className={`group relative h-10 w-10 transition-transform duration-150 active:scale-95 hover:scale-105 ${
                  isActive ? "cursor-default" : "cursor-pointer"
                }`}
                aria-label={`Jump to ${section.label}`}
              >
                <span
                  className={`relative mx-auto block rounded-full transition-colors ${
                    isActive
                      ? "w-7 bg-[var(--brightbook-blue)] opacity-100"
                      : "w-2.5 bg-slate-300/80 opacity-60 group-hover:bg-slate-400 group-hover:opacity-90"
                  }`}
                  style={{ height: 10 }}
                />
              </button>
            );
          })}
        </div>
      </aside>
  
      <main className="flex w-full flex-col gap-y-32 pt-6 pb-14 sm:gap-y-40 sm:pt-8 sm:pb-16 md:gap-y-52 md:pt-10 md:pb-20 lg:gap-y-64 lg:pt-12 lg:pb-24">
          <AnimatedProjectSection
            id={PROJECT_SECTIONS[0].id}
            anchorIds={PROJECT_SECTIONS[0].anchorIds}
          >
            <ProjectPortfolioCard
              logoUrl="/brightbook/BrightBook-Logo.svg"
              logoAlt="BrightBook"
              description={
                <>
                  BrightBook makes it easy for teachers to build lessons that
                  adapted to each student and classroom, bringing
                  personalization into everyday teaching. An award–winning
                  software, it turned lesson planning into a dynamic system
                  that evolved with students as they learn.
                  <em>
                    {" "}
                    BrightBook was acquired and merged with DesignMy Education
                    in September 2025.
                  </em>
                </>
              }
              scopeText={
                <>
                  Founded and led BrightBook, overseeing product strategy,
                  design, and development of its AI-powered lesson planning
                  platform. Built the web app using Next.js, Firebase, and
                  Gemini APIs, employing a mixture-of-experts model to
                  generate differentiated instruction aligned with U.S.
                  Common Core, NGSS, and IB standards. Directed the pilot in
                  Boston Public Schools, secured over $20K in non-dilutive
                  funding, and represented the venture in the BU Summer
                  Accelerator and New Venture Competition.
                </>
              }
              projectColor="--brightbook-blue"
              projectDarkColor="--brightbook-dark-blue"
              leftColumnContent={
                <>
  
                    <Card className="flex flex-col items-center justify-center gap-3 px-6 py-8 text-center">
                      <p className="text-base font-medium text-gray-700 dark:text-neutral-300">
                        Piloted in the
                      </p>
                      <div className="relative h-24 w-48 sm:h-28 sm:w-60">
                        <Image
                          src="/brightbook/BPS-Logo.svg"
                          alt="Boston Public Schools"
                          fill
                          sizes="(min-width: 640px) 240px, 192px"
                          loading="lazy"
                          className="object-contain dark:hidden"
                        />
                        <Image
                          src="/brightbook/BPS-Logo-Dark.svg"
                          alt="Boston Public Schools"
                          fill
                          sizes="(min-width: 640px) 240px, 192px"
                          loading="lazy"
                          className="object-contain hidden dark:block"
                        />
                      </div>
                    </Card>
  
  
                    <ImageCard
                      src="/brightbook/New-Venture-Competition.jpg"
                      alt="BU New Venture Competition"
                    >
                      2nd place out of 160 startups in BU&apos;s 2025 New Venture
                      Competition
                    </ImageCard>
  
  
                    <ImageCard
                      src="/brightbook/NYU-Shanghai-Panel.jpg"
                      alt="NYU Shanghai Panel on AI in Education"
                    >
                      Panelist at NYU Shanghai <br /> on the future of AI in
                      Education
                    </ImageCard>
  
  
                    <Card className="flex flex-col items-center justify-center gap-3 px-6 py-8 text-center">
                      <AnimatedNumber
                        value={20000}
                        prefix="$"
                        suffix="+"
                        className="text-4xl font-bold text-[var(--brightbook-blue)] md:text-5xl"
                      />
                      <p className="text-base font-medium text-gray-700 dark:text-neutral-300">
                        raised in non–dilutive funding
                      </p>
                    </Card>
  
                </>
              }
              rightColumnContent={
                <div>
                  <Card className="overflow-hidden p-0">
                    <Image
                      src="/brightbook/BrightBook-Preview.jpg"
                      alt="BrightBook lesson preview"
                      width={1600}
                      height={1100}
                      sizes="(min-width: 1280px) 672px, (min-width: 1024px) 50vw, (min-width: 640px) 576px, calc(100vw - 48px)"
                      loading="lazy"
                      className="h-auto w-full"
                    />
                  </Card>
                </div>
              }
            />
          </AnimatedProjectSection>
          <AnimatedProjectSection
            id={PROJECT_SECTIONS[1].id}
            anchorIds={PROJECT_SECTIONS[1].anchorIds}
          >
            <ProjectPortfolioCard
              logoUrl="/stumped/Stumped-Logo.svg"
              logoAlt="Stumped"
              description="Stumped gamified student-teacher relationships, creating a school-wide scavenger hunt that built a stronger and more connected community. The successful competition turned faculty members into collectible characters, motivating hundreds of students to forge new bonds outside the classroom."
              scopeText="Architected and engineered the software that powered Stumped. A fast and easy-to-use web app, it allowed students to view and guess riddles, redeem their points, and see the overall leaderboard. I built the entire backend and API infrastructure, implementing PII mitigation, FAFSA-compliant data policies, secure authentication, and analytics pipelines for engagement and performance."
              projectColor="--brightbook-blue"
              projectDarkColor="--brightbook-dark-blue"
              leftColumnContent={
                <>
  
                    <Card className="flex flex-col items-center gap-3 px-6 py-8 text-center">
                      <AnimatedNumber
                        value={700}
                        suffix="+"
                        className="text-4xl font-bold text-[var(--stumped-blue)] md:text-5xl"
                      />
                      <p className="text-base font-medium text-gray-700 dark:text-neutral-300">
                        students reached
                      </p>
                    </Card>
  
  
                    <Card className="flex flex-col items-center gap-3 px-6 py-8 text-center">
                      <AnimatedNumber
                        value={5000}
                        suffix="+"
                        className="text-4xl font-bold text-[var(--stumped-blue)] md:text-5xl"
                      />
                      <p className="text-base font-medium text-gray-700 dark:text-neutral-300">
                        Stumped Cards produced
                      </p>
                    </Card>
  
  
                    <Card className="flex flex-col items-center justify-center gap-4 px-6 py-8 text-center">
                      <div className="relative h-24 w-48 sm:h-28 sm:w-60">
                        <Image
                          src="/stumped/NYSSBA-Logo.svg"
                          alt="New York State School Boards Association"
                          fill
                          sizes="(min-width: 640px) 240px, 192px"
                          loading="lazy"
                          className="object-contain dark:hidden"
                        />
                        <Image
                          src="/stumped/NYSSBA-Logo-Dark.svg"
                          alt="New York State School Boards Association"
                          fill
                          sizes="(min-width: 640px) 240px, 192px"
                          loading="lazy"
                          className="object-contain hidden dark:block"
                        />
                      </div>
                      <p className="max-w-sm text-balance text-base font-medium leading-snug text-gray-700 dark:text-neutral-300">
                        Awarded Champions of Change
                        <br />
                        by the NYSSBA
                      </p>
                    </Card>
  
                </>
              }
              rightColumnContent={
                <div>
                  <Card className="overflow-hidden p-0">
                    <Image
                      src="/stumped/Stumped-Preview.png"
                      alt="Stumped card preview"
                      width={1600}
                      height={1100}
                      sizes="(min-width: 1280px) 672px, (min-width: 1024px) 50vw, (min-width: 640px) 576px, calc(100vw - 48px)"
                      loading="lazy"
                      className="h-auto w-full"
                    />
                  </Card>
                </div>
              }
            />
          </AnimatedProjectSection>
  
          <AnimatedProjectSection
            id={PROJECT_SECTIONS[2].id}
            anchorIds={PROJECT_SECTIONS[2].anchorIds}
          >
            <ProjectPortfolioCard
              logoUrl="/next-step/NextStep-Logo.svg"
              logoDarkUrl="/next-step/NextStep-Logo-Dark.svg"
              logoAlt="NextStep"
              description={
                <>
                  NextStepEdu was designed to help students and families apply
                  to college with ease and maximize their financial aid. Like
                  TurboTax for the FAFSA, it guides users step-by-step through
                  every question, adapting to their unique circumstances and
                  turning confusing tax data into clear, personalized answers.
                  <em> NextStep was acquired in late 2025.</em>
                </>
              }
              scopeText="Engineered a secure end-to-end system integrating Gemini 2.5 Pro and Google Document AI for high-accuracy data extraction and validation. Implemented rigorous PII controls, including encryption at rest and in transit, access-scoped data handling, and anonymization of stored personal identifiers. Embedded an integrated feedback mechanism throughout the interface to facilitate natural, real-time input from beta testers during testing and refinement."
              projectColor="--brightbook-blue"
              projectDarkColor="--brightbook-dark-blue"
              leftColumnContent={
                <>
  
                    <Card className="flex flex-col items-center gap-3 px-6 py-8 text-center">
                      <AnimatedNumber
                        value={96}
                        suffix="%"
                        className="text-4xl font-bold text-[var(--next-step-blue)] md:text-5xl"
                      />
                      <p className="text-base font-medium text-gray-700 dark:text-neutral-300 leading-tight">
                        accuracy in data extraction
                        <br />
                        and document classification*
                      </p>
                    </Card>
  
  
                    <Card className="relative overflow-visible px-8 py-8 sm:py-10 md:py-12">
                      <h3 className="mb-6 text-center text-xl font-medium text-[var(--next-step-dark-blue)] dark:text-blue-400 md:text-lg">
                        Tech Stack
                      </h3>
                      <div className="mx-auto grid max-w-sm grid-cols-2 gap-x-8 gap-y-16 sm:grid-cols-3">
                        <TechStackLogo
                          src="/next-step/tech-stack/NextJS.png"
                          label="Next.js"
                        />
                        <TechStackLogo
                          src="/next-step/tech-stack/Gemini.png"
                          label="Gemini 2.5 Pro"
                        />
                        <TechStackLogo
                          src="/next-step/tech-stack/DocumentsAI.png"
                          label="Google Document AI"
                        />
                        <TechStackLogo
                          src="/next-step/tech-stack/Mongo.png"
                          label="MongoDB"
                        />
                        <TechStackLogo
                          src="/next-step/tech-stack/AuthJS.png"
                          label="Auth.js"
                        />
                        <TechStackLogo
                          src="/next-step/tech-stack/Redis.png"
                          label="Redis"
                        />
                      </div>
                    </Card>
  
                </>
              }
              rightColumnContent={
                <ShufflingGallery
                  images={nextStepImages}
                  className="max-w-lg md:max-w-xl"
                />
              }
              footerNote={
                <>
                  *Approx. 96.35% accuracy in extraction and classification
                  across 124 anonymized 1040 and W-2 datasets using
                  Gemini-2.5 Pro + Document AI (n = 124 forms, ±1.3 std)
                </>
              }
            />
          </AnimatedProjectSection>
        </main>
    </div>
  );
}
