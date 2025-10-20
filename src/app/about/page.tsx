import Image from "next/image";
import Link from "next/link";
import ContactCard from "@/components/ContactCard";
import ExpandableText from "@/components/ExpandableText";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/icons/SocialIcons";

export const metadata = {
  title: "About — Tom Ross",
};

export default function About() {
  return (
    <div className="py-10">
      <h1 className="text-2xl font-medium tracking-tight mb-6">About</h1>
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-4 max-w-prose">
          <ExpandableText
            text={
              "I’m Tom Ross, a full‑stack developer focused on building clear, fast, and reliable web products. I value small, composable systems, tight feedback loops, and elegant interfaces. I ship production work across the stack. I prefer strong defaults, readable code, and designs that get out of the way. I’ve led and contributed to projects across frontend, backend, and infrastructure, always with an emphasis on thoughtful UX and maintainable code."
            }
            limit={360}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link href="/work" className="rounded-lg border border-neutral-200 p-4 hover:shadow-sm hover:-translate-y-[1px] transition-all bg-gradient-to-br from-[#dff1ff] via-white to-[#e7f5ff]">
            <div className="text-sm text-neutral-500">Explore</div>
            <div className="text-base font-medium mt-1">See my work</div>
          </Link>

          <Link href="/writing/first-post" className="rounded-lg border border-neutral-200 p-4 hover:bg-neutral-50 transition-colors">
            <div className="text-sm text-neutral-500">Recent</div>
            <div className="text-base font-medium mt-1">On building with restraint</div>
          </Link>

          <Link href="/writing" className="rounded-lg border border-neutral-200 p-4 hover:bg-neutral-50 transition-colors">
            <div className="text-sm text-neutral-500">Browse</div>
            <div className="text-base font-medium mt-1">More writing</div>
          </Link>
        </div>

        <div className="rounded-lg border border-neutral-200 p-4 flex items-center gap-4">
          <div className="rounded-full overflow-hidden w-14 h-14 border border-neutral-200">
            <Image src="/vercel.svg" alt="Headshot" width={56} height={56} />
          </div>
          <div className="flex-1">
            <div className="font-medium">Tom Ross</div>
            <div className="text-sm text-neutral-500">Full‑Stack Developer</div>
          </div>
          <div className="flex items-center gap-4 text-sm text-neutral-700">
            <Link href="https://github.com/tommyross" target="_blank" rel="noreferrer noopener" className="hover:text-neutral-900" aria-label="GitHub">
              <GitHubIcon />
            </Link>
            <Link href="https://www.linkedin.com/in/tomross" target="_blank" rel="noreferrer noopener" className="hover:text-neutral-900" aria-label="LinkedIn">
              <LinkedInIcon />
            </Link>
            <Link href="https://x.com/tommyross" target="_blank" rel="noreferrer noopener" className="hover:text-neutral-900" aria-label="X">
              <XIcon />
            </Link>
          </div>
        </div>

        <ContactCard />
      </div>
    </div>
  );
}


