import ProjectPortfolioCard from "@/components/icons/portfolio_cards/ProjectPortfolioCard";
import Card from "@/components/icons/portfolio_cards/Card";
import ImageCard from "@/components/icons/portfolio_cards/ImageCard";
import Image from "next/image";

export const metadata = {
  title: "Work — Tom Ross",
};

export default function Work() {
  return (
    <main>
      <div className="py-12">
        <ProjectPortfolioCard
          logoUrl="/brightbook/BrightBook-Logo.svg"
          logoAlt="BrightBook"
          description={
            <>
              BrightBook makes it easy for teachers to build lessons that adapted
              to each student and classroom, bringing personalization into
              everyday teaching. An award–winning software, it turned lesson
              planning into a dynamic system that evolved with students as they
              learn.
              <em>
                {" "}
                BrightBook was acquired and merged with DesignMy Education in
                September 2025.
              </em>
            </>
          }
          scopeText={
            <>
              Founded and led BrightBook, overseeing product strategy, design,
              and development of its AI-powered lesson planning platform. Built
              the web app using Next.js, Firebase, and Gemini APIs, employing a
              mixture-of-experts model to generate differentiated instruction
              aligned with U.S. Common Core, NGSS, and IB standards. Directed
              the pilot in Boston Public Schools, secured over $20K in
              non-dilutive funding, and represented the venture in the BU Summer
              Accelerator and New Venture Competition.
            </>
          }
          projectColor="--brightbook-blue"
          projectDarkColor="--brightbook-dark-blue"
          leftColumnContent={
            <>
              <div>
                <Card className="px-4 py-7 flex flex-col items-center justify-center text-center">
                  <p className="text-lg font-medium text-gray-700">
                    Piloted in the
                  </p>
                  <div className="relative h-28 w-60">
                    <Image
                      src="/brightbook/BPS-Logo.svg"
                      alt="Boston Public Schools"
                      fill
                      className="object-contain"
                    />
                  </div>
                </Card>
              </div>
              <div>
                <ImageCard
                  src="/brightbook/New-Venture-Competition.jpg"
                  alt="BU New Venture Competition"
                >
                  2nd place out of 160 startups in BU&apos;s 2025 New Venture
                  Competition
                </ImageCard>
              </div>
              <div>
                <ImageCard
                  src="/brightbook/NYU-Shanghai-Panel.jpg"
                  alt="NYU Shanghai Panel on AI in Education"
                >
                  Panelist at NYU Shanghai <br /> on the future of AI in
                  Education
                </ImageCard>
              </div>
              <div>
                <Card className="px-4 py-7 flex flex-col items-center gap-2 justify-center text-center">
                  <p className="text-4xl font-bold text-[var(--brightbook-blue)]">
                    $20,000+
                  </p>
                  <p className="text-lg font-medium text-gray-700">
                    raised in non–dilutive funding
                  </p>
                </Card>
              </div>
            </>
          }
          rightColumnContent={
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
          }
        />
      </div>
      {/* Stumped */}
      <div className="py-12">
        <ProjectPortfolioCard
          logoUrl="/stumped/Stumped-Logo.svg"
          logoAlt="Stumped"
          description="Stumped gamified student-teacher relationships, creating a school-wide scavenger hunt that built a stronger and more connected community. The successful competition turned faculty members into collectible characters, motivating hundreds of students to forge new bonds outside the classroom."
          scopeText="Architected and engineered the software that powered Stumped. A fast and easy-to-use web app, it allowed students to view and guess riddles, redeem their points, and see the overall leaderboard. I built the entire backend and API infrastructure, implementing PII mitigation, FAFSA-compliant data policies, secure authentication, and analytics pipelines for engagement and performance."
          projectColor="--brightbook-blue"
          projectDarkColor="--brightbook-dark-blue"
          leftColumnContent={
            <>
              <div>
                <Card className="px-4 py-7 flex flex-col items-center gap-2 justify-center text-center">
                  <p className="text-4xl font-bold text-[var(--stumped-blue)]">
                    700+
                  </p>
                  <p className="text-lg font-medium text-gray-700">
                    students reached
                  </p>
                </Card>
              </div>
              <div>
                <Card className="px-4 py-7 flex flex-col items-center gap-2 justify-center text-center">
                  <p className="text-4xl font-bold text-[var(--stumped-blue)]">
                    5,000+
                  </p>
                  <p className="text-lg font-medium text-gray-700">
                    Stumped Cards produced
                  </p>
                </Card>
              </div>
              <div>
                <Card className="px-4 py-7 flex flex-col items-center justify-center text-center">
                  <div className="relative h-28 w-60">
                    <Image
                      src="/stumped/NYSSBA-Logo.svg"
                      alt="New York State School Boards Association"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <p className="text-base font-medium text-gray-700 mt-2">
                    Awarded Champions of Change by the NYSSBA
                  </p>
                </Card>
              </div>
            </>
          }
          rightColumnContent={
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
          }
        />
      </div>

      {/* NextStep */}
      <div className="py-12">
        <ProjectPortfolioCard
          logoUrl="/next-step/NextStep-Logo.svg"
          logoAlt="NextStep"
          description={
            <>
              NextStepEdu was designed to help students and families apply to
              college with ease and maximize their financial aid. Like TurboTax
              for the FAFSA, it guides users step-by-step through every
              question, adapting to their unique circumstances and turning
              confusing tax data into clear, personalized answers.
              <em> NextStep was acquired in late 2025.</em>
            </>
          }
          scopeText="Engineered a secure end-to-end system integrating Gemini 2.5 Pro and Google Document AI for high-accuracy data extraction and validation. Implemented rigorous PII controls, including encryption at rest and in transit, access-scoped data handling, and anonymization of stored personal identifiers. Embedded an integrated feedback mechanism throughout the interface to facilitate natural, real-time input from beta testers during testing and refinement."
          projectColor="--brightbook-blue"
          projectDarkColor="--brightbook-dark-blue"
          leftColumnContent={
            <>
              <Card className="px-4 py-7 flex flex-col items-center gap-2 justify-center text-center">
                <p className="text-5xl font-bold text-[var(--next-step-blue)]">
                  96%
                </p>
                <p className="text-base font-medium text-gray-700 leading-tight">
                  accuracy in data extraction
                  <br />
                  and document classification*
                </p>
              </Card>

              <Card className="p-8">
                <h3 className="text-[var(--next-step-dark-blue)] font-medium text-xl md:text-lg text-center mb-6">
                  Tech Stack
                </h3>
                <div className="grid grid-cols-3 gap-x-4 gap-y-4 max-w-sm mx-auto">
                  <div className="relative h-14">
                    <Image
                      src="/next-step/tech-stack/NextJS.png"
                      alt="Next.js"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="relative h-14">
                    <Image
                      src="/next-step/tech-stack/Gemini.png"
                      alt="Gemini"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="relative h-14">
                    <Image
                      src="/next-step/tech-stack/DocumentsAI.png"
                      alt="Google Document AI"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="relative h-14">
                    <Image
                      src="/next-step/tech-stack/Mongo.png"
                      alt="MongoDB"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="relative h-14">
                    <Image
                      src="/next-step/tech-stack/AuthJS.png"
                      alt="Auth.js"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="relative h-14">
                    <Image
                      src="/next-step/tech-stack/Redis.png"
                      alt="Redis"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </Card>
            </>
          }
          rightColumnContent={
            <>
              <div className="w-10/12">
                <Image
                  src="/next-step/NextStep-Preview-1.png"
                  alt="NextStep Preview 1"
                  width={1000}
                  height={750}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
              <div className="w-full flex justify-end -mt-16 sm:-mt-24 md:-mt-32 relative z-10">
                <div className="w-9/12">
                  <Image
                    src="/next-step/NextStep-Preview-2.png"
                    alt="NextStep Preview 2"
                    width={1000}
                    height={750}
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                </div>
              </div>
              <div className="w-9/12 -mt-16 sm:-mt-24 md:-mt-32">
                <Image
                  src="/next-step/NextStep-Preview-3.png"
                  alt="NextStep Preview 3"
                  width={1000}
                  height={750}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            </>
          }
          footerNote={
            <>
              *Approx. 96.35% accuracy in extraction and classification across
              124 anonymized 1040 and W-2 datasets using Gemini-2.5 Pro +
              Document AI (n = 124 forms, ±1.3 std)
            </>
          }
        />
      </div>
    </main>
  );
}
