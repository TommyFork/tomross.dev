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
            It’s nice to meet you!{" "}👋
          </h1>
          <div className="space-y-4">
            <p className="text-neutral-700">
              I’m a full-stack engineer and product builder with a strong foundation
              in analytics and user experience. Graduated cum laude from Boston
              University’s Questrom School of Business with a concentration in
              Business Analytics. I’m experienced in developing and testing web and
              AI-powered products end-to-end, from concept to launch, including
              BrightBook, an award-winning education platform piloted in the
              Boston Public Schools. I’m skilled at translating user insights into
              testable requirements, executing data-driven QA processes, and
              collaborating across teams to deliver seamless, high-quality user
              experiences. I’m passionate about using technology, design, and data
              to build reliable, intuitive products that improve everyday life.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
