"use client";

import { ReactNode, useRef, useState, useEffect } from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useInView,
  animate,
} from "framer-motion";
import ProjectPortfolioCard from "@/components/icons/portfolio_cards/ProjectPortfolioCard";
import Card from "@/components/icons/portfolio_cards/Card";
import ImageCard from "@/components/icons/portfolio_cards/ImageCard";
import Image from "next/image";
import ShufflingGallery from "@/components/ShufflingGallery";

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: {
      duration: 0.75,
      ease: [0.25, 1, 0.5, 1],
      staggerChildren: 0.1,
      delayChildren: i * 0.1,
    },
  }),
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] },
  },
};

type AnimatedProjectSectionProps = {
  children: ReactNode;
  staggerIndex?: number;
  id?: string;
};

function AnimatedProjectSection({
  children,
  staggerIndex = 0,
  id,
}: AnimatedProjectSectionProps) {
  return (
    <motion.section
      id={id}
      className="w-full"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2, margin: "-10% 0px" }}
      variants={sectionVariants}
      custom={staggerIndex}
    >
      <div className="relative">{children}</div>
    </motion.section>
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
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (inView && ref.current) {
      const controls = animate(value / 2, value, {
        duration: 1.7,
        ease: [0.33, 1, 0.68, 1],
        onUpdate(latest) {
          if (ref.current) {
            ref.current.textContent =
              prefix + Math.round(latest).toLocaleString() + suffix;
          }
        },
      });
      return () => controls.stop();
    }
  }, [inView, value, prefix, suffix]);

  return <p ref={ref} className={className} />;
}

const baseTransition = { duration: 0.6, ease: [0.33, 1, 0.68, 1] } as const;

type RevealProps = {
  children: ReactNode;
};

function Reveal({ children }: RevealProps) {
  return <motion.div variants={itemVariants}>{children}</motion.div>;
}

type TechStackLogoProps = {
  src: string;
  label: string;
};

function TechStackLogo({ src, label }: TechStackLogoProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative h-16"
      variants={itemVariants}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -4 }}
    >
      <div className="relative h-16">
        <Image src={src} alt={label} fill className="object-contain" />
      </div>
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.18 }}
            className="pointer-events-none absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-white px-3 py-1.5 text-xs font-medium text-gray-600 shadow-sm z-[999]"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
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
  { id: "project-brightbook", label: "BrightBook" },
  { id: "project-stumped", label: "Stumped" },
  { id: "project-nextstep", label: "NextStep" },
] as const;

export default function WorkContent() {
  const [activeSection, setActiveSection] = useState(0);

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          const topId = visible[0].target.id;
          const index = PROJECT_SECTIONS.findIndex((section) => section.id === topId);
          if (index !== -1) {
            setActiveSection(index);
          }
        }
      },
      {
        threshold: [0.35, 0.6],
        rootMargin: "-25% 0px -25% 0px",
      },
    );

    const elements = PROJECT_SECTIONS.map((section) =>
      document.getElementById(section.id),
    ).filter((el): el is HTMLElement => Boolean(el));

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  return (
    <MotionConfig transition={baseTransition}>
      <div className="relative">
        <motion.aside
          className="pointer-events-none hidden lg:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
        >
          <div className="pointer-events-auto fixed left-5 top-1/2 z-20 -translate-y-1/2">
            <div className="flex flex-col items-center gap-5 rounded-full bg-white/95 px-4 py-6 shadow-[0_24px_60px_rgba(57,57,118,0.14)] backdrop-blur">
              {PROJECT_SECTIONS.map((section, index) => {
                const isActive = index === activeSection;
                return (
                  <motion.button
                    key={section.id}
                    type="button"
                    onClick={() => handleScrollToSection(section.id)}
                    className="relative flex h-10 w-8 items-center justify-center"
                    aria-label={`Jump to ${section.label}`}
                    whileTap={{ scale: 0.92 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  >
                    <span className="absolute inset-0 flex items-center justify-center">
                      <AnimatePresence>
                        {isActive && (
                          <motion.span
                            layoutId="progress-highlight"
                            className="absolute h-14 w-14 rounded-full bg-[var(--brightbook-blue)]/15 blur-md"
                            initial={{ opacity: 0, scale: 0.6 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.6 }}
                            transition={{ type: "spring", stiffness: 320, damping: 30 }}
                          />
                        )}
                      </AnimatePresence>
                    </span>
                    <motion.span
                      layout
                      className={`relative block rounded-full ${
                        isActive
                          ? "bg-[var(--brightbook-blue)] shadow-[0_12px_30px_rgba(35,64,179,0.35)]"
                          : "bg-slate-300/80"
                      }`}
                      initial={false}
                      animate={{
                        height: isActive ? 34 : 12,
                        width: isActive ? 10 : 8,
                        opacity: isActive ? 1 : 0.6,
                      }}
                      transition={{ type: "spring", stiffness: 320, damping: 28 }}
                    />
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.aside>

        <motion.aside
          className="pointer-events-none fixed inset-x-0 bottom-6 z-20 flex justify-center px-6 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
        >
          <div className="pointer-events-auto flex items-center gap-4 rounded-full bg-white/95 px-5 py-3 shadow-[0_16px_44px_rgba(57,57,118,0.16)] backdrop-blur">
            {PROJECT_SECTIONS.map((section, index) => {
              const isActive = index === activeSection;
              return (
                <motion.button
                  key={section.id}
                  type="button"
                  onClick={() => handleScrollToSection(section.id)}
                  className="relative h-10 w-10"
                  aria-label={`Jump to ${section.label}`}
                  whileTap={{ scale: 0.92 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                >
                  <span className="absolute inset-0 flex items-center justify-center">
                    <AnimatePresence>
                      {isActive && (
                        <motion.span
                          layoutId="progress-highlight-mobile"
                          className="absolute h-14 w-14 rounded-full bg-[var(--brightbook-blue)]/15 blur-md"
                          initial={{ opacity: 0, scale: 0.6 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.6 }}
                          transition={{ type: "spring", stiffness: 320, damping: 30 }}
                        />
                      )}
                    </AnimatePresence>
                  </span>
                  <motion.span
                    layout
                    className={`relative mx-auto block rounded-full ${
                      isActive
                        ? "bg-[var(--brightbook-blue)] shadow-[0_10px_24px_rgba(35,64,179,0.3)]"
                        : "bg-slate-300/80"
                    }`}
                    initial={false}
                    style={{ height: 10 }}
                    animate={{
                      width: isActive ? 28 : 10,
                      opacity: isActive ? 1 : 0.6,
                    }}
                    transition={{ type: "spring", stiffness: 320, damping: 28 }}
                  />
                </motion.button>
              );
            })}
          </div>
        </motion.aside>

        <main className="mx-auto flex w-full max-w-5xl flex-col gap-y-44 px-6 pt-8 pb-16 sm:px-8 md:gap-y-60 md:pt-10 md:pb-20 lg:gap-y-72 lg:pt-12 lg:pb-24">
            <AnimatedProjectSection id={PROJECT_SECTIONS[0].id}>
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
                    <Reveal>
                      <Card className="flex flex-col items-center justify-center gap-3 px-6 py-8 text-center">
                        <p className="text-base font-medium text-gray-700">
                          Piloted in the
                        </p>
                        <div className="relative h-24 w-48 sm:h-28 sm:w-60">
                          <Image
                            src="/brightbook/BPS-Logo.svg"
                            alt="Boston Public Schools"
                            fill
                            className="object-contain"
                          />
                        </div>
                      </Card>
                    </Reveal>
                    <Reveal>
                      <ImageCard
                        src="/brightbook/New-Venture-Competition.jpg"
                        alt="BU New Venture Competition"
                      >
                        2nd place out of 160 startups in BU&apos;s 2025 New Venture
                        Competition
                      </ImageCard>
                    </Reveal>
                    <Reveal>
                      <ImageCard
                        src="/brightbook/NYU-Shanghai-Panel.jpg"
                        alt="NYU Shanghai Panel on AI in Education"
                      >
                        Panelist at NYU Shanghai <br /> on the future of AI in
                        Education
                      </ImageCard>
                    </Reveal>
                    <Reveal>
                      <Card className="flex flex-col items-center justify-center gap-3 px-6 py-8 text-center">
                        <AnimatedNumber
                          value={20000}
                          prefix="$"
                          suffix="+"
                          className="text-4xl font-bold text-[var(--brightbook-blue)] md:text-5xl"
                        />
                        <p className="text-base font-medium text-gray-700">
                          raised in non–dilutive funding
                        </p>
                      </Card>
                    </Reveal>
                  </>
                }
                rightColumnContent={
                  <motion.div variants={itemVariants}>
                    <Card className="overflow-hidden p-0">
                      <Image
                        src="/brightbook/BrightBook-Preview.jpg"
                        alt="BrightBook lesson preview"
                        width={1600}
                        height={1100}
                        className="h-auto w-full"
                        priority
                      />
                    </Card>
                  </motion.div>
                }
              />
            </AnimatedProjectSection>
            <AnimatedProjectSection
              id={PROJECT_SECTIONS[1].id}
              staggerIndex={1}
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
                    <Reveal>
                      <Card className="flex flex-col items-center gap-3 px-6 py-8 text-center">
                        <AnimatedNumber
                          value={700}
                          suffix="+"
                          className="text-4xl font-bold text-[var(--stumped-blue)] md:text-5xl"
                        />
                        <p className="text-base font-medium text-gray-700">
                          students reached
                        </p>
                      </Card>
                    </Reveal>
                    <Reveal>
                      <Card className="flex flex-col items-center gap-3 px-6 py-8 text-center">
                        <AnimatedNumber
                          value={5000}
                          suffix="+"
                          className="text-4xl font-bold text-[var(--stumped-blue)] md:text-5xl"
                        />
                        <p className="text-base font-medium text-gray-700">
                          Stumped Cards produced
                        </p>
                      </Card>
                    </Reveal>
                    <Reveal>
                      <Card className="flex flex-col items-center justify-center gap-4 px-6 py-8 text-center">
                        <div className="relative h-24 w-48 sm:h-28 sm:w-60">
                          <Image
                            src="/stumped/NYSSBA-Logo.svg"
                            alt="New York State School Boards Association"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <p className="text-base font-medium text-gray-700">
                          Awarded Champions of Change by the NYSSBA
                        </p>
                      </Card>
                    </Reveal>
                  </>
                }
                rightColumnContent={
                  <motion.div variants={itemVariants}>
                    <Card className="overflow-hidden p-0">
                      <Image
                        src="/stumped/Stumped-Preview.png"
                        alt="Stumped card preview"
                        width={1600}
                        height={1100}
                        className="h-auto w-full"
                        priority
                      />
                    </Card>
                  </motion.div>
                }
              />
            </AnimatedProjectSection>

            <AnimatedProjectSection
              id={PROJECT_SECTIONS[2].id}
              staggerIndex={2}
            >
              <ProjectPortfolioCard
                logoUrl="/next-step/NextStep-Logo.svg"
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
                    <Reveal>
                      <Card className="flex flex-col items-center gap-3 px-6 py-8 text-center">
                        <AnimatedNumber
                          value={96}
                          suffix="%"
                          className="text-4xl font-bold text-[var(--next-step-blue)] md:text-5xl"
                        />
                        <p className="text-base font-medium text-gray-700 leading-tight">
                          accuracy in data extraction
                          <br />
                          and document classification*
                        </p>
                      </Card>
                    </Reveal>
                    <Reveal>
                      <Card className="relative overflow-visible px-8 py-10">
                        <h3 className="mb-6 text-center text-xl font-medium text-[var(--next-step-dark-blue)] md:text-lg">
                          Tech Stack
                        </h3>
                        <div className="mx-auto grid max-w-sm grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3">
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
                    </Reveal>
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
    </MotionConfig>
  );
}
