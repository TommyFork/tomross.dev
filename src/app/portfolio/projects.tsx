import type { CaseStudyData } from "@/components/portfolio/CaseStudy";

/**
 * Case study content. Ordering here drives the section index, the side rail and
 * the mobile switcher, so a project only needs to be added in one place.
 */
export const PROJECTS: readonly CaseStudyData[] = [
  {
    id: "brightbook",
    anchorIds: ["project-brightbook"],
    name: "BrightBook",
    accentClass: "accent-brightbook",
    logo: { src: "/brightbook/BrightBook-Logo.svg", alt: "BrightBook" },
    tagline: "Lesson planning that adapts to every student in the room.",
    status: "Acquired 2025",
    summary: (
      <>
        BrightBook makes it easy for teachers to build lessons that adapted to
        each student and classroom, bringing personalization into everyday
        teaching. An award–winning software, it turned lesson planning into a
        dynamic system that evolved with students as they learn.{" "}
        <em>
          BrightBook was acquired and merged with DesignMy Education in
          September 2025.
        </em>
      </>
    ),
    tags: ["Next.js", "Firebase", "Gemini API", "Mixture of experts"],
    spec: [
      { label: "Role", value: "Founder & Lead Engineer" },
      { label: "Scope", value: "Product strategy, design, engineering" },
      { label: "Outcome", value: "Acquired by DesignMy Education, Sept 2025" },
    ],
    work: (
      <>
        Founded and led BrightBook, overseeing product strategy, design, and
        development of its AI-powered lesson planning platform. Built the web app
        using Next.js, Firebase, and Gemini APIs, employing a mixture-of-experts
        model to generate differentiated instruction aligned with U.S. Common
        Core, NGSS, and IB standards. Directed the pilot in Boston Public
        Schools, secured over $20K in non-dilutive funding, and represented the
        venture in the BU Summer Accelerator and New Venture Competition.
      </>
    ),
    stats: [
      {
        value: 20000,
        prefix: "$",
        suffix: "+",
        label: "raised in non-dilutive funding",
      },
      {
        display: "2nd",
        label: "of 160 startups in BU’s 2025 New Venture Competition",
      },
    ],
    proofs: [
      {
        kind: "credential",
        src: "/brightbook/BPS-Logo.svg",
        darkSrc: "/brightbook/BPS-Logo-Dark.svg",
        alt: "Boston Public Schools",
        caption: "Piloted across Boston Public Schools",
      },
      {
        kind: "photo",
        src: "/brightbook/New-Venture-Competition.jpg",
        alt: "Presenting at BU’s New Venture Competition",
        caption: "2nd place out of 160 startups in BU’s 2025 New Venture Competition",
      },
      {
        kind: "photo",
        src: "/brightbook/NYU-Shanghai-Panel.jpg",
        alt: "Panel discussion at NYU Shanghai",
        caption: "Panelist at NYU Shanghai on the future of AI in education",
      },
    ],
  },
  {
    id: "stumped",
    anchorIds: ["project-stumped"],
    name: "Stumped",
    accentClass: "accent-stumped",
    logo: { src: "/stumped/Stumped-Logo.svg", alt: "Stumped" },
    tagline: "A school-wide scavenger hunt that turned teachers into collectibles.",
    status: "Shipped",
    summary:
      "Stumped gamified student-teacher relationships, creating a school-wide scavenger hunt that built a stronger and more connected community. The successful competition turned faculty members into collectible characters, motivating hundreds of students to forge new bonds outside the classroom.",
    tags: ["Backend & API", "Secure auth", "PII mitigation", "Analytics pipeline"],
    spec: [
      { label: "Role", value: "Software Architect & Backend Engineer" },
      { label: "Scope", value: "APIs, authentication, data compliance" },
      { label: "Recognition", value: "NYSSBA Champions of Change" },
    ],
    work: "Architected and engineered the software that powered Stumped. A fast and easy-to-use web app, it allowed students to view and guess riddles, redeem their points, and see the overall leaderboard. I built the entire backend and API infrastructure, implementing PII mitigation, FAFSA-compliant data policies, secure authentication, and analytics pipelines for engagement and performance.",
    stats: [
      { value: 700, suffix: "+", label: "students reached" },
      { value: 5000, suffix: "+", label: "Stumped Cards produced" },
    ],
    proofs: [
      {
        kind: "credential",
        src: "/stumped/NYSSBA-Logo.svg",
        darkSrc: "/stumped/NYSSBA-Logo-Dark.svg",
        alt: "New York State School Boards Association",
        caption: "Awarded Champions of Change by the NYSSBA",
      },
    ],
  },
  {
    id: "nextstep",
    anchorIds: ["project-nextstep"],
    name: "NextStep",
    accentClass: "accent-nextstep",
    logo: {
      src: "/next-step/NextStep-Logo.svg",
      darkSrc: "/next-step/NextStep-Logo-Dark.svg",
      alt: "NextStep",
    },
    tagline: "Financial aid, one plain-English question at a time.",
    status: "Acquired 2025",
    summary: (
      <>
        NextStepEdu was designed to help students and families apply to college
        with ease and maximize their financial aid. Like TurboTax for the FAFSA,
        it guides users step-by-step through every question, adapting to their
        unique circumstances and turning confusing tax data into clear,
        personalized answers. <em>NextStep was acquired in late 2025.</em>
      </>
    ),
    spec: [
      { label: "Role", value: "Full-Stack Engineer" },
      { label: "Scope", value: "AI extraction, security, PII controls" },
      { label: "Outcome", value: "Acquired in late 2025" },
    ],
    work: "Engineered a secure end-to-end system integrating Gemini 2.5 Pro and Google Document AI for high-accuracy data extraction and validation. Implemented rigorous PII controls, including encryption at rest and in transit, access-scoped data handling, and anonymization of stored personal identifiers. Embedded an integrated feedback mechanism throughout the interface to facilitate natural, real-time input from beta testers during testing and refinement.",
    stack: [
      { label: "Next.js", src: "/next-step/tech-stack/NextJS.png" },
      { label: "Gemini 2.5 Pro", src: "/next-step/tech-stack/Gemini.png" },
      { label: "Google Document AI", src: "/next-step/tech-stack/DocumentsAI.png" },
      { label: "MongoDB", src: "/next-step/tech-stack/Mongo.png" },
      { label: "Auth.js", src: "/next-step/tech-stack/AuthJS.png" },
      { label: "Redis", src: "/next-step/tech-stack/Redis.png" },
    ],
    stats: [
      {
        value: 96,
        suffix: "%",
        label: "accuracy in data extraction and document classification*",
      },
      { value: 124, label: "anonymized tax forms in the accuracy benchmark" },
    ],
    footnote:
      "*Approx. 96.35% accuracy in extraction and classification across 124 anonymized 1040 and W-2 datasets using Gemini-2.5 Pro + Document AI (n = 124 forms, ±1.3 std)",
  },
];

/** Thumbnails for the hero index. All are cropped from the top of the preview. */
const THUMBNAILS: Record<string, string> = {
  brightbook: "/brightbook/BrightBook-Preview.jpg",
  stumped: "/stumped/Stumped-Preview.png",
  nextstep: "/next-step/NextStep-Preview-1.png",
};

/** Compact metadata for the hero index, section rail and mobile switcher. */
export const PROJECT_NAV = PROJECTS.map(
  ({ id, name, tagline, status, accentClass }) => ({
    id,
    name,
    tagline,
    status,
    accentClass,
    thumbnail: THUMBNAILS[id],
  }),
);
