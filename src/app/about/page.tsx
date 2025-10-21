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
              Thanks for visiting my personal website!
              <br />
              <br />
              My name is Tommy, a full-stack engineer and product builder based
              in Boston, MA 🇺🇸 <br />
              <br />I get excited about taking ideas from concept all the way
              through to launch, handling everything from development to testing
              along the way. One project I&apos;m particularly proud of is
              BrightBook, an award-winning education platform that we piloted in
              the Boston Public Schools. My approach blends engineering,
              analytics, and UX. <br />
              <br />I like to dig into user insights, translate them into clear
              requirements, and use data to guide direction. Whether I&apos;m
              working on web apps or AI tools, I love collaboration and creating
              experiences that feel seamless and intuitive. <br />
              <br />
              At the end of the day, I&apos;m passionate about using technology,
              design, and data to build products that are reliable, easy to use,
              and genuinely improve people&apos;s everyday lives. <br />
              <br /> I graduated cum laude from Boston University&apos;s
              Questrom School of Business, where I concentrated in Business
              Analytics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
