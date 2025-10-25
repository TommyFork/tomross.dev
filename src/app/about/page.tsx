import type { Metadata } from "next";
import Link from "next/link";
import ProfileCard from "@/components/ProfileCard";

export const metadata: Metadata = {
  title: "About",
  description:
    "Get to know me—I'm Tommy Ross, a full-stack developer focused on building thoughtful, user-centered products.",
};

export default function About() {
  return (
    <div className="py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-1 space-y-6">
          <ProfileCard />
          <Link
            href="/work"
            className="rounded-lg border border-neutral-200 p-4 hover:shadow-sm hover:-translate-y-[1px] transition-all block"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0)), url(/blue-abstract-gradient.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="text-sm text-white/80">Explore</div>
            <div className="text-base text-lg font-medium mt-1 text-white">
              See my work
            </div>
          </Link>
        </div>
        <div className="md:col-span-2 space-y-6">
          <h1 className="text-2xl font-medium tracking-tight">
            It&apos;s nice to meet you! 👋
          </h1>
          <div className="space-y-4">
            <p className="text-neutral-700" style={{ lineHeight: "1.5" }}>
              My name is Tommy, a full-stack engineer and product builder based
              in Boston, MA 🇺🇸
              <br />
              <br />I started coding in middle school, making Minecraft plugins
              for my friends. That pulled me into Java, then web development
              with PHP, and by&nbsp;
              <Link
                href="https://archive.ph/oe9mp"
                target="_blank"
                className="text-blue-500 hover:text-blue-600"
              >
                high school
              </Link>
              , I was deep into Node.js. Thankfully, I haven&apos;t touched Java or
              PHP since. Along the way, I&apos;ve built everything from Discord bots
              to web scrapers to a couple of startups.
              <br />
              <br />I started my last failed startup,{" "}
              <Link
                href="/work#brightbook"
                className="text-blue-500 hover:text-blue-600"
              >
                BrightBook
              </Link>
              , a platform to individualize curricula for middle school
              students, while a junior in college. <br />
              <br />I led the venture from idea to prototype to piloting in the
              Boston Public Schools. Along the way, I worked with so many
              incredible people. It was an amazing journey full of many failures
              and lessons and I can&apos;t wait to apply what I learned to my next
              venture.
              <br />
              <br />
              I enjoy thinking about the future of software, AI, education, and
              finance. Lately I&apos;ve been particularly interested in generative UI
              and personal AI financial advisors. I also love my dog, getting
              out in nature, and cooking for the people I love.
              <br />
              <br />
              This year, I graduated cum laude from Boston University&apos;s
              Questrom School of Business, where I concentrated in Business
              Analytics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
